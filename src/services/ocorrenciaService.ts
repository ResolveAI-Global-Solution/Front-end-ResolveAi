import { ocorrencias } from '../data/mapa'
import type { EventoHistorico, OcorrenciaMapa, RegistroOcorrenciaForm, StatusOcorrencia } from '../types'
import { posicaoLivre } from '../utils/posicao'
import { validarFoto, validarOcorrencia } from './validarOcorrencia'

export const EVENTO_OCORRENCIAS_ATUALIZADAS = 'resolveai:ocorrencias-atualizadas'

const NOME_BANCO = 'resolveai'
const NOME_COLECAO = 'ocorrencias'

// Os registros e as fotos ficam neste navegador até a integração com a API.
function abrirBanco(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('Este navegador não permite salvar ocorrências. Use um navegador com armazenamento local disponível.'))
      return
    }

    const pedido = indexedDB.open(NOME_BANCO, 1)
    let encerrado = false

    pedido.onupgradeneeded = () => {
      if (encerrado) {
        pedido.transaction?.abort()
        return
      }
      const colecao = pedido.result.createObjectStore(NOME_COLECAO, { keyPath: 'id', autoIncrement: true })
      ocorrencias.forEach((ocorrencia) => colecao.add(ocorrencia))
    }
    pedido.onsuccess = () => {
      const banco = pedido.result
      if (encerrado) {
        banco.close()
        return
      }
      encerrado = true
      banco.onversionchange = () => banco.close()
      resolve(banco)
    }
    pedido.onerror = () => {
      if (encerrado) return
      encerrado = true
      reject(new Error('Não foi possível abrir as ocorrências salvas. Verifique se o armazenamento do navegador está disponível e tente novamente.'))
    }
    pedido.onblocked = () => {
      if (encerrado) return
      encerrado = true
      reject(new Error('O armazenamento está ocupado por outra aba. Feche as outras abas do ResolveAI e tente novamente.'))
    }
  })
}

function tempoDecorrido(criadoEm: string): string {
  const segundos = Math.max(0, Math.floor((Date.now() - Date.parse(criadoEm)) / 1000))
  if (!Number.isFinite(segundos) || segundos < 60) return 'agora'
  if (segundos < 3600) {
    const minutos = Math.floor(segundos / 60)
    return `há ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`
  }
  if (segundos < 86400) {
    const horas = Math.floor(segundos / 3600)
    return `há ${horas} ${horas === 1 ? 'hora' : 'horas'}`
  }
  const dias = Math.floor(segundos / 86400)
  return `há ${dias} ${dias === 1 ? 'dia' : 'dias'}`
}

export async function listarOcorrencias(): Promise<OcorrenciaMapa[]> {
  const banco = await abrirBanco()
  try {
    const registros = await new Promise<OcorrenciaMapa[]>((resolve, reject) => {
      const transacao = banco.transaction(NOME_COLECAO, 'readonly')
      const pedido = transacao.objectStore(NOME_COLECAO).getAll()
      transacao.oncomplete = () => resolve(pedido.result as OcorrenciaMapa[])
      transacao.onabort = () => reject(new Error('Não foi possível carregar as ocorrências salvas. Tente novamente.'))
    })
    return registros
      .map((ocorrencia) => ({
        ...ocorrencia,
        tempo: ocorrencia.criadoEm ? tempoDecorrido(ocorrencia.criadoEm) : ocorrencia.tempo,
      }))
      .sort((a, b) => {
        if (a.criadoEm && b.criadoEm) return Date.parse(b.criadoEm) - Date.parse(a.criadoEm) || b.id - a.id
        if (a.criadoEm) return -1
        if (b.criadoEm) return 1
        return a.id - b.id
      })
  } finally {
    banco.close()
  }
}

export async function registrarOcorrencia(dados: RegistroOcorrenciaForm): Promise<OcorrenciaMapa> {
  if (Object.keys(validarOcorrencia(dados)).length > 0 || !dados.categoria || !dados.foto) {
    throw new Error('Confira os campos da ocorrência antes de continuar.')
  }

  const descricao = dados.descricao.trim()
  const nova: Omit<OcorrenciaMapa, 'id'> = {
    titulo: descricao.length > 100 ? `${descricao.slice(0, 99)}…` : descricao,
    descricao,
    endereco: dados.endereco.trim(),
    bairro: dados.bairro.trim(),
    categoria: dados.categoria,
    status: 'aberta',
    apoios: 0,
    tempo: 'agora',
    foto: dados.foto,
    criadoEm: new Date().toISOString(),
    posicao: { ...dados.posicao },
  }

  const banco = await abrirBanco()
  let registrada: OcorrenciaMapa
  try {
    registrada = await new Promise<OcorrenciaMapa>((resolve, reject) => {
      const transacao = banco.transaction(NOME_COLECAO, 'readwrite')
      const colecao = transacao.objectStore(NOME_COLECAO)
      let pedido: IDBRequest<IDBValidKey>
      // Lê e grava na mesma transação: se o pin cair em cima de outro, vai para o ponto livre mais próximo
      const existentes = colecao.getAll()
      existentes.onsuccess = () => {
        const ocupadas = (existentes.result as OcorrenciaMapa[]).map(({ posicao }) => posicao)
        nova.posicao = posicaoLivre(nova.posicao, ocupadas)
        pedido = colecao.add(nova)
      }
      transacao.oncomplete = () => resolve({ ...nova, id: pedido.result as number })
      transacao.onabort = () => {
        const mensagem = transacao.error?.name === 'QuotaExceededError'
          ? 'Não há espaço para salvar esta ocorrência. Libere espaço no navegador e tente novamente.'
          : 'Não foi possível salvar a ocorrência neste navegador. Seus dados não foram publicados. Tente novamente.'
        reject(new Error(mensagem))
      }
    })
  } finally {
    banco.close()
  }

  if (typeof window !== 'undefined') window.dispatchEvent(new Event(EVENTO_OCORRENCIAS_ATUALIZADAS))
  return registrada
}

// Ocorrências antigas e as de exemplo não têm histórico salvo: monta um a partir do status atual
export function historicoDaOcorrencia(ocorrencia: OcorrenciaMapa): EventoHistorico[] {
  if (ocorrencia.historico) return ocorrencia.historico

  const eventos: EventoHistorico[] = [
    { status: 'aberta', texto: 'Ocorrência registrada com foto no local.', data: ocorrencia.criadoEm },
  ]
  if (ocorrencia.status === 'confirmada') eventos.push({ status: 'confirmada', texto: 'Vizinhos confirmaram o problema.' })
  if (ocorrencia.status === 'resolvida') eventos.push({ status: 'resolvida', texto: 'Vizinhos confirmaram que o problema foi resolvido.' })
  if (ocorrencia.status === 'reaberta') eventos.push({ status: 'reaberta', texto: 'O problema voltou e a ocorrência foi reaberta.' })
  return eventos
}

export async function buscarOcorrencia(id: number): Promise<OcorrenciaMapa | null> {
  const banco = await abrirBanco()
  try {
    const registro = await new Promise<OcorrenciaMapa | undefined>((resolve, reject) => {
      const transacao = banco.transaction(NOME_COLECAO, 'readonly')
      const pedido = transacao.objectStore(NOME_COLECAO).get(id)
      transacao.oncomplete = () => resolve(pedido.result as OcorrenciaMapa | undefined)
      transacao.onabort = () => reject(new Error('Não foi possível carregar a ocorrência. Tente novamente.'))
    })
    if (!registro) return null
    return { ...registro, tempo: registro.criadoEm ? tempoDecorrido(registro.criadoEm) : registro.tempo }
  } finally {
    banco.close()
  }
}

// Lê, altera e grava na mesma transação, para duas abas não sobrescreverem a mudança uma da outra
async function alterarOcorrencia(id: number, alterar: (atual: OcorrenciaMapa) => OcorrenciaMapa): Promise<OcorrenciaMapa> {
  const banco = await abrirBanco()
  let alterada: OcorrenciaMapa | undefined
  let erroRegra: Error | undefined
  try {
    await new Promise<void>((resolve, reject) => {
      const transacao = banco.transaction(NOME_COLECAO, 'readwrite')
      const colecao = transacao.objectStore(NOME_COLECAO)
      const pedido = colecao.get(id)
      pedido.onsuccess = () => {
        const atual = pedido.result as OcorrenciaMapa | undefined
        if (!atual) {
          erroRegra = new Error('Esta ocorrência não existe mais.')
          transacao.abort()
          return
        }
        try {
          alterada = alterar({ ...atual, historico: historicoDaOcorrencia(atual) })
          colecao.put(alterada)
        } catch (erro) {
          erroRegra = erro instanceof Error ? erro : new Error('Não foi possível atualizar a ocorrência.')
          transacao.abort()
        }
      }
      transacao.oncomplete = () => resolve()
      transacao.onabort = () => reject(erroRegra ?? new Error('Não foi possível atualizar a ocorrência neste navegador. Tente novamente.'))
    })
  } finally {
    banco.close()
  }

  if (typeof window !== 'undefined') window.dispatchEvent(new Event(EVENTO_OCORRENCIAS_ATUALIZADAS))
  return alterada!
}

function comEvento(ocorrencia: OcorrenciaMapa, status: StatusOcorrencia, texto: string, comFotos = false): OcorrenciaMapa {
  const evento: EventoHistorico = { status, texto, data: new Date().toISOString(), ...(comFotos && { comFotos }) }
  // O evento mais recente fica no topo da linha do tempo
  return { ...ocorrencia, status, historico: [evento, ...(ocorrencia.historico ?? [])] }
}

// Com duas ou mais pessoas vendo o problema, a ocorrência aberta passa a confirmada
const APOIOS_PARA_CONFIRMAR = 2

export function apoiarOcorrencia(id: number) {
  return alterarOcorrencia(id, (atual) => {
    const apoiada = { ...atual, apoios: atual.apoios + 1 }
    if (atual.status === 'aberta' && apoiada.apoios >= APOIOS_PARA_CONFIRMAR) {
      return comEvento(apoiada, 'confirmada', 'Vizinhos confirmaram o problema.')
    }
    return apoiada
  })
}

export function enviarFotoDepois(id: number, foto: File) {
  const erroFoto = validarFoto(foto)
  if (erroFoto) return Promise.reject(new Error(erroFoto))

  return alterarOcorrencia(id, (atual) => {
    if (atual.status === 'resolvida') throw new Error('Esta ocorrência já foi resolvida.')
    return comEvento({ ...atual, fotoDepois: foto }, atual.status, 'Foto do depois enviada. Aguardando confirmação.', true)
  })
}

export function confirmarResolucao(id: number) {
  return alterarOcorrencia(id, (atual) => {
    if (!atual.fotoDepois) throw new Error('Envie a foto do depois antes de confirmar a resolução.')
    return comEvento(atual, 'resolvida', 'Vizinhos confirmaram que o problema foi resolvido.')
  })
}

export function contestarResolucao(id: number) {
  return alterarOcorrencia(id, (atual) => {
    if (!atual.fotoDepois) throw new Error('Não há resolução para contestar.')
    // A foto do depois sai: quem resolver de novo envia uma nova
    return comEvento({ ...atual, fotoDepois: undefined }, 'reaberta', 'Um vizinho contestou: o problema continua no local.')
  })
}

// Guarda neste navegador quais ocorrências a pessoa já apoiou, para não apoiar duas vezes
const CHAVE_APOIOS = 'resolveai:apoios'

function lerApoiadas(): number[] {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_APOIOS) ?? '[]')
    return Array.isArray(salvo) ? salvo.filter(Number.isSafeInteger) : []
  } catch {
    return []
  }
}

export function jaApoiou(id: number) {
  return lerApoiadas().includes(id)
}

export function marcarApoio(id: number) {
  try {
    localStorage.setItem(CHAVE_APOIOS, JSON.stringify([...new Set([...lerApoiadas(), id])]))
  } catch {
    // Sem armazenamento local, o apoio vale só enquanto a página estiver aberta
  }
}

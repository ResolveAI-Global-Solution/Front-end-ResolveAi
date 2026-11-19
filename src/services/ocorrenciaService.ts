import { ocorrencias } from '../data/mapa'
import type { OcorrenciaMapa, RegistroOcorrenciaForm } from '../types'
import { validarOcorrencia } from './validarOcorrencia'

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
      const pedido = transacao.objectStore(NOME_COLECAO).add(nova)
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

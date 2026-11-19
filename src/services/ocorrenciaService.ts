import { USUARIO_DEMO } from '../data/demo'
import { idBairroMapa } from '../data/mapa'
import { categoriasRegistro } from '../data/registro'
import type { CategoriaOcorrencia, EventoHistorico, OcorrenciaMapa, RegistroOcorrenciaForm, StatusOcorrencia } from '../types'
import type { HistoricoApi, OcorrenciaApi, StatusApi } from '../types/api'
import { paraCoordenadas, paraPosicao } from '../utils/coordenadas'
import { ErroApi, requisitar } from './api'
import { buscarFoto, buscarFotos, salvarFoto } from './fotosLocais'
import { validarOcorrencia } from './validarOcorrencia'

// As telas continuam chamando as mesmas funções; só a origem dos dados mudou (navegador -> API Java).

export const EVENTO_OCORRENCIAS_ATUALIZADAS = 'resolveai:ocorrencias-atualizadas'

function avisarAtualizacao() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(EVENTO_OCORRENCIAS_ATUALIZADAS))
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

// A API usa MAIÚSCULAS; a tela usa minúsculas. REJEITADA não aparece para o morador.
const statusDaApi: Record<StatusApi, StatusOcorrencia | null> = {
  ABERTA: 'aberta',
  CONFIRMADA: 'confirmada',
  EM_ANALISE: 'em_analise',
  ENCAMINHADA: 'encaminhada',
  RESOLVIDA: 'resolvida',
  REABERTA: 'reaberta',
  REJEITADA: null,
}

// Texto do histórico quando a API não manda observação
const textoPadrao: Record<StatusOcorrencia, string> = {
  aberta: 'Ocorrência registrada.',
  confirmada: 'Vizinhos confirmaram o problema.',
  em_analise: 'A ocorrência está em análise.',
  encaminhada: 'A ocorrência foi encaminhada.',
  resolvida: 'Vizinhos confirmaram que o problema foi resolvido.',
  reaberta: 'O problema voltou e a ocorrência foi reaberta.',
}

function categoriaDaApi(id: number): CategoriaOcorrencia {
  return categoriasRegistro.find((categoria) => categoria.id === id)?.valor ?? 'outra'
}

/** Converte a resposta da API no formato que as telas já usam. Devolve null para REJEITADA. */
function paraOcorrenciaMapa(dados: OcorrenciaApi): OcorrenciaMapa | null {
  const status = statusDaApi[dados.status]
  if (!status) return null
  return {
    id: dados.id,
    titulo: dados.titulo,
    descricao: dados.descricao ?? undefined,
    endereco: dados.endereco ?? 'Endereço não informado',
    bairro: dados.bairro,
    categoria: categoriaDaApi(dados.categoria.id),
    status,
    apoios: dados.quantidadeApoios ?? 0,
    tempo: tempoDecorrido(dados.dataRegistro),
    posicao: paraPosicao(dados.latitude, dados.longitude),
    coordenadas: { latitude: dados.latitude, longitude: dados.longitude },
    criadoEm: dados.dataRegistro,
  }
}

/** Histórico da API -> eventos da linha do tempo, com o mais recente no topo. */
function paraEventos(historico: HistoricoApi[]): EventoHistorico[] {
  const eventos: (EventoHistorico & { id: number })[] = []
  for (const registro of historico) {
    const status = statusDaApi[registro.status]
    if (!status) continue
    eventos.push({ id: registro.id, status, texto: registro.observacao || textoPadrao[status], data: registro.dataStatus })
  }
  eventos.sort((a, b) => Date.parse(b.data ?? '') - Date.parse(a.data ?? '') || b.id - a.id)
  return eventos.map(({ status, texto, data }) => ({ status, texto, data }))
}

/** GET /ocorrencias?bairro=9: as ocorrências do bairro do mapa, das mais novas para as mais antigas. */
export async function listarOcorrencias(): Promise<OcorrenciaMapa[]> {
  const [lista, fotos] = await Promise.all([
    requisitar<OcorrenciaApi[]>(`/ocorrencias?bairro=${idBairroMapa}`),
    buscarFotos('ocorrencias'),
  ])
  return lista
    .map(paraOcorrenciaMapa)
    .filter((ocorrencia): ocorrencia is OcorrenciaMapa => ocorrencia !== null)
    .map((ocorrencia) => ({ ...ocorrencia, foto: fotos.get(ocorrencia.id) }))
    .sort((a, b) => Date.parse(b.criadoEm ?? '') - Date.parse(a.criadoEm ?? '') || b.id - a.id)
}

/**
 * POST /ocorrencias, como o morador de demonstração. A posição do pin vira latitude/longitude.
 * A foto não vai para a API: fica salva só neste navegador, com o id que a API devolveu.
 */
export async function registrarOcorrencia(dados: RegistroOcorrenciaForm): Promise<OcorrenciaMapa> {
  const categoria = categoriasRegistro.find(({ valor }) => valor === dados.categoria)
  if (Object.keys(validarOcorrencia(dados)).length > 0 || !categoria) {
    throw new Error('Confira os campos da ocorrência antes de continuar.')
  }

  const descricao = dados.descricao.trim()
  const { latitude, longitude } = paraCoordenadas(dados.posicao)
  const criada = await requisitar<OcorrenciaApi>('/ocorrencias', {
    method: 'POST',
    body: JSON.stringify({
      cdUsuario: USUARIO_DEMO.id,
      cdCategoria: categoria.id,
      cdBairro: idBairroMapa,
      titulo: descricao.length > 100 ? `${descricao.slice(0, 99)}…` : descricao,
      descricao,
      endereco: dados.endereco.trim(),
      latitude,
      longitude,
    }),
  })

  // Salva antes de avisar as telas, para o mapa já recarregar com a foto
  const fotoSalva = dados.foto ? await salvarFoto('ocorrencias', criada.id, dados.foto) : false

  avisarAtualizacao()
  const ocorrencia = paraOcorrenciaMapa(criada)
  if (!ocorrencia) throw new Error('A ocorrência foi registrada, mas não pôde ser exibida.')
  return fotoSalva && dados.foto ? { ...ocorrencia, foto: dados.foto } : ocorrencia
}

export function historicoDaOcorrencia(ocorrencia: OcorrenciaMapa): EventoHistorico[] {
  return ocorrencia.historico ?? []
}

/** GET /ocorrencias/{id} + /historico. Devolve null se a ocorrência não existe (404) ou foi rejeitada. */
export async function buscarOcorrencia(id: number): Promise<OcorrenciaMapa | null> {
  try {
    const [dados, historico, foto] = await Promise.all([
      requisitar<OcorrenciaApi>(`/ocorrencias/${id}`),
      requisitar<HistoricoApi[]>(`/ocorrencias/${id}/historico`),
      buscarFoto('ocorrencias', id),
    ])
    const ocorrencia = paraOcorrenciaMapa(dados)
    return ocorrencia ? { ...ocorrencia, foto, historico: paraEventos(historico) } : null
  } catch (erro) {
    if (erro instanceof ErroApi && erro.status === 404) return null
    throw erro
  }
}

/**
 * POST /ocorrencias/{id}/apoios ("Eu também vi").
 * Modo demonstração: em vez da localização real do navegador, manda as coordenadas da própria
 * ocorrência, para dar para testar de qualquer lugar. A API continua conferindo os 500 m (aqui dá 0 m)
 * e as outras regras (um apoio por pessoa, autor não apoia), respondendo 409 se alguma falhar.
 */
export async function apoiarOcorrencia(ocorrencia: OcorrenciaMapa): Promise<void> {
  const { latitude, longitude } = ocorrencia.coordenadas ?? paraCoordenadas(ocorrencia.posicao)
  await requisitar(`/ocorrencias/${ocorrencia.id}/apoios`, {
    method: 'POST',
    body: JSON.stringify({ cdUsuario: USUARIO_DEMO.id, latitude, longitude }),
  })
  avisarAtualizacao()
}

// Guarda neste navegador quais ocorrências já foram apoiadas, só para o botão já abrir marcado.
// Quem garante "um apoio por pessoa" de verdade é a API (409).
const CHAVE_APOIOS = 'resolveai:apoios-api'

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

/** Status como a API Java devolve (enum StatusOcorrencia). */
export type StatusApi = 'ABERTA' | 'CONFIRMADA' | 'EM_ANALISE' | 'ENCAMINHADA' | 'RESOLVIDA' | 'REABERTA' | 'REJEITADA'

/** Uma ocorrência em GET /ocorrencias e GET /ocorrencias/{id} (OcorrenciaResponseDTO). */
export interface OcorrenciaApi {
  id: number
  titulo: string
  descricao?: string | null
  endereco?: string | null
  bairro: string
  municipio: string
  categoria: { id: number; nome: string }
  status: StatusApi
  quantidadeApoios?: number | null
  latitude: number
  longitude: number
  dataRegistro: string
  dataResolucao?: string | null
}

/** Um registro de GET /ocorrencias/{id}/historico (HistoricoStatusResponseDTO). */
export interface HistoricoApi {
  id: number
  cdOcorrencia: number
  status: StatusApi
  dataStatus: string
  observacao?: string | null
}

/** Corpo de erro que a API sempre devolve (ErroResponseDTO). */
export interface ErroRespostaApi {
  status: number
  erro: string
  mensagem: string
  caminho: string
  campos?: { campo: string; mensagem: string }[]
}

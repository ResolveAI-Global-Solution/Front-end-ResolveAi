export interface NavLinkItem {
  label: string
  to: string
}

export interface Estatistica {
  valor: string
  descricao: string
  fonte: string
}

export interface Passo {
  titulo: string
  descricao: string
  icone: 'pin' | 'eye' | 'clock' | 'chart'
}

export interface PlacarItem {
  posicao: number
  nome: string
  resolvidoPct: number
  diasMedia: number
  porMilHab: number
}

export interface Ods {
  numero: number
  titulo: string
  descricao: string
}
export interface Diferencial {
  icone: 'users' | 'shield' | 'sparkles'
  titulo: string
  descricao: string
}
export interface ContatoForm {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

export type ContatoErros = Partial<Record<keyof ContatoForm, string>>

export type CategoriaOcorrencia = 'buraco' | 'iluminacao' | 'alagamento'
export type CategoriaRegistro = CategoriaOcorrencia | 'calcada' | 'poda' | 'descarte' | 'esgoto' | 'pragas'
export type StatusOcorrencia = 'aberta' | 'confirmada' | 'resolvida' | 'reaberta'

export interface EventoHistorico {
  status: StatusOcorrencia
  texto: string
  // Data ISO; os registros de exemplo não têm data e mostram só o texto
  data?: string
  // Mostra as miniaturas de antes e depois no evento
  comFotos?: boolean
}

export interface OcorrenciaMapa {
  id: number
  titulo: string
  endereco: string
  bairro: string
  categoria: CategoriaRegistro
  status: StatusOcorrencia
  apoios: number
  tempo: string
  posicao: { x: number; y: number }
  descricao?: string
  foto?: Blob
  fotoDepois?: Blob
  historico?: EventoHistorico[]
  criadoEm?: string
}

export interface PrevisaoPrazo {
  dias: number
  risco: 'baixo' | 'médio' | 'alto'
}

export interface RegistroOcorrenciaForm {
  categoria: CategoriaRegistro | ''
  descricao: string
  endereco: string
  bairro: string
  foto: File | null
  posicao: { x: number; y: number }
}

export type RegistroOcorrenciaErros = Partial<Record<keyof RegistroOcorrenciaForm, string>>
export interface PerguntaFaq {
  pergunta: string
  resposta: string
}

export interface Integrante {
  rm: string
  nome: string
  turma: string
  curso: string
  foto: string
  github: string
  linkedin: string
}

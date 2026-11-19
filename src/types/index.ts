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

export interface OcorrenciaMapa {
  id: number
  titulo: string
  endereco: string
  bairro: string
  categoria: CategoriaOcorrencia
  status: StatusOcorrencia
  apoios: number
  tempo: string
  posicao: { x: number; y: number }
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

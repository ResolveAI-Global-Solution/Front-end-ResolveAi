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
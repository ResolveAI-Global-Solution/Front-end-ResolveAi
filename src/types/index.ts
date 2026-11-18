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
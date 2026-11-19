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

// As 5 categorias do banco (tb_categoria) + 'outra', para categoria nova criada direto na API
export type CategoriaOcorrencia = 'buraco' | 'calcada' | 'iluminacao' | 'drenagem' | 'limpeza' | 'outra'
export type CategoriaRegistro = Exclude<CategoriaOcorrencia, 'outra'>
export type StatusOcorrencia = 'aberta' | 'confirmada' | 'em_analise' | 'encaminhada' | 'resolvida' | 'reaberta'

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
  categoria: CategoriaOcorrencia
  status: StatusOcorrencia
  apoios: number
  tempo: string
  posicao: { x: number; y: number }
  descricao?: string
  // Foto do registro: fica só neste navegador (IndexedDB), a API não guarda fotos
  foto?: Blob
  // Ainda sem fluxo de envio: chega sempre vazia
  fotoDepois?: Blob
  historico?: EventoHistorico[]
  criadoEm?: string
}

export interface RegistroOcorrenciaForm {
  categoria: CategoriaRegistro | ''
  descricao: string
  endereco: string
  bairro: string
  posicao: { x: number; y: number }
  // Opcional; salva só neste navegador, não vai para a API
  foto: File | null
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

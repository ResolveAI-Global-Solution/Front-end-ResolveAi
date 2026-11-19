import type { CategoriaRegistro } from '../types'

export const categoriasRegistro: { valor: CategoriaRegistro; label: string }[] = [
  { valor: 'buraco', label: 'Buraco na via' },
  { valor: 'calcada', label: 'Calçada danificada' },
  { valor: 'iluminacao', label: 'Iluminação' },
  { valor: 'poda', label: 'Poda de árvore' },
  { valor: 'descarte', label: 'Descarte irregular de lixo' },
  { valor: 'esgoto', label: 'Esgoto a céu aberto' },
  { valor: 'alagamento', label: 'Alagamento' },
  { valor: 'pragas', label: 'Infestação de pragas' },
]

export const TAMANHO_MAXIMO_FOTO = 5 * 1024 * 1024
export const TIPOS_FOTO = ['image/jpeg', 'image/png', 'image/webp']

export const limitesRegistro = {
  descricao: { min: 10, max: 280 },
  endereco: { min: 5, max: 160 },
  bairro: { min: 2, max: 80 },
} as const

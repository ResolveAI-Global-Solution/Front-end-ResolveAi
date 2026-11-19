import type { CategoriaRegistro } from '../types'

// id = cd_categoria no banco da API (tb_categoria)
export const categoriasRegistro: { valor: CategoriaRegistro; label: string; id: number }[] = [
  { valor: 'buraco', label: 'Buraco na via', id: 1 },
  { valor: 'calcada', label: 'Calçada danificada', id: 2 },
  { valor: 'iluminacao', label: 'Iluminação pública', id: 3 },
  { valor: 'drenagem', label: 'Drenagem e bueiro', id: 4 },
  { valor: 'limpeza', label: 'Mato alto e limpeza', id: 5 },
]

export const TAMANHO_MAXIMO_FOTO = 5 * 1024 * 1024
export const TIPOS_FOTO = ['image/jpeg', 'image/png', 'image/webp']

// endereco.max = 150, o mesmo limite da API (ds_endereco VARCHAR2(150))
export const limitesRegistro = {
  descricao: { min: 10, max: 280 },
  endereco: { min: 5, max: 150 },
  bairro: { min: 2, max: 80 },
} as const

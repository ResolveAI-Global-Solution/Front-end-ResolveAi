import { Bug, CircleDot, CircleCheck, Construction, Droplet, Grid2X2, Lightbulb, RotateCcw, Trash2, TreePine, Users, Waves } from 'lucide-react'
import type { CategoriaRegistro, StatusOcorrencia } from '../../types'

export const categorias = {
  buraco: { label: 'Buraco na via', Icone: Construction },
  calcada: { label: 'Calçada danificada', Icone: Grid2X2 },
  iluminacao: { label: 'Iluminação', Icone: Lightbulb },
  poda: { label: 'Poda de árvore', Icone: TreePine },
  descarte: { label: 'Descarte irregular de lixo', Icone: Trash2 },
  esgoto: { label: 'Esgoto a céu aberto', Icone: Droplet },
  alagamento: { label: 'Alagamento', Icone: Waves },
  pragas: { label: 'Infestação de pragas', Icone: Bug },
} satisfies Record<CategoriaRegistro, { label: string; Icone: typeof Construction }>

export const statusOcorrencia = {
  aberta: { label: 'Aberta', Icone: CircleDot, badge: 'bg-amber-100 text-amber-800', pin: 'bg-amber-800' },
  confirmada: { label: 'Confirmada', Icone: Users, badge: 'bg-brand-soft text-blue-700', pin: 'bg-blue-700' },
  resolvida: { label: 'Resolvida', Icone: CircleCheck, badge: 'bg-green-100 text-green-800', pin: 'bg-green-800' },
  reaberta: { label: 'Reaberta', Icone: RotateCcw, badge: 'bg-red-100 text-red-700', pin: 'bg-red-700' },
} satisfies Record<StatusOcorrencia, { label: string; Icone: typeof CircleDot; badge: string; pin: string }>

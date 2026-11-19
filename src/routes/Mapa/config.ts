import { CircleDot, CircleCheck, Construction, Lightbulb, List, RotateCcw, Users, Waves } from 'lucide-react'
import type { CategoriaOcorrencia, StatusOcorrencia } from '../../types'

export const categorias = {
  buraco: { label: 'Buraco na via', Icone: Construction },
  iluminacao: { label: 'Iluminação', Icone: Lightbulb },
  alagamento: { label: 'Alagamento', Icone: Waves },
} satisfies Record<CategoriaOcorrencia, { label: string; Icone: typeof Construction }>

export const statusOcorrencia = {
  aberta: { label: 'Aberta', Icone: CircleDot, badge: 'bg-amber-100 text-amber-800', pin: 'bg-amber-800' },
  confirmada: { label: 'Confirmada', Icone: Users, badge: 'bg-brand-soft text-blue-700', pin: 'bg-blue-700' },
  resolvida: { label: 'Resolvida', Icone: CircleCheck, badge: 'bg-green-100 text-green-800', pin: 'bg-green-800' },
  reaberta: { label: 'Reaberta', Icone: RotateCcw, badge: 'bg-red-100 text-red-700', pin: 'bg-red-700' },
} satisfies Record<StatusOcorrencia, { label: string; Icone: typeof CircleDot; badge: string; pin: string }>

export const filtros = [
  { valor: 'todas', label: 'Todas', Icone: List },
  { valor: 'buraco', ...categorias.buraco },
  { valor: 'iluminacao', ...categorias.iluminacao },
] as const

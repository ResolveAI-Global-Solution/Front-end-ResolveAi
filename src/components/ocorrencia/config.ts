import { CircleCheck, CircleDot, CircleHelp, Clock, Construction, Grid2X2, Lightbulb, RotateCcw, Send, TreePine, Users, Waves } from 'lucide-react'
import type { CategoriaOcorrencia, StatusOcorrencia } from '../../types'

// Mesmas categorias do banco (tb_categoria), com acento para a tela
export const categorias = {
  buraco: { label: 'Buraco na via', Icone: Construction },
  calcada: { label: 'Calçada danificada', Icone: Grid2X2 },
  iluminacao: { label: 'Iluminação pública', Icone: Lightbulb },
  drenagem: { label: 'Drenagem e bueiro', Icone: Waves },
  limpeza: { label: 'Mato alto e limpeza', Icone: TreePine },
  outra: { label: 'Outra categoria', Icone: CircleHelp },
} satisfies Record<CategoriaOcorrencia, { label: string; Icone: typeof Construction }>

export const statusOcorrencia = {
  aberta: { label: 'Aberta', Icone: CircleDot, badge: 'bg-amber-100 text-amber-800', pin: 'bg-amber-800' },
  confirmada: { label: 'Confirmada', Icone: Users, badge: 'bg-brand-soft text-blue-700', pin: 'bg-blue-700' },
  em_analise: { label: 'Em análise', Icone: Clock, badge: 'bg-violet-100 text-violet-800', pin: 'bg-violet-800' },
  encaminhada: { label: 'Encaminhada', Icone: Send, badge: 'bg-sky-100 text-sky-800', pin: 'bg-sky-800' },
  resolvida: { label: 'Resolvida', Icone: CircleCheck, badge: 'bg-green-100 text-green-800', pin: 'bg-green-800' },
  reaberta: { label: 'Reaberta', Icone: RotateCcw, badge: 'bg-red-100 text-red-700', pin: 'bg-red-700' },
} satisfies Record<StatusOcorrencia, { label: string; Icone: typeof CircleDot; badge: string; pin: string }>

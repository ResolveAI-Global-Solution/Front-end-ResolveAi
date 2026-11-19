import { List } from 'lucide-react'
import { categorias } from '../../components/ocorrencia/config'

export const filtros = [
  { valor: 'todas', label: 'Todas', Icone: List },
  { valor: 'buraco', ...categorias.buraco },
  { valor: 'iluminacao', ...categorias.iluminacao },
] as const

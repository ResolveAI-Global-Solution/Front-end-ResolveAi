import type { StatusOcorrencia } from '../../types'
import { statusOcorrencia } from './config'

export default function StatusBadge({ status }: { status: StatusOcorrencia }) {
  const { label, Icone, badge } = statusOcorrencia[status]

  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge}`}>
      <Icone size={13} aria-hidden />
      {label}
    </span>
  )
}

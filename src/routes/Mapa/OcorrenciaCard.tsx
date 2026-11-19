import { Eye, Image } from 'lucide-react'
import type { OcorrenciaMapa } from '../../types'
import { categorias } from './config'
import StatusBadge from './StatusBadge'

interface OcorrenciaCardProps {
  ocorrencia: OcorrenciaMapa
  selecionada: boolean
  onSelecionar: (id: number) => void
}

export default function OcorrenciaCard({ ocorrencia, selecionada, onSelecionar }: OcorrenciaCardProps) {
  const { label, Icone } = categorias[ocorrencia.categoria]

  return (
    <button
      type="button"
      aria-pressed={selecionada}
      onClick={() => onSelecionar(ocorrencia.id)}
      className={`flex w-full cursor-pointer gap-3 rounded-xl border p-2.5 text-left shadow-sm outline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-brand ${selecionada ? 'border-brand bg-brand-soft' : 'border-neutral-200 bg-white hover:border-blue-300'}`}
    >
      <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500" aria-hidden>
        <Image size={20} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700">
          <Icone size={13} aria-hidden /> {label}
        </span>
        <span className="text-sm font-semibold leading-snug">{ocorrencia.titulo}</span>
        <span className="text-xs leading-relaxed text-neutral-600">
          {ocorrencia.endereco}{ocorrencia.id === 1 && ` · ${ocorrencia.bairro}`}
        </span>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <StatusBadge status={ocorrencia.status} />
          <span className="inline-flex items-center gap-1 text-[11px] text-neutral-600">
            <Eye size={12} aria-hidden /> {ocorrencia.apoios} viram
          </span>
          <span className="text-[11px] text-neutral-600">{ocorrencia.tempo}</span>
        </span>
      </span>
    </button>
  )
}

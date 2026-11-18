import { BarChart3, Clock, Eye, MapPin } from 'lucide-react'
import type { Passo } from '../../../types'

const icones = { pin: MapPin, eye: Eye, clock: Clock, chart: BarChart3 }

interface StepCardProps extends Passo {
  numero: number
}

export default function StepCard({ numero, titulo, descricao, icone }: StepCardProps) {
  const Icone = icones[icone]
  return (
    <article className="rounded-xl bg-neutral-100 p-5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
        <Icone size={16} aria-hidden />
      </span>
      <h3 className="mt-3 text-sm font-semibold">
        {String(numero).padStart(2, '0')} · {titulo}
      </h3>
      <p className="mt-2 text-sm text-neutral-700">{descricao}</p>
    </article>
  )
}
import { Shield, Sparkles, Users } from 'lucide-react'
import type { Diferencial } from '../../types'

const icones = { users: Users, shield: Shield, sparkles: Sparkles }

export default function DiferencialCard({ icone, titulo, descricao }: Diferencial) {
  const Icone = icones[icone]
  return (
    <article className="rounded-xl bg-neutral-100 p-5">
      <Icone size={20} className="text-brand" aria-hidden />
      <h3 className="mt-3 text-sm font-semibold">{titulo}</h3>
      <p className="mt-2 text-sm text-neutral-700">{descricao}</p>
    </article>
  )
}
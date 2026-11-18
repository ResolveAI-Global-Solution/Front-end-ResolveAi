import type { Estatistica } from '../types'

export default function StatCard({ valor, descricao, fonte }: Estatistica) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-4xl font-semibold text-brand">{valor}</p>
      <p className="mt-3 text-sm text-neutral-700">{descricao}</p>
      <p className="mt-3 text-xs text-neutral-500">{fonte}</p>
    </article>
  )
}
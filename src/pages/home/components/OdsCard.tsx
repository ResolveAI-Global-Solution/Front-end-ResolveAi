import type { Ods } from '../../../types'

export default function OdsCard({ numero, titulo, descricao }: Ods) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-sm font-semibold text-white">{numero}</span>
      <h3 className="mt-4 text-sm font-semibold">{titulo}</h3>
      <p className="mt-2 text-sm text-neutral-700">{descricao}</p>
    </article>
  )
}
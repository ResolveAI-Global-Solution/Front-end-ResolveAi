import type { LucideIcon } from 'lucide-react'

interface CriterioChipProps {
  texto: string
  icone: LucideIcon
  ativo: boolean
  aoClicar: () => void
}

/** Botão em formato de pílula que escolhe por qual número o placar é ordenado. */
export default function CriterioChip({ texto, icone: Icone, ativo, aoClicar }: CriterioChipProps) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-pressed={ativo}
      className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold ${
        ativo ? 'border-brand bg-brand-soft text-brand' : 'border-neutral-300 bg-white text-black hover:border-brand'
      }`}
    >
      <Icone size={18} aria-hidden="true" />
      {texto}
    </button>
  )
}

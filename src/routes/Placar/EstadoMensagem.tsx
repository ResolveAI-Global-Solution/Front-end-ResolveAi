import type { LucideIcon } from 'lucide-react'

interface EstadoMensagemProps {
  icone: LucideIcon
  titulo: string
  texto: string
  acao?: string
  aoClicar?: () => void
}

/** Caixa de aviso usada quando não há dados ou quando a API falha. O botão é opcional. */
export default function EstadoMensagem({ icone: Icone, titulo, texto, acao, aoClicar }: EstadoMensagemProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-neutral-200 bg-white px-6 py-10 text-center" role="status">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Icone size={28} aria-hidden="true" />
      </span>
      <p className="mt-4 text-lg font-semibold">{titulo}</p>
      <p className="mt-2 max-w-sm text-neutral-600">{texto}</p>
      {acao && aoClicar && (
        <button
          type="button"
          onClick={aoClicar}
          className="mt-5 min-h-12 rounded-lg bg-brand px-5 font-semibold text-white hover:bg-blue-700"
        >
          {acao}
        </button>
      )}
    </div>
  )
}

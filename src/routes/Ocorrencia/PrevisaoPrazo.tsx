import { ExternalLink, Sparkles } from 'lucide-react'
import { URL_ESTIMADOR_IA } from '../../data/ia'

export default function PrevisaoPrazo() {
  return (
    <section aria-labelledby="titulo-previsao" className="flex items-start gap-3 rounded-xl bg-brand-soft p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
        <Sparkles size={20} aria-hidden />
      </span>
      <div>
        <h2 id="titulo-previsao" className="text-xs font-medium text-blue-700">Previsão de prazo (IA)</h2>
        <p className="mt-0.5 text-lg font-semibold">Quanto tempo pedidos parecidos levam?</p>
        <p className="mt-0.5 text-sm text-neutral-700">
          Nossa IA estima a chance de um pedido ser encerrado em até 7 dias, com dados abertos do SP156.
        </p>
        <a
          href={URL_ESTIMADOR_IA}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Ver estimativa da IA
          <ExternalLink size={16} aria-hidden />
          <span className="sr-only">(abre em nova aba)</span>
        </a>
        {/* O servidor gratuito do Render "dorme" sem uso e demora para acordar */}
        <p className="mt-2 text-xs text-neutral-600">A página pode levar até 1 minuto para abrir na primeira vez.</p>
      </div>
    </section>
  )
}

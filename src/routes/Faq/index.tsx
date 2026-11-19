import { Link } from 'react-router-dom'
import { perguntas } from '../../data/faq'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import FaqItem from './FaqItem'

export default function Faq() {
  useTituloPagina('FAQ')

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16 lg:pt-20 lg:pb-24">
      {/* No desktop, a coluna da esquerda acompanha a rolagem da lista */}
      <div className="flex flex-col items-start gap-4 lg:sticky lg:top-24 lg:self-start">
        <h1 className="text-3xl font-semibold sm:text-4xl">Perguntas frequentes</h1>
        <p className="text-neutral-500">Não achou sua dúvida? Fale com a gente pela página de contato.</p>
        <Link
          to="/contato"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border-[1.5px] border-brand bg-white px-5 font-semibold text-brand hover:bg-brand-soft"
        >
          Ir para contato
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {perguntas.map((p, i) => (
          // As duas primeiras começam abertas, como no protótipo
          <FaqItem key={p.pergunta} {...p} abertoInicial={i < 2} />
        ))}
      </div>
    </section>
  )
}

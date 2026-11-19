import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPinOff } from 'lucide-react'
import { useTituloPagina } from '../../hooks/useTituloPagina'

const atalhos = [
  { para: '/mapa', rotulo: 'Mapa de ocorrências' },
  { para: '/registrar', rotulo: 'Registrar ocorrência' },
  { para: '/placar', rotulo: 'Placar' },
  { para: '/faq', rotulo: 'Perguntas frequentes' },
]

interface NaoEncontradaProps {
  titulo?: string
  texto?: string
  /** Link principal; por padrão leva ao início. */
  voltarPara?: { para: string; rotulo: string }
}

/**
 * Página de erro 404. Usada na rota coringa (nenhuma rota corresponde ao endereço)
 * e nas páginas de detalhe quando o item do :id não existe.
 */
export default function NaoEncontrada({
  titulo = 'Página não encontrada',
  texto = 'Ele pode ter sido digitado errado ou a página pode ter mudado de lugar.',
  voltarPara = { para: '/', rotulo: 'Voltar ao início' },
}: NaoEncontradaProps) {
  useTituloPagina(titulo)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:py-28">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-brand">
        <MapPinOff size={36} aria-hidden="true" />
      </span>

      <p className="mt-6 text-sm font-semibold tracking-widest text-brand">ERRO 404</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{titulo}</h1>
      <p className="mt-4 max-w-md text-neutral-600">
        Não encontramos nada no endereço{' '}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm break-all text-neutral-800">{pathname}</code>.{' '}
        {texto}
      </p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link
          to={voltarPara.para}
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-5 font-semibold text-white hover:bg-blue-700"
        >
          {voltarPara.rotulo}
        </Link>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand bg-white px-5 font-semibold text-brand hover:bg-brand-soft"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Página anterior
        </button>
      </div>

      <nav aria-label="Atalhos" className="mt-12 w-full border-t border-neutral-200 pt-8">
        <p className="text-sm text-neutral-500">Ou vá direto para:</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {atalhos.map((a) => (
            <li key={a.para}>
              <Link to={a.para} className="text-sm font-semibold text-brand hover:underline">
                {a.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

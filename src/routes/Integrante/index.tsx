import { ChevronRight, Link2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { integrantes } from '../../data/integrantes'
import Placeholder from '../Placeholder'

const botao =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand bg-white px-5 py-3 font-semibold text-brand hover:bg-brand-soft'

export default function Integrante() {
  // O :id da rota é o RM do integrante: /integrantes/569898
  const { id } = useParams()
  const integrante = integrantes.find((i) => i.rm === id)

  if (!integrante) return <Placeholder titulo="Integrante não encontrado" />

  const { rm, nome, turma, curso, github, linkedin } = integrante

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:pt-16 lg:pb-24">
      <nav aria-label="Trilha de navegação" className="flex items-center gap-2 text-sm">
        <Link to="/integrantes" className="font-semibold text-brand hover:underline">
          Integrantes
        </Link>
        <ChevronRight size={16} className="text-neutral-500" aria-hidden />
        <span className="text-neutral-500" aria-current="page">
          {nome}
        </span>
      </nav>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
        <Avatar nome={nome} tamanho="lg" />
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold sm:text-4xl">{nome}</h1>
          <p className="text-lg font-semibold text-neutral-500">
            RM {rm} · Turma {turma} · {curso}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer" className={botao}>
              <Link2 size={20} aria-hidden />
              GitHub · {github}
            </a>
            <a href={`https://www.linkedin.com/in/${linkedin}/`} target="_blank" rel="noreferrer" className={botao}>
              <Link2 size={20} aria-hidden />
              LinkedIn · {linkedin}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-neutral-100 p-4">
        <p className="text-xs font-medium text-neutral-500">Rota com parâmetro</p>
        <p className="mt-1 text-neutral-700">
          /integrantes/:id → a página lê o RM na URL e mostra os dados do integrante.
        </p>
      </div>
    </section>
  )
}

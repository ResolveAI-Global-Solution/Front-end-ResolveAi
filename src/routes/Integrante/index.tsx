import { ChevronRight, Link2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { integrantes } from '../../data/integrantes'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import Placeholder from '../Placeholder'

const botao =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand bg-white px-5 py-3 font-semibold text-brand hover:bg-brand-soft'

export default function Integrante() {
  // O :id da rota é o RM do integrante: /integrantes/569898
  const { id } = useParams()
  const integrante = integrantes.find((i) => i.rm === id)

  // O hook vem antes do return antecipado: hooks não podem ser chamados de forma condicional
  useTituloPagina(integrante?.nome ?? 'Integrante não encontrado')

  if (!integrante) return <Placeholder titulo="Integrante não encontrado" />

  const { rm, nome, turma, curso, foto, github, linkedin } = integrante

  const dados = [
    { rotulo: 'RM', valor: rm },
    { rotulo: 'Turma', valor: turma },
    { rotulo: 'Curso', valor: curso },
    { rotulo: 'Equipe', valor: 'HalfTech · FIAP' },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <nav aria-label="Trilha de navegação" className="flex items-center gap-2 text-sm">
        <Link to="/integrantes" className="font-semibold text-brand hover:underline">
          Integrantes
        </Link>
        <ChevronRight size={16} className="text-neutral-500" aria-hidden />
        <span className="text-neutral-500" aria-current="page">
          {nome}
        </span>
      </nav>

      <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
        <img
          src={foto}
          alt={`Foto de ${nome}`}
          className="aspect-4/5 w-full max-w-sm justify-self-center rounded-2xl object-cover object-top shadow-lg md:max-w-none"
        />

        <div>
          <p className="text-sm font-semibold text-brand">Integrante HalfTech</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl lg:text-5xl">{nome}</h1>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {dados.map(({ rotulo, valor }) => (
              <div key={rotulo} className="rounded-xl bg-neutral-100 px-4 py-3">
                <dt className="text-xs font-medium text-neutral-500">{rotulo}</dt>
                <dd className="mt-0.5 font-semibold">{valor}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
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
    </section>
  )
}

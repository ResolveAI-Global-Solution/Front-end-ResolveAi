import { integrantes } from '../../data/integrantes'
import IntegranteCard from './IntegranteCard'

export default function Integrantes() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 lg:pt-20 lg:pb-24">
      <h1 className="text-3xl font-semibold sm:text-4xl">Integrantes</h1>
      <p className="mt-6 text-lg font-semibold text-neutral-500">Equipe HalfTech · Turma 1TDSPW · FIAP</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {integrantes.map((integrante) => (
          <IntegranteCard key={integrante.rm} {...integrante} />
        ))}
      </div>
    </section>
  )
}

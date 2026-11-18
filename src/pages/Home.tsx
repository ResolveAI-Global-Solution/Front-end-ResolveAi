import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import MapPreview from '../components/MapPreview'
import OdsCard from '../components/OdsCard'
import PlacarRow from '../components/PlacarRow'
import StatCard from '../components/StatCard'
import StepCard from '../components/StepCard'
import { estatisticas, ods, passos, placar } from '../data/home'

const container = 'mx-auto max-w-6xl px-4 sm:px-6'

export default function Home() {
  return (
    <>
      <section className="bg-black text-white">
        <div className={`${container} grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20`}>
          <div>
            <span className="inline-block rounded-full bg-brand px-3 py-1 text-[11px] font-medium">CitizenTech · São Paulo</span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Viu um problema no bairro? Resolve aí.
            </h1>
            <p className="mt-4 max-w-md text-sm text-neutral-200">
              Registre com foto e local, junte os vizinhos e acompanhe até a solução. Tudo público, de graça.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/registrar" className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold hover:bg-blue-700">
                <Plus size={16} aria-hidden /> Registrar ocorrência
              </Link>
              <Link to="/mapa" className="rounded-lg border border-brand bg-white px-4 py-2.5 text-sm font-semibold text-brand hover:bg-brand-soft">
                Ver o mapa do bairro
              </Link>
            </div>
          </div>
          <MapPreview />
        </div>
      </section>

      <section className="bg-neutral-100">
        <div className={`${container} py-12`}>
          <h2 className="text-xl font-semibold">Por que isso importa</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {estatisticas.map((e) => (
              <StatCard key={e.valor} {...e} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className={`${container} py-12`}>
          <h2 className="text-xl font-semibold">Como funciona</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {passos.map((p, i) => (
              <StepCard key={p.titulo} numero={i + 1} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-soft">
        <div className={`${container} grid items-center gap-8 py-12 lg:grid-cols-2`}>
          <div>
            <h2 className="text-xl font-semibold">Placar da cidade</h2>
            <p className="mt-3 max-w-md text-sm text-neutral-700">
              Como o poder público responde em cada subprefeitura, com dados abertos do SP156 e do próprio app. Sem rótulos de "melhor" ou "pior": só números.
            </p>
            <Link to="/placar" className="mt-5 inline-block rounded-lg border border-brand bg-white px-4 py-2.5 text-sm font-semibold text-brand hover:bg-brand-soft">
              Ver placar completo
            </Link>
          </div>
          <ul className="flex flex-col gap-3">
            {placar.map((p) => (
              <PlacarRow key={p.posicao} {...p} />
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className={`${container} py-12`}>
          <h2 className="text-xl font-semibold">Conectado aos ODS da ONU</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {ods.map((o) => (
              <OdsCard key={o.numero} {...o} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
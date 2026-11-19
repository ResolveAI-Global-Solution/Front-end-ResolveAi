import { Fragment, useState } from 'react'
import { Image, Search, X } from 'lucide-react'
import { bairroMapa, ocorrencias } from '../../data/mapa'
import type { CategoriaOcorrencia } from '../../types'
import { filtros } from './config'
import MapaBairro from './MapaBairro'
import OcorrenciaCard from './OcorrenciaCard'

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim()
}

export default function Mapa() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState<CategoriaOcorrencia | 'todas'>('todas')
  const [selecionada, setSelecionada] = useState<number | null>(null)
  const termo = normalizar(busca)
  const filtradas = ocorrencias.filter((ocorrencia) => (
    (categoria === 'todas' || ocorrencia.categoria === categoria)
    && normalizar(`${ocorrencia.bairro} ${ocorrencia.endereco} ${ocorrencia.titulo}`).includes(termo)
  ))
  const selecionadaVisivel = filtradas.some(({ id }) => id === selecionada) ? selecionada : null

  function selecionar(id: number) {
    setSelecionada((atual) => atual === id ? null : id)
  }

  return (
    <div className="flex flex-col md:h-[calc(100dvh-4rem-1px)] md:min-h-[560px] md:flex-row">
      <section className="flex w-full shrink-0 flex-col bg-white md:w-1/3 md:min-w-[320px]" aria-labelledby="titulo-mapa">
        <div className="px-4 pb-3 pt-6 sm:px-6">
          <h1 id="titulo-mapa" className="text-2xl font-semibold">{bairroMapa}</h1>
          <p className="mt-3 text-sm text-neutral-600" role="status">
            {filtradas.length} {filtradas.length === 1 ? 'ocorrência no bairro' : 'ocorrências no bairro'}
          </p>

          <div className="relative mt-4">
            <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" aria-hidden />
            <input
              type="search"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar rua ou bairro"
              aria-label="Buscar rua ou bairro"
              className="w-full rounded-lg border border-neutral-300 py-3 pl-9 pr-3 text-sm outline-offset-2 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-brand"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo de ocorrência">
            {filtros.map(({ valor, label, Icone }) => (
              <button
                key={valor}
                type="button"
                onClick={() => setCategoria(valor)}
                aria-pressed={categoria === valor}
                className={`inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand ${categoria === valor ? 'border-brand bg-brand-soft text-blue-700' : 'border-neutral-300 text-neutral-900 hover:bg-neutral-100'}`}
              >
                <Icone size={16} aria-hidden /> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto px-4 pb-6 sm:px-6 md:max-h-none md:flex-1">
          {filtradas.length > 0 ? (
            <ul className="flex flex-col gap-3" aria-label="Ocorrências do bairro">
              {filtradas.map((ocorrencia, indice) => (
                <Fragment key={ocorrencia.id}>
                  {indice === 2 && !termo && categoria === 'todas' && (
                    <li>
                      <aside aria-label="Espaço publicitário" className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-2.5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-neutral-600" aria-hidden><Image size={17} /></span>
                        <div>
                          <span className="rounded border border-neutral-400 px-1 text-[10px] text-neutral-700">Anúncio</span>
                          <p className="mt-1 text-xs font-medium">Espaço de anúncio servido pela rede de anúncios</p>
                        </div>
                      </aside>
                    </li>
                  )}
                  <li>
                    <OcorrenciaCard ocorrencia={ocorrencia} selecionada={selecionadaVisivel === ocorrencia.id} onSelecionar={selecionar} />
                  </li>
                </Fragment>
              ))}
            </ul>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm font-semibold">Nenhuma ocorrência encontrada</p>
              <p className="mt-2 text-sm text-neutral-600">Tente outra rua, bairro ou categoria.</p>
              <button type="button" onClick={() => { setBusca(''); setCategoria('todas') }} className="mt-4 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand">
                <X size={16} aria-hidden /> Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>
      <MapaBairro ocorrencias={filtradas} selecionada={selecionadaVisivel} onSelecionar={selecionar} />
    </div>
  )
}

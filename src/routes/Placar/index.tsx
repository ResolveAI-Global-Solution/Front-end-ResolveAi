import { useEffect, useState } from 'react'
import { ChartColumn, Clock, Info, LoaderCircle, MapPin, RefreshCw, Trophy } from 'lucide-react'
import type { CriterioPlacar, PlacarRegiao } from '../../types/placar'
import { buscarPlacar } from '../../services/placarService'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { montarPeriodos } from './periodos'
import PlacarLinha from './PlacarLinha'
import CriterioChip from './CriterioChip'
import EstadoMensagem from './EstadoMensagem'

const periodos = montarPeriodos(4)

/** Ordena pelo critério escolhido. No tempo, bairro sem nenhuma resolvida (null) vai para o fim. */
function ordenar(regioes: PlacarRegiao[], criterio: CriterioPlacar): PlacarRegiao[] {
  return [...regioes].sort((a, b) => {
    if (criterio === 'percentual') {
      return b.percentualResolvido - a.percentualResolvido
    }
    return (a.tempoMedioResolucaoDias ?? Infinity) - (b.tempoMedioResolucaoDias ?? Infinity)
  })
}

/** Bairro com mais ocorrências registradas no período (abertas + resolvidas). */
function bairroDestaque(regioes: PlacarRegiao[]): PlacarRegiao | null {
  let destaque: PlacarRegiao | null = null
  for (const regiao of regioes) {
    const total = regiao.abertas + regiao.resolvidas
    if (destaque === null || total > destaque.abertas + destaque.resolvidas) {
      destaque = regiao
    }
  }
  return destaque
}

export default function Placar() {
  useTituloPagina('Placar')

  const [indicePeriodo, setIndicePeriodo] = useState(0)
  const [criterio, setCriterio] = useState<CriterioPlacar>('percentual')
  const [regioes, setRegioes] = useState<PlacarRegiao[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativa, setTentativa] = useState(0)

  // Busca o placar sempre que o período muda ou quando o morador toca em "Tentar de novo".
  useEffect(() => {
    let ativo = true
    const { inicio, fim } = periodos[indicePeriodo]

    buscarPlacar(inicio, fim)
      .then((dados) => {
        if (ativo) setRegioes(dados)
      })
      .catch((e: Error) => {
        if (ativo) setErro(e.message)
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    // Se o período mudar antes da resposta chegar, a resposta antiga é ignorada.
    return () => {
      ativo = false
    }
  }, [indicePeriodo, tentativa])

  // Ao trocar o período ou tentar de novo, a tela já entra em "carregando" no próprio clique.
  function escolherPeriodo(indice: number) {
    setIndicePeriodo(indice)
    setCarregando(true)
    setErro(null)
  }

  function tentarDeNovo() {
    setTentativa((t) => t + 1)
    setCarregando(true)
    setErro(null)
  }

  const ordenadas = ordenar(regioes, criterio)
  const destaque = bairroDestaque(regioes)
  const temDados = !carregando && !erro && ordenadas.length > 0

  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">Placar da cidade</h1>
            <p className="mt-2 text-neutral-600 sm:text-lg">
              Como o poder público responde em cada bairro, com o que os moradores registram no ResolveAI.
            </p>
          </div>

          <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
            Período
            <select
              value={indicePeriodo}
              onChange={(e) => escolherPeriodo(Number(e.target.value))}
              className="min-h-12 rounded-lg border border-neutral-300 bg-white px-4 text-base font-semibold text-black lg:min-w-56"
            >
              {periodos.map((periodo, indice) => (
                <option key={periodo.rotulo} value={indice}>
                  {periodo.rotulo}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Ordenar o placar por">
          <CriterioChip
            texto="% resolvido"
            icone={ChartColumn}
            ativo={criterio === 'percentual'}
            aoClicar={() => setCriterio('percentual')}
          />
          <CriterioChip
            texto="Tempo médio de resposta"
            icone={Clock}
            ativo={criterio === 'tempo'}
            aoClicar={() => setCriterio('tempo')}
          />
        </div>

        {/* Celular: destaque, lista, explicação. Desktop: lista à esquerda; destaque e explicação à direita. */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-4">
          {temDados && destaque && (
            <div className="flex items-start gap-4 self-start rounded-2xl bg-brand p-5 text-white lg:col-start-2 lg:row-start-1">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                <Trophy size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-100">Bairro destaque do período</p>
                <p className="text-xl font-semibold">{destaque.regiao}</p>
                <p className="mt-1 text-sm">
                  {destaque.abertas + destaque.resolvidas} ocorrências registradas pelos moradores. O destaque não muda a
                  prioridade de nenhuma ocorrência.
                </p>
              </div>
            </div>
          )}

          <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
            {carregando && (
              <p className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-6 text-neutral-700" role="status">
                <LoaderCircle className="shrink-0 animate-spin text-brand" size={22} aria-hidden="true" />
                Carregando o placar. O primeiro acesso do dia pode levar até 1 minuto.
              </p>
            )}

            {!carregando && erro && (
              <EstadoMensagem
                icone={RefreshCw}
                titulo="Não deu para carregar o placar"
                texto={erro}
                acao="Tentar de novo"
                aoClicar={tentarDeNovo}
              />
            )}

            {!carregando && !erro && ordenadas.length === 0 && (
              <EstadoMensagem
                icone={MapPin}
                titulo="Sem dados neste período"
                texto="Ainda não há ocorrências suficientes para comparar os bairros. Escolha outro período."
                acao={indicePeriodo !== 0 ? 'Ver todo o período' : undefined}
                aoClicar={() => escolherPeriodo(0)}
              />
            )}

            {temDados && (
              <>
                <ol className="flex flex-col gap-2">
                  {ordenadas.map((regiao, indice) => (
                    <PlacarLinha key={`${regiao.municipio}-${regiao.regiao}`} posicao={indice + 1} item={regiao} />
                  ))}
                </ol>
                <p className="mt-3 text-xs text-neutral-500">
                  Fonte: {ordenadas[0].fonte} · atualizado em {ordenadas[0].atualizadoEm.split('-').reverse().join('/')}
                </p>
              </>
            )}
          </div>

          <aside className="self-start rounded-xl border border-neutral-200 bg-white p-4 lg:col-start-2 lg:row-start-2">
            <Info size={20} className="text-neutral-700" aria-hidden="true" />
            <p className="mt-2 font-semibold">Como ler o placar</p>
            <p className="mt-1 text-sm text-neutral-700">
              Para cada bairro: quanto das ocorrências já foi resolvido e quantos dias, em média, levou para resolver. Sem
              rótulos de "melhor" ou "pior": só fatos.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

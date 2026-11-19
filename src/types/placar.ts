/** Uma região do placar, no formato que a API Java devolve em GET /placar. */
export interface PlacarRegiao {
  regiao: string
  municipio: string
  abertas: number
  resolvidas: number
  percentualResolvido: number
  tempoMedioResolucaoDias: number | null
  fonte: string
  atualizadoEm: string
}

/** Por qual número a lista está ordenada (os botões no topo da página). */
export type CriterioPlacar = 'percentual' | 'tempo'

/** Uma opção do seletor de período. Sem datas = todo o período. */
export interface PeriodoPlacar {
  rotulo: string
  inicio?: string
  fim?: string
}

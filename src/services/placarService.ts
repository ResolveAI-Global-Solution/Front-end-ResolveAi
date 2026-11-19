import type { PlacarRegiao } from '../types/placar'
import { requisitar } from './api'

/** Busca o placar na API Java. inicio e fim no formato AAAA-MM-DD; sem eles, vem todo o período. */
export function buscarPlacar(inicio?: string, fim?: string): Promise<PlacarRegiao[]> {
  const filtros = new URLSearchParams()
  if (inicio) filtros.set('inicio', inicio)
  if (fim) filtros.set('fim', fim)

  return requisitar<PlacarRegiao[]>(`/placar?${filtros.toString()}`)
}

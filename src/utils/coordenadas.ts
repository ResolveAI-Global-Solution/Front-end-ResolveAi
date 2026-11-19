import type { Posicao } from './posicao'

// O mapa ilustrativo representa um retângulo de Vila Mariana em volta da Rua Vergueiro
// (cerca de 1 km de largura por 900 m de altura). Canto de cima à esquerda = NORTE/OESTE.
const NORTE = -23.5845
const SUL = -23.5925
const OESTE = -46.641
const LESTE = -46.631

// Ocorrência fora do retângulo aparece na borda, em vez de sumir do mapa
const limitar = (valor: number) => Math.min(98, Math.max(2, valor))

/** Latitude/longitude da API -> posição no mapa (0 a 100%). É uma regra de três. */
export function paraPosicao(latitude: number, longitude: number): Posicao {
  return {
    x: limitar(((longitude - OESTE) / (LESTE - OESTE)) * 100),
    y: limitar(((NORTE - latitude) / (NORTE - SUL)) * 100),
  }
}

/** Posição do pin no mapa -> latitude/longitude, com 6 casas como no banco (NUMBER(9,6)). */
export function paraCoordenadas({ x, y }: Posicao): { latitude: number; longitude: number } {
  return {
    latitude: Number((NORTE - (y / 100) * (NORTE - SUL)).toFixed(6)),
    longitude: Number((OESTE + (x / 100) * (LESTE - OESTE)).toFixed(6)),
  }
}

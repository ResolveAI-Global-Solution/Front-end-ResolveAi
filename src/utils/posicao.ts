export interface Posicao {
  x: number
  y: number
}

// Distância mínima entre dois pins, em % do mapa. O pin tem 44px; num mapa de celular
// (~375px de largura e ~400px de altura) isso dá cerca de 12% em cada eixo.
const DISTANCIA_MINIMA = 12
// Mesma margem usada no arraste do Registrar, para o pin não sair do mapa
const MIN = 4
const MAX = 96

const limitar = (valor: number) => Math.min(MAX, Math.max(MIN, valor))

export function sobrepoe(a: Posicao, b: Posicao) {
  return Math.abs(a.x - b.x) < DISTANCIA_MINIMA && Math.abs(a.y - b.y) < DISTANCIA_MINIMA
}

/**
 * Devolve a posição livre mais próxima da desejada, sem ficar em cima de nenhum pin ocupado.
 * Procura em anéis cada vez maiores ao redor do ponto. Se o mapa estiver cheio, devolve a desejada.
 */
export function posicaoLivre(desejada: Posicao, ocupadas: Posicao[]): Posicao {
  const livre = (p: Posicao) => !ocupadas.some((o) => sobrepoe(p, o))
  const inicio = { x: limitar(desejada.x), y: limitar(desejada.y) }
  if (livre(inicio)) return inicio

  const passo = DISTANCIA_MINIMA / 2
  for (let anel = 1; anel * passo <= MAX - MIN; anel++) {
    const candidatas: Posicao[] = []
    for (let i = -anel; i <= anel; i++) {
      for (let j = -anel; j <= anel; j++) {
        // Só a borda do anel: o miolo já foi testado nos anéis anteriores
        if (Math.abs(i) !== anel && Math.abs(j) !== anel) continue
        candidatas.push({ x: limitar(inicio.x + i * passo), y: limitar(inicio.y + j * passo) })
      }
    }
    // Dentro do anel, prefere a candidata mais perto da posição desejada
    candidatas.sort((a, b) => Math.hypot(a.x - inicio.x, a.y - inicio.y) - Math.hypot(b.x - inicio.x, b.y - inicio.y))
    const encontrada = candidatas.find(livre)
    if (encontrada) return encontrada
  }

  return inicio
}

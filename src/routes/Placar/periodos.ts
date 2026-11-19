import type { PeriodoPlacar } from '../../types/placar'

/** "Todo o período" + os últimos meses, cada um com o primeiro e o último dia. */
export function montarPeriodos(quantidadeMeses: number): PeriodoPlacar[] {
  const periodos: PeriodoPlacar[] = [{ rotulo: 'Todo o período' }]
  const hoje = new Date()

  for (let i = 0; i < quantidadeMeses; i++) {
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() - i + 1, 0)
    const nomeMes = primeiroDia.toLocaleDateString('pt-BR', { month: 'long' })

    periodos.push({
      rotulo: `${nomeMes.charAt(0).toUpperCase()}${nomeMes.slice(1)} ${primeiroDia.getFullYear()}`,
      inicio: paraTextoAPI(primeiroDia),
      fim: paraTextoAPI(ultimoDia),
    })
  }

  return periodos
}

/** Date -> "2026-11-01", usando a data local (toISOString usaria UTC e poderia pular um dia). */
function paraTextoAPI(data: Date): string {
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${data.getFullYear()}-${mes}-${dia}`
}

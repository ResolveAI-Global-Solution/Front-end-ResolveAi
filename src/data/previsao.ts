import type { CategoriaRegistro, PrevisaoPrazo } from '../types'

// Valores demonstrativos até a integração com o modelo de IA treinado com dados abertos do SP156.
export const previsoesPorCategoria: Record<CategoriaRegistro, PrevisaoPrazo> = {
  buraco: { dias: 14, risco: 'médio' },
  calcada: { dias: 21, risco: 'médio' },
  iluminacao: { dias: 7, risco: 'baixo' },
  poda: { dias: 30, risco: 'alto' },
  descarte: { dias: 5, risco: 'baixo' },
  esgoto: { dias: 18, risco: 'alto' },
  alagamento: { dias: 45, risco: 'alto' },
  pragas: { dias: 12, risco: 'médio' },
}

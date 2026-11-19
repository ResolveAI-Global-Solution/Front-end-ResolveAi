import type { PlacarRegiao } from '../types/placar'

const API_URL = import.meta.env.VITE_API_URL ?? 'https://resolveai-api-3tvg.onrender.com'

/** Busca o placar na API Java. inicio e fim no formato AAAA-MM-DD; sem eles, vem todo o período. */
export async function buscarPlacar(inicio?: string, fim?: string): Promise<PlacarRegiao[]> {
  const filtros = new URLSearchParams()
  if (inicio) filtros.set('inicio', inicio)
  if (fim) filtros.set('fim', fim)

  let resposta: Response
  try {
    resposta = await fetch(`${API_URL}/placar?${filtros.toString()}`)
  } catch {
    throw new Error('Sem conexão com o servidor. Confira sua internet e tente de novo.')
  }

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null)
    throw new Error(erro?.mensagem ?? 'Não conseguimos carregar o placar agora.')
  }

  return resposta.json()
}

import type { ErroRespostaApi } from '../types/api'

export const API_URL = import.meta.env.VITE_API_URL ?? 'https://resolveai-api-3tvg.onrender.com'

/** Erro que veio da API, com o status HTTP (400, 404, 409...) para quem precisar decidir algo. */
export class ErroApi extends Error {
  status: number

  constructor(status: number, mensagem: string) {
    super(mensagem)
    this.name = 'ErroApi'
    this.status = status
  }
}

/**
 * Único lugar que chama a API Java com fetch. Devolve o JSON da resposta ou lança um erro
 * com a mensagem em português que a própria API mandou.
 */
export async function requisitar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  let resposta: Response
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: opcoes.body ? { 'Content-Type': 'application/json' } : undefined,
    })
  } catch {
    throw new Error('Sem conexão com o servidor. Confira sua internet e tente de novo.')
  }

  // Lê como texto primeiro: respostas como o 204 não têm corpo
  const texto = await resposta.text()
  let corpo: unknown
  try {
    corpo = texto ? JSON.parse(texto) : undefined
  } catch {
    corpo = undefined
  }

  if (!resposta.ok) {
    const erro = corpo as ErroRespostaApi | undefined
    // No 400 de validação, a mensagem do campo é mais útil que a geral ("Confira os dados enviados.")
    const mensagem = erro?.campos?.[0]?.mensagem ?? erro?.mensagem ?? 'Não conseguimos falar com o servidor agora. Tente de novo.'
    throw new ErroApi(resposta.status, mensagem)
  }

  return corpo as T
}

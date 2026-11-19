import { useEffect } from 'react'

// Atualiza o título da aba do navegador: "Integrantes | ResolveAI"
export function useTituloPagina(titulo: string) {
  useEffect(() => {
    document.title = `${titulo} | ResolveAI`
  }, [titulo])
}

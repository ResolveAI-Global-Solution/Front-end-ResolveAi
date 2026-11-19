import { useEffect, useState } from 'react'
import { buscarOcorrencia, EVENTO_OCORRENCIAS_ATUALIZADAS } from '../services/ocorrenciaService'
import type { OcorrenciaMapa } from '../types'

type Estado = 'carregando' | 'pronto' | 'nao-encontrada' | 'erro'

// Carrega uma ocorrência pelo id e recarrega quando ela muda (nesta aba ou ao voltar para ela)
export default function useOcorrencia(id: number) {
  const [ocorrencia, setOcorrencia] = useState<OcorrenciaMapa | null>(null)
  const [estado, setEstado] = useState<Estado>('carregando')
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    let leitura = 0

    async function carregar() {
      if (!Number.isSafeInteger(id) || id <= 0) {
        setEstado('nao-encontrada')
        return
      }
      const atual = ++leitura
      try {
        const encontrada = await buscarOcorrencia(id)
        if (!ativo || atual !== leitura) return
        setOcorrencia(encontrada)
        setEstado(encontrada ? 'pronto' : 'nao-encontrada')
      } catch {
        if (ativo && atual === leitura) setEstado('erro')
      }
    }

    void carregar()
    window.addEventListener(EVENTO_OCORRENCIAS_ATUALIZADAS, carregar)
    window.addEventListener('focus', carregar)
    return () => {
      ativo = false
      window.removeEventListener(EVENTO_OCORRENCIAS_ATUALIZADAS, carregar)
      window.removeEventListener('focus', carregar)
    }
  }, [id, tentativa])

  function tentarNovamente() {
    setEstado('carregando')
    setTentativa((atual) => atual + 1)
  }

  return { ocorrencia, estado, tentarNovamente }
}

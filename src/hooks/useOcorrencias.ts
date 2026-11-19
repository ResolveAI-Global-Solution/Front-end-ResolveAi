import { useEffect, useState } from 'react'
import { EVENTO_OCORRENCIAS_ATUALIZADAS, listarOcorrencias } from '../services/ocorrenciaService'
import type { OcorrenciaMapa } from '../types'

export default function useOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState<OcorrenciaMapa[]>([])
  const [estado, setEstado] = useState<'carregando' | 'pronto' | 'erro'>('carregando')
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    let leitura = 0

    async function carregar() {
      const atual = ++leitura
      try {
        const dados = await listarOcorrencias()
        if (ativo && atual === leitura) {
          setOcorrencias(dados)
          setEstado('pronto')
        }
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
  }, [tentativa])

  function tentarNovamente() {
    setEstado('carregando')
    setTentativa((atual) => atual + 1)
  }

  return { ocorrencias, estado, tentarNovamente }
}

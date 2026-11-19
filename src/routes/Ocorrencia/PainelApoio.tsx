import { useState } from 'react'
import { CircleCheck, Eye, RotateCcw, Users } from 'lucide-react'
import {
  apoiarOcorrencia,
  confirmarResolucao,
  contestarResolucao,
  jaApoiou,
  marcarApoio,
} from '../../services/ocorrenciaService'
import type { OcorrenciaMapa } from '../../types'

type Acao = 'apoiar' | 'confirmar' | 'contestar'

const botaoBase = 'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
const primario = `${botaoBase} bg-brand text-white hover:bg-blue-700`
const secundario = `${botaoBase} border-[1.5px] border-brand bg-white text-blue-700 hover:bg-brand-soft`
const fantasma = `${botaoBase} hover:bg-neutral-100`

export default function PainelApoio({ ocorrencia }: { ocorrencia: OcorrenciaMapa }) {
  const [emAndamento, setEmAndamento] = useState<Acao | null>(null)
  const [erro, setErro] = useState('')
  const [apoiou, setApoiou] = useState(() => jaApoiou(ocorrencia.id))
  const aguardandoConfirmacao = !!ocorrencia.fotoDepois && ocorrencia.status !== 'resolvida'
  const resolvida = ocorrencia.status === 'resolvida'

  async function executar(acao: Acao) {
    if (emAndamento) return
    setErro('')
    setEmAndamento(acao)
    try {
      if (acao === 'apoiar') {
        await apoiarOcorrencia(ocorrencia.id)
        marcarApoio(ocorrencia.id)
        setApoiou(true)
      }
      if (acao === 'confirmar') await confirmarResolucao(ocorrencia.id)
      if (acao === 'contestar') await contestarResolucao(ocorrencia.id)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível concluir a ação. Tente novamente.')
    } finally {
      setEmAndamento(null)
    }
  }

  const botaoApoio = (classe: string) => (
    <button type="button" className={classe} disabled={apoiou || !!emAndamento} onClick={() => executar('apoiar')}>
      <Eye size={20} aria-hidden />
      {apoiou ? 'Você também viu' : emAndamento === 'apoiar' ? 'Registrando...' : 'Eu também vi'}
    </button>
  )

  return (
    <section aria-labelledby="titulo-apoio" className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 id="titulo-apoio" className="flex items-center gap-2 text-lg font-semibold">
        <Users size={24} className="text-blue-700" aria-hidden />
        {ocorrencia.apoios} {ocorrencia.apoios === 1 ? 'vizinho viu' : 'vizinhos viram'}
      </h2>

      {resolvida ? (
        <p className="text-neutral-700">Os vizinhos confirmaram que este problema foi resolvido.</p>
      ) : aguardandoConfirmacao ? (
        <>
          <p className="text-neutral-700">Um vizinho informou que foi resolvido. Você está perto: confirma?</p>
          <button type="button" className={primario} disabled={!!emAndamento} onClick={() => executar('confirmar')}>
            <CircleCheck size={20} aria-hidden />
            {emAndamento === 'confirmar' ? 'Confirmando...' : 'Confirmar que foi resolvido'}
          </button>
          <button type="button" className={secundario} disabled={!!emAndamento} onClick={() => executar('contestar')}>
            <RotateCcw size={20} aria-hidden />
            {emAndamento === 'contestar' ? 'Enviando...' : 'Contestar: ainda não resolveram'}
          </button>
          {botaoApoio(fantasma)}
        </>
      ) : (
        <>
          <p className="text-neutral-700">Você também viu este problema? Cada apoio dá mais força ao pedido.</p>
          {botaoApoio(primario)}
        </>
      )}

      {erro && <p role="alert" className="text-sm text-red-700">{erro}</p>}
    </section>
  )
}

import { useState } from 'react'
import { Eye, Users } from 'lucide-react'
import { USUARIO_DEMO } from '../../data/demo'
import { apoiarOcorrencia, jaApoiou, marcarApoio } from '../../services/ocorrenciaService'
import type { OcorrenciaMapa } from '../../types'

const primario = 'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

// Confirmar e contestar a resolução dependem da foto do depois, que a API ainda não guarda (evolução).
export default function PainelApoio({ ocorrencia }: { ocorrencia: OcorrenciaMapa }) {
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [apoiou, setApoiou] = useState(() => jaApoiou(ocorrencia.id))
  const resolvida = ocorrencia.status === 'resolvida'

  async function apoiar() {
    if (enviando) return
    setErro('')
    setEnviando(true)
    try {
      await apoiarOcorrencia(ocorrencia.id)
      marcarApoio(ocorrencia.id)
      setApoiou(true)
    } catch (e) {
      // Mostra a mensagem da API, ex.: "Só quem está a até 500 m do local pode apoiar."
      setErro(e instanceof Error ? e.message : 'Não foi possível registrar o apoio. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section aria-labelledby="titulo-apoio" className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 id="titulo-apoio" className="flex items-center gap-2 text-lg font-semibold">
        <Users size={24} className="text-blue-700" aria-hidden />
        {ocorrencia.apoios} {ocorrencia.apoios === 1 ? 'vizinho viu' : 'vizinhos viram'}
      </h2>

      {resolvida ? (
        <p className="text-neutral-700">Os vizinhos confirmaram que este problema foi resolvido.</p>
      ) : (
        <>
          <p className="text-neutral-700">Você também viu este problema? Cada apoio dá mais força ao pedido.</p>
          <button type="button" className={primario} disabled={apoiou || enviando} onClick={apoiar}>
            <Eye size={20} aria-hidden />
            {apoiou ? 'Você também viu' : enviando ? 'Registrando...' : 'Eu também vi'}
          </button>
          <p className="text-xs text-neutral-500">
            Modo demonstração: você apoia como {USUARIO_DEMO.nome}. Precisamos da sua localização, porque só quem está a até 500 m pode apoiar.
          </p>
        </>
      )}

      {erro && <p role="alert" className="text-sm text-red-700">{erro}</p>}
    </section>
  )
}

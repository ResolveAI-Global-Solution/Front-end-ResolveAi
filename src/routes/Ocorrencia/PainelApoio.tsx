import { useEffect, useState } from 'react'
import { Eye, Users } from 'lucide-react'
import FotoCampo from '../../components/ocorrencia/FotoCampo'
import FotoOcorrencia from '../../components/ocorrencia/FotoOcorrencia'
import { USUARIO_DEMO } from '../../data/demo'
import { buscarFoto, salvarFoto } from '../../services/fotosLocais'
import { apoiarOcorrencia, jaApoiou, marcarApoio } from '../../services/ocorrenciaService'
import type { OcorrenciaMapa } from '../../types'

const primario = 'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

// Confirmar e contestar a resolução dependem da foto do depois, que ainda não tem fluxo de envio (evolução).
export default function PainelApoio({ ocorrencia }: { ocorrencia: OcorrenciaMapa }) {
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [apoiou, setApoiou] = useState(() => jaApoiou(ocorrencia.id))
  // Foto opcional do apoio: não vai para a API, fica só neste navegador
  const [foto, setFoto] = useState<File | null>(null)
  const [erroFoto, setErroFoto] = useState('')
  const [fotoSalva, setFotoSalva] = useState<Blob>()
  const resolvida = ocorrencia.status === 'resolvida'

  // Quem já apoiou vê de novo a foto que tirou
  useEffect(() => {
    if (!apoiou || fotoSalva) return
    let ativo = true
    void buscarFoto('apoios', ocorrencia.id).then((salva) => {
      if (ativo && salva) setFotoSalva(salva)
    })
    return () => {
      ativo = false
    }
  }, [apoiou, fotoSalva, ocorrencia.id])

  async function apoiar() {
    if (enviando) return
    setErro('')
    setEnviando(true)
    try {
      await apoiarOcorrencia(ocorrencia.id)
      // A foto só é guardada depois que a API aceitou o apoio
      if (foto && (await salvarFoto('apoios', ocorrencia.id, foto))) setFotoSalva(foto)
      marcarApoio(ocorrencia.id)
      setApoiou(true)
      setFoto(null)
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
          {!apoiou && (
            <FotoCampo
              id="apoio-foto"
              titulo="Foto do que você viu (opcional)"
              ajuda="Fica salva só neste navegador."
              foto={foto}
              erro={erroFoto}
              desabilitado={enviando}
              onAlterar={(nova) => {
                setFoto(nova)
                setErroFoto('')
              }}
              onErro={setErroFoto}
            />
          )}
          <button type="button" className={primario} disabled={apoiou || enviando} onClick={apoiar}>
            <Eye size={20} aria-hidden />
            {apoiou ? 'Você também viu' : enviando ? 'Registrando...' : 'Eu também vi'}
          </button>
          <p className="text-xs text-neutral-500">
            Modo demonstração: você apoia como {USUARIO_DEMO.nome}. Precisamos da sua localização, porque só quem está a até 500 m pode apoiar.
          </p>
        </>
      )}

      {apoiou && fotoSalva && (
        <figure className="flex flex-col gap-2">
          <FotoOcorrencia foto={fotoSalva} alt={`Sua foto de apoio: ${ocorrencia.titulo}`} className="h-40 w-full rounded-lg object-cover" />
          <figcaption className="text-xs text-neutral-500">Sua foto. Fica só neste navegador.</figcaption>
        </figure>
      )}

      {erro && <p role="alert" className="text-sm text-red-700">{erro}</p>}
    </section>
  )
}

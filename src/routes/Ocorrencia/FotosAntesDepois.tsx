import { useRef, useState } from 'react'
import { Camera, Image, LoaderCircle } from 'lucide-react'
import FotoOcorrencia from '../../components/ocorrencia/FotoOcorrencia'
import { TIPOS_FOTO } from '../../data/registro'
import { enviarFotoDepois } from '../../services/ocorrenciaService'
import type { OcorrenciaMapa } from '../../types'

const quadro = 'relative flex h-56 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-neutral-200 sm:h-80'
const legenda = 'absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-700 shadow-sm'

export default function FotosAntesDepois({ ocorrencia }: { ocorrencia: OcorrenciaMapa }) {
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const arquivoRef = useRef<HTMLInputElement>(null)
  // Dá para enviar o depois enquanto a ocorrência não foi resolvida e ninguém enviou ainda
  const podeEnviar = ocorrencia.status !== 'resolvida' && !ocorrencia.fotoDepois

  async function enviar(arquivo?: File) {
    if (!arquivo || enviando) return
    setErro('')
    setEnviando(true)
    try {
      await enviarFotoDepois(ocorrencia.id, arquivo)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível enviar a foto.')
    } finally {
      setEnviando(false)
      if (arquivoRef.current) arquivoRef.current.value = ''
    }
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <figure className={quadro}>
          {ocorrencia.foto ? (
            <FotoOcorrencia foto={ocorrencia.foto} alt={`Foto de antes: ${ocorrencia.titulo}`} className="h-full w-full object-cover" />
          ) : (
            <>
              <Image size={36} className="text-neutral-600" aria-hidden />
              <span className="text-sm text-neutral-600">Sem foto no registro</span>
            </>
          )}
          <figcaption className={legenda}>Antes</figcaption>
        </figure>

        <figure className={quadro}>
          {ocorrencia.fotoDepois ? (
            <FotoOcorrencia foto={ocorrencia.fotoDepois} alt={`Foto de depois: ${ocorrencia.titulo}`} className="h-full w-full object-cover" />
          ) : podeEnviar ? (
            <>
              <input
                ref={arquivoRef}
                id="foto-depois"
                type="file"
                accept={TIPOS_FOTO.join(',')}
                capture="environment"
                className="sr-only"
                disabled={enviando}
                onChange={(event) => enviar(event.target.files?.[0])}
              />
              <label
                htmlFor="foto-depois"
                className={`inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-brand-soft ${enviando ? 'cursor-wait opacity-60' : 'cursor-pointer'}`}
              >
                {enviando ? <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden /> : <Camera size={18} aria-hidden />}
                {enviando ? 'Enviando...' : 'Enviar foto do depois'}
              </label>
              <span className="px-6 text-center text-xs text-neutral-600">Resolveram? Tire a foto no mesmo local.</span>
            </>
          ) : (
            <>
              <Image size={36} className="text-neutral-600" aria-hidden />
              <span className="text-sm text-neutral-600">Sem foto do depois</span>
            </>
          )}
          <figcaption className={legenda}>Depois</figcaption>
        </figure>
      </div>
      {erro && <p role="alert" className="mt-2 text-sm text-red-700">{erro}</p>}
    </div>
  )
}

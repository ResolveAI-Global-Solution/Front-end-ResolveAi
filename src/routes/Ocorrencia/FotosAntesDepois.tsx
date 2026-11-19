import { Image } from 'lucide-react'
import FotoOcorrencia from '../../components/ocorrencia/FotoOcorrencia'
import type { OcorrenciaMapa } from '../../types'

const quadro = 'relative flex h-56 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-neutral-200 sm:h-80'
const legenda = 'absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-700 shadow-sm'

// A foto de antes é a do registro, salva só no navegador de quem registrou. Ainda não há envio da de depois.
export default function FotosAntesDepois({ ocorrencia }: { ocorrencia: OcorrenciaMapa }) {
  const fotos = [
    { rotulo: 'Antes', foto: ocorrencia.foto, vazio: 'Sem foto no registro' },
    { rotulo: 'Depois', foto: ocorrencia.fotoDepois, vazio: 'Sem foto do depois' },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fotos.map(({ rotulo, foto, vazio }) => (
        <figure key={rotulo} className={quadro}>
          {foto ? (
            <FotoOcorrencia foto={foto} alt={`Foto de ${rotulo.toLowerCase()}: ${ocorrencia.titulo}`} className="h-full w-full object-cover" />
          ) : (
            <>
              <Image size={36} className="text-neutral-600" aria-hidden />
              <span className="px-6 text-center text-sm text-neutral-600">{vazio}</span>
            </>
          )}
          <figcaption className={legenda}>{rotulo}</figcaption>
        </figure>
      ))}
    </div>
  )
}

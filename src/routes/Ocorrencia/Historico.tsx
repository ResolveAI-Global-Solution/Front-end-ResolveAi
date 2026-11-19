import { Image } from 'lucide-react'
import FotoOcorrencia from '../../components/ocorrencia/FotoOcorrencia'
import StatusBadge from '../../components/ocorrencia/StatusBadge'
import type { EventoHistorico, OcorrenciaMapa } from '../../types'

interface HistoricoProps {
  eventos: EventoHistorico[]
  ocorrencia: OcorrenciaMapa
}

// "20/11 · 10:30", no fuso de São Paulo
function formatarData(iso: string) {
  const data = new Date(iso)
  if (Number.isNaN(data.getTime())) return ''
  const opcoes = { timeZone: 'America/Sao_Paulo' } as const
  const dia = data.toLocaleDateString('pt-BR', { ...opcoes, day: '2-digit', month: '2-digit' })
  const hora = data.toLocaleTimeString('pt-BR', { ...opcoes, hour: '2-digit', minute: '2-digit' })
  return `${dia} · ${hora}`
}

function Miniatura({ foto, rotulo }: { foto?: Blob; rotulo: string }) {
  return (
    <figure className="relative flex h-[90px] w-[120px] flex-col items-center justify-center gap-1 overflow-hidden rounded-lg bg-neutral-100 text-xs font-medium text-neutral-700">
      {foto ? (
        <>
          <FotoOcorrencia foto={foto} alt={`Foto de ${rotulo.toLowerCase()}`} className="h-full w-full object-cover" />
          <figcaption className="absolute bottom-1 left-1 rounded bg-white/90 px-1.5">{rotulo}</figcaption>
        </>
      ) : (
        <>
          <Image size={20} aria-hidden />
          <figcaption>{rotulo}</figcaption>
        </>
      )}
    </figure>
  )
}

export default function Historico({ eventos, ocorrencia }: HistoricoProps) {
  return (
    <section aria-labelledby="titulo-historico" className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 id="titulo-historico" className="text-[22px] font-semibold">Histórico</h2>
      <ol className="mt-4">
        {eventos.map((evento, indice) => {
          const ultimo = indice === eventos.length - 1
          return (
            <li key={`${evento.data ?? ''}-${indice}`} className="flex gap-3">
              <div className="flex flex-col items-center" aria-hidden>
                <span className="mt-1.5 size-3 shrink-0 rounded-full bg-brand" />
                {!ultimo && <span className="w-0.5 flex-1 bg-neutral-200" />}
              </div>
              <div className={`flex min-w-0 flex-1 flex-col gap-1.5 ${ultimo ? '' : 'pb-5'}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={evento.status} />
                  {evento.data && <time dateTime={evento.data} className="text-xs font-medium text-neutral-500">{formatarData(evento.data)}</time>}
                </div>
                <p className="text-sm">{evento.texto}</p>
                {evento.comFotos && (
                  <div className="flex gap-2">
                    <Miniatura foto={ocorrencia.foto} rotulo="Antes" />
                    {/* Se a resolução foi contestada, a foto do depois foi descartada */}
                    <Miniatura foto={ocorrencia.fotoDepois} rotulo="Depois" />
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

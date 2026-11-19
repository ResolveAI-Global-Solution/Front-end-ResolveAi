import { Link } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import type { OcorrenciaMapa, StatusOcorrencia } from '../../types'
import { statusOcorrencia } from './config'
import StatusBadge from './StatusBadge'
import FotoOcorrencia from './FotoOcorrencia'

interface MapaBairroProps {
  ocorrencias: OcorrenciaMapa[]
  selecionada: number | null
  onSelecionar: (id: number) => void
}

export default function MapaBairro({ ocorrencias, selecionada, onSelecionar }: MapaBairroProps) {
  const ocorrenciaSelecionada = ocorrencias.find(({ id }) => id === selecionada)

  return (
    <section className="relative min-h-[400px] flex-1 overflow-hidden bg-[#e8edf3] md:min-h-0" aria-label="Mapa ilustrativo de ocorrências do bairro">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[4.3%] top-[7.4%] h-[14.4%] w-[16.6%] rounded-2xl bg-[#d4eed8]" />
        <div className="absolute inset-y-0 left-[23%] w-[2.4%] bg-white" />
        <div className="absolute inset-y-0 left-[64.7%] w-[2.6%] bg-white" />
        <div className="absolute inset-x-0 top-[28.8%] h-[3%] bg-white" />
        <div className="absolute inset-x-0 top-[67%] h-[2.6%] bg-white" />
        <div className="absolute -top-[10%] left-[51.5%] h-[125%] w-[1.5%] -rotate-[10deg] bg-white" />
        <div className="absolute -left-[5%] top-[62%] h-[1.6%] w-[115%] rotate-[12deg] bg-white" />
        <span className="absolute left-[51%] top-[49%] h-4 w-4 rounded-full border-[3px] border-white bg-brand" />
      </div>

      {ocorrencias.map((ocorrencia) => {
        const { Icone, pin, label } = statusOcorrencia[ocorrencia.status]
        const ativa = selecionada === ocorrencia.id

        return (
          <button
            key={ocorrencia.id}
            type="button"
            onClick={() => onSelecionar(ocorrencia.id)}
            aria-label={`${ocorrencia.titulo} — ${label}`}
            aria-pressed={ativa}
            className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand ${ativa ? 'z-20 ring-2 ring-brand ring-offset-2' : 'z-10'}`}
            style={{ left: `${ocorrencia.posicao.x}%`, top: `${ocorrencia.posicao.y}%` }}
          >
            <span className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white shadow-md after:absolute after:-bottom-1 after:left-1/2 after:-z-10 after:h-3 after:w-3 after:-translate-x-1/2 after:rotate-45 after:bg-inherit ${pin}`}>
              <Icone size={18} aria-hidden />
            </span>
          </button>
        )
      })}

      {ocorrenciaSelecionada && (
        <div className="absolute inset-x-4 top-4 z-30 mx-auto max-h-[calc(100%-8rem)] max-w-sm overflow-y-auto rounded-xl bg-white p-3 shadow-md md:inset-x-6" role="status">
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 break-words text-sm font-semibold">{ocorrenciaSelecionada.titulo}</p>
            <button type="button" aria-label="Fechar detalhes da ocorrência" onClick={() => onSelecionar(ocorrenciaSelecionada.id)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-brand"><X size={16} aria-hidden /></button>
          </div>
          {ocorrenciaSelecionada.foto && <FotoOcorrencia foto={ocorrenciaSelecionada.foto} alt="Foto da ocorrência selecionada" className="mt-2 h-28 w-full rounded-lg object-cover" />}
          {ocorrenciaSelecionada.descricao && ocorrenciaSelecionada.descricao !== ocorrenciaSelecionada.titulo && <p className="mt-2 break-words text-xs leading-relaxed text-neutral-700">{ocorrenciaSelecionada.descricao}</p>}
          <p className="mt-2 break-words text-xs text-neutral-600">{ocorrenciaSelecionada.endereco} · {ocorrenciaSelecionada.bairro}</p>
          <Link to={`/ocorrencias/${ocorrenciaSelecionada.id}`} className="mt-2 inline-block rounded text-xs font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand">
            Ver detalhes da ocorrência
          </Link>
        </div>
      )}

      <Link to="/registrar" className="absolute bottom-24 right-4 z-10 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:right-7 xl:bottom-7">
        <Plus size={18} aria-hidden /> Registrar ocorrência
      </Link>

      <ul aria-label="Legenda dos status" className="absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-2 rounded-xl bg-white p-2 shadow-sm md:bottom-5 md:left-7">
        {(Object.keys(statusOcorrencia) as StatusOcorrencia[]).map((status) => (
          <li key={status}><StatusBadge status={status} /></li>
        ))}
      </ul>
    </section>
  )
}

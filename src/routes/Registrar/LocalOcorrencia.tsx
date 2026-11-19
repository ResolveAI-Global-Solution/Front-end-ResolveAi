import { useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { CircleDot } from 'lucide-react'
import type { RegistroOcorrenciaErros, RegistroOcorrenciaForm } from '../../types'

interface LocalOcorrenciaProps {
  dados: RegistroOcorrenciaForm
  erros: RegistroOcorrenciaErros
  desabilitado: boolean
  onEndereco: (valor: string) => void
  onBairro: (valor: string) => void
  onPosicao: (valor: { x: number; y: number }) => void
}

const campo = 'mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-wait disabled:bg-neutral-100'
const limitar = (valor: number) => Math.min(96, Math.max(4, valor))

export default function LocalOcorrencia({ dados, erros, desabilitado, onEndereco, onBairro, onPosicao }: LocalOcorrenciaProps) {
  const [editando, setEditando] = useState(false)
  const mapaRef = useRef<HTMLDivElement>(null)
  const deslocamentoRef = useRef({ x: 0, y: 0 })
  const mostrarEdicao = editando || !!erros.endereco || !!erros.bairro

  function iniciarArraste(event: PointerEvent<HTMLButtonElement>) {
    if (desabilitado || event.button !== 0) return
    event.preventDefault()
    const mapa = mapaRef.current?.getBoundingClientRect()
    if (!mapa) return
    deslocamentoRef.current = {
      x: event.clientX - mapa.left - mapa.width * dados.posicao.x / 100,
      y: event.clientY - mapa.top - mapa.height * dados.posicao.y / 100,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.focus()
  }

  function arrastar(event: PointerEvent<HTMLButtonElement>) {
    if (desabilitado || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    const mapa = mapaRef.current?.getBoundingClientRect()
    if (!mapa) return
    onPosicao({
      x: limitar((event.clientX - mapa.left - deslocamentoRef.current.x) / mapa.width * 100),
      y: limitar((event.clientY - mapa.top - deslocamentoRef.current.y) / mapa.height * 100),
    })
  }

  function encerrarArraste(event: PointerEvent<HTMLButtonElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function moverComTeclado(event: KeyboardEvent<HTMLButtonElement>) {
    if (desabilitado) return
    let { x, y } = dados.posicao
    switch (event.key) {
      case 'ArrowLeft': x -= 2; break
      case 'ArrowRight': x += 2; break
      case 'ArrowUp': y -= 2; break
      case 'ArrowDown': y += 2; break
      default: return
    }
    event.preventDefault()
    onPosicao({ x: limitar(x), y: limitar(y) })
  }

  return (
    <aside className="grid min-w-0 gap-4" aria-label="Local da ocorrência e orientações">
      <div ref={mapaRef} className="relative h-52 overflow-hidden rounded-2xl bg-[#e8edf3] lg:h-[260px]" aria-label="Mapa ilustrativo do local da ocorrência">
        <div className="pointer-events-none absolute inset-y-0 left-[42.5%] w-4 bg-white" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-[42.5%] h-[18px] bg-white" aria-hidden />
        <button
          type="button"
          name="posicao"
          disabled={desabilitado}
          aria-label="Posição da ocorrência. Arraste ou use as setas para ajustar o local no mapa ilustrativo."
          aria-describedby={`registro-local-ajuda${erros.posicao ? ' erro-registro-posicao' : ''}`}
          aria-invalid={!!erros.posicao}
          title="Arraste para ajustar o local"
          className="absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 touch-none cursor-grab items-center justify-center rounded-full text-white outline-offset-2 active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-wait"
          style={{ left: `${dados.posicao.x}%`, top: `${dados.posicao.y}%` }}
          onPointerDown={iniciarArraste}
          onPointerMove={arrastar}
          onPointerUp={encerrarArraste}
          onPointerCancel={encerrarArraste}
          onKeyDown={moverComTeclado}
        >
          <span className="absolute bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-amber-800" aria-hidden />
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-amber-800 shadow-md">
            <CircleDot size={18} aria-hidden />
          </span>
        </button>
      </div>
      {erros.posicao && <p id="erro-registro-posicao" className="text-xs text-red-700">{erros.posicao}</p>}

      <div className="rounded-xl bg-brand-soft">
        <button
          type="button"
          disabled={desabilitado}
          aria-label="Editar endereço da ocorrência"
          aria-expanded={mostrarEdicao}
          aria-controls="registro-edicao-local"
          onClick={() => setEditando((atual) => !atual)}
          className="w-full rounded-xl p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait"
        >
          <span className="block text-sm font-semibold">{dados.endereco || 'Informe o endereço'} · {dados.bairro || 'Informe o bairro'}</span>
          <span id="registro-local-ajuda" className="mt-1 block text-xs leading-relaxed text-blue-700">Mapa ilustrativo · arraste o pin para ajustar</span>
        </button>

        {mostrarEdicao && (
          <div id="registro-edicao-local" className="space-y-3 px-4 pb-4">
            <div>
              <label htmlFor="registro-endereco" className="text-xs font-semibold">Rua e número</label>
              <input
                id="registro-endereco"
                name="endereco"
                type="text"
                autoComplete="street-address"
                required
                maxLength={160}
                disabled={desabilitado}
                value={dados.endereco}
                onChange={(event) => onEndereco(event.target.value)}
                aria-invalid={!!erros.endereco}
                aria-describedby={erros.endereco ? 'erro-registro-endereco' : undefined}
                className={`${campo} ${erros.endereco ? 'border-red-600' : 'border-neutral-300'}`}
              />
              {erros.endereco && <p id="erro-registro-endereco" className="mt-1.5 text-xs text-red-700">{erros.endereco}</p>}
            </div>
            <div>
              <label htmlFor="registro-bairro" className="text-xs font-semibold">Bairro</label>
              <input
                id="registro-bairro"
                name="bairro"
                type="text"
                required
                maxLength={80}
                disabled={desabilitado}
                value={dados.bairro}
                onChange={(event) => onBairro(event.target.value)}
                aria-invalid={!!erros.bairro}
                aria-describedby={erros.bairro ? 'erro-registro-bairro' : undefined}
                className={`${campo} ${erros.bairro ? 'border-red-600' : 'border-neutral-300'}`}
              />
              {erros.bairro && <p id="erro-registro-bairro" className="mt-1.5 text-xs text-red-700">{erros.bairro}</p>}
            </div>
            <button type="button" disabled={desabilitado} onClick={() => setEditando(false)} className="min-h-10 rounded-lg border border-brand bg-white px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait">Concluir edição</button>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-4">
        <h2 className="text-base font-semibold">Antes de publicar</h2>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-600">
          <li>Seu nome não aparece em público.</li>
          <li>Se já existir um pedido igual a até 30 m, vamos sugerir apoiar o existente.</li>
          <li>A foto precisa ser tirada a até 30 m do problema.</li>
        </ul>
      </div>
    </aside>
  )
}

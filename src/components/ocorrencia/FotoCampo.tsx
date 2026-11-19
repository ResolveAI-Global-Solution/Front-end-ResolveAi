import { useEffect, useRef, useState } from 'react'
import { Camera, Image, X } from 'lucide-react'
import { TIPOS_FOTO } from '../../data/registro'
import { validarFoto } from '../../services/validarOcorrencia'

interface FotoCampoProps {
  /** id do input; também prefixa os ids da ajuda e do erro */
  id: string
  titulo: string
  ajuda: string
  foto: File | null
  erro?: string
  desabilitado?: boolean
  onAlterar: (foto: File | null) => void
  onErro: (mensagem: string) => void
}

/** Campo de foto opcional, com prévia. A foto fica só no navegador (veja services/fotosLocais). */
export default function FotoCampo({ id, titulo, ajuda, foto, erro, desabilitado, onAlterar, onErro }: FotoCampoProps) {
  const [previa, setPrevia] = useState('')
  const [horario, setHorario] = useState('')
  const arquivoRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (previa) return () => URL.revokeObjectURL(previa)
  }, [previa])

  function selecionar(arquivo?: File) {
    if (!arquivo) return
    const mensagem = validarFoto(arquivo)
    if (mensagem) {
      onErro(mensagem)
      return
    }
    setPrevia(URL.createObjectURL(arquivo))
    setHorario(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }))
    onAlterar(arquivo)
  }

  function remover() {
    setPrevia('')
    setHorario('')
    onAlterar(null)
  }

  return (
    <div>
      <input
        ref={arquivoRef}
        id={id}
        name="foto"
        type="file"
        accept={TIPOS_FOTO.join(',')}
        capture="environment"
        disabled={desabilitado}
        aria-label={titulo}
        aria-invalid={!!erro}
        aria-describedby={`${id}-ajuda${erro ? ` ${id}-erro` : ''}`}
        className="peer sr-only"
        onChange={(event) => {
          selecionar(event.target.files?.[0])
          event.target.value = ''
        }}
      />
      <div className={`flex flex-wrap items-center gap-4 rounded-xl border bg-[#f7f7f9] p-4 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand sm:flex-nowrap ${erro ? 'border-red-600' : 'border-neutral-300'}`}>
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-200 text-neutral-500">
          {foto && previa ? (
            <>
              <img
                src={previa}
                alt="Prévia da foto selecionada para a ocorrência"
                className="h-full w-full object-cover"
                onError={() => { remover(); onErro('Não foi possível abrir a foto. Selecione outra imagem.') }}
              />
              <button type="button" onClick={remover} aria-label="Remover foto" className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-800 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-brand">
                <X size={15} aria-hidden />
              </button>
            </>
          ) : <Image size={26} aria-hidden />}
        </div>
        <div className="min-w-0 flex-1 basis-40 sm:basis-auto">
          <p className="text-sm font-semibold">{foto ? `Foto adicionada às ${horario}` : titulo}</p>
          <p id={`${id}-ajuda`} className="mt-1 text-sm leading-5 text-neutral-500">{ajuda}</p>
        </div>
        <button type="button" disabled={desabilitado} onClick={() => arquivoRef.current?.click()} className="disabled:cursor-wait disabled:opacity-60 inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-lg border border-brand bg-white px-5 py-3 text-sm font-medium text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          <Camera size={18} aria-hidden /> {foto ? 'Tirar outra' : 'Tirar foto'}
        </button>
      </div>
      {erro && <p id={`${id}-erro`} className="mt-2 text-sm text-red-700">{erro}</p>}
    </div>
  )
}

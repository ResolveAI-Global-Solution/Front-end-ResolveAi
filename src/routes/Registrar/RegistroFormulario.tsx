import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Bug, CircleCheck, Construction, Droplet, Grid2X2, Lightbulb, LoaderCircle, Shield, Trash2, TreePine, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoriasRegistro, limitesRegistro } from '../../data/registro'
import { registrarOcorrencia } from '../../services/ocorrenciaService'
import { validarOcorrencia } from '../../services/validarOcorrencia'
import type { CategoriaRegistro, RegistroOcorrenciaErros, RegistroOcorrenciaForm } from '../../types'
import FotoCampo from './FotoCampo'
import LocalOcorrencia from './LocalOcorrencia'

type Estado = 'ocioso' | 'enviando' | 'sucesso' | 'erro'

const inicial: RegistroOcorrenciaForm = {
  categoria: 'calcada',
  descricao: '',
  endereco: 'Rua Vergueiro, 1200',
  bairro: 'Vila Mariana',
  foto: null,
  posicao: { x: 50, y: 34 },
}

const iconesCategoria = {
  buraco: Construction,
  calcada: Grid2X2,
  iluminacao: Lightbulb,
  poda: TreePine,
  descarte: Trash2,
  esgoto: Droplet,
  alagamento: Waves,
  pragas: Bug,
} satisfies Record<CategoriaRegistro, typeof Construction>

export default function RegistroFormulario() {
  const [dados, setDados] = useState<RegistroOcorrenciaForm>(inicial)
  const [erros, setErros] = useState<RegistroOcorrenciaErros>({})
  const [estado, setEstado] = useState<Estado>('ocioso')
  const enviandoRef = useRef(false)
  const sucessoRef = useRef<HTMLHeadingElement>(null)
  const enviando = estado === 'enviando'

  useEffect(() => {
    if (estado === 'sucesso') sucessoRef.current?.focus()
  }, [estado])

  function atualizar<K extends keyof RegistroOcorrenciaForm>(campo: K, valor: RegistroOcorrenciaForm[K]) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
    setErros((atual) => ({ ...atual, [campo]: undefined }))
    if (estado === 'erro') setEstado('ocioso')
  }

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (enviandoRef.current) return
    const form = event.currentTarget
    const encontrados = validarOcorrencia(dados)
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) {
      const primeiroCampo = Object.keys(encontrados)[0]
      setTimeout(() => form.querySelector<HTMLElement>(`[name="${primeiroCampo}"]`)?.focus(), 0)
      return
    }
    enviandoRef.current = true
    setEstado('enviando')
    try {
      await registrarOcorrencia({
        ...dados,
        descricao: dados.descricao.trim(),
        endereco: dados.endereco.trim(),
        bairro: dados.bairro.trim(),
      })
      setDados(inicial)
      setEstado('sucesso')
    } catch {
      setEstado('erro')
    } finally {
      enviandoRef.current = false
    }
  }

  return (
    <form onSubmit={enviar} noValidate aria-label="Registrar ocorrência" aria-busy={enviando} className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
      <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8">
        {estado === 'sucesso' ? (
          <div role="status">
            <CircleCheck size={36} className="text-green-700" aria-hidden />
            <h2 ref={sucessoRef} tabIndex={-1} className="mt-4 text-xl font-semibold outline-none">Registro de demonstração concluído</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">Os dados foram validados. Nesta versão, a ocorrência ainda não é salva nem publicada no mapa.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => { setErros({}); setEstado('ocioso') }} className="min-h-11 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Registrar outra ocorrência</button>
              <Link to="/mapa" className="inline-flex min-h-11 items-center rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-brand">Voltar ao mapa</Link>
            </div>
          </div>
        ) : (
          <>
            <fieldset disabled={enviando} className="min-w-0">
              <legend className="text-lg font-semibold">1. Qual é o problema?</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {categoriasRegistro.map(({ valor, label }) => {
                  const Icone = iconesCategoria[valor]
                  return (
                    <label key={valor} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="categoria"
                        value={valor}
                        checked={dados.categoria === valor}
                        onChange={() => atualizar('categoria', valor)}
                        required
                        aria-invalid={!!erros.categoria}
                        aria-describedby={erros.categoria ? 'erro-registro-categoria' : undefined}
                        className="peer sr-only"
                      />
                      <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-300 px-3.5 py-2 text-sm font-medium peer-checked:border-brand peer-checked:bg-brand-soft peer-checked:text-blue-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand peer-disabled:cursor-wait hover:bg-neutral-50">
                        <Icone size={18} aria-hidden /> {label}
                      </span>
                    </label>
                  )
                })}
              </div>
              {erros.categoria && <p id="erro-registro-categoria" className="mt-2 text-sm text-red-700">{erros.categoria}</p>}
            </fieldset>

            <p className="mt-6 flex items-center gap-2 text-sm text-red-600">
              <Shield size={16} className="shrink-0" aria-hidden />
              <span>É crime ou emergência? Ligue <a href="tel:190" className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-red-600">190</a>.</span>
            </p>

            <fieldset disabled={enviando} className="mt-6 min-w-0">
              <legend className="text-lg font-semibold">2. Foto no local</legend>
              <div className="mt-5">
                <FotoCampo foto={dados.foto} erro={erros.foto} onAlterar={(foto) => atualizar('foto', foto)} onErro={(mensagem) => setErros((atual) => ({ ...atual, foto: mensagem }))} />
              </div>
            </fieldset>

            <fieldset disabled={enviando} className="mt-6 min-w-0">
              <legend className="text-lg font-semibold">3. Conte o que você viu</legend>
              <label htmlFor="registro-descricao" className="mt-5 block text-sm font-medium">Descrição</label>
              <textarea
                id="registro-descricao"
                name="descricao"
                required
                rows={3}
                maxLength={limitesRegistro.descricao.max}
                value={dados.descricao}
                onChange={(event) => atualizar('descricao', event.target.value)}
                placeholder="Calçada quebrada em frente à escola, com buraco no meio."
                aria-invalid={!!erros.descricao}
                aria-describedby={`registro-descricao-ajuda${erros.descricao ? ' erro-registro-descricao' : ''}`}
                className={`mt-2 block h-28 w-full resize-y rounded-lg border bg-white px-3 py-3 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand/30 ${erros.descricao ? 'border-red-600' : 'border-neutral-300'}`}
              />
              <p id="registro-descricao-ajuda" className="mt-2 text-sm text-neutral-500">Até 280 caracteres.</p>
              {erros.descricao && <p id="erro-registro-descricao" className="mt-1 text-sm text-red-700">{erros.descricao}</p>}
            </fieldset>

            {estado === 'erro' && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-3 text-sm text-red-700">Não foi possível concluir o registro. Seus dados foram mantidos. Tente novamente.</p>}

            <div className="mt-6 flex flex-wrap items-center justify-end gap-4">
              <Link to="/mapa" className="inline-flex min-h-12 items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-brand">Cancelar</Link>
              <button type="submit" disabled={enviando} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                {enviando && <LoaderCircle size={16} className="animate-spin motion-reduce:animate-none" aria-hidden />}
                {enviando ? 'Publicando...' : 'Publicar ocorrência'}
              </button>
            </div>
          </>
        )}
      </div>
      <LocalOcorrencia
        dados={dados}
        erros={erros}
        desabilitado={enviando || estado === 'sucesso'}
        onEndereco={(valor) => atualizar('endereco', valor)}
        onBairro={(valor) => atualizar('bairro', valor)}
        onPosicao={(valor) => atualizar('posicao', valor)}
      />
    </form>
  )
}

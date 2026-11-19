import { useState } from 'react'
import type { FormEvent } from 'react'
import { ChevronDown, Send } from 'lucide-react'
import { assuntos } from '../../data/contato'
import { enviarContato } from '../../services/contatoService'
import type { ContatoErros, ContatoForm } from '../../types'

type Estado = 'ocioso' | 'enviando' | 'sucesso' | 'erro'

const vazio: ContatoForm = { nome: '', email: '', assunto: '', mensagem: '' }

const base =
  'w-full rounded-lg border bg-white px-3 py-2.5 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand/30'

function validar(d: ContatoForm): ContatoErros {
  const erros: ContatoErros = {}
  if (d.nome.trim().length < 2) erros.nome = 'Informe seu nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) erros.email = 'Informe um e-mail válido.'
  if (!d.assunto) erros.assunto = 'Selecione um assunto.'
  if (d.mensagem.trim().length < 10) erros.mensagem = 'Escreva pelo menos 10 caracteres.'
  return erros
}

export default function ContatoFormulario() {
  const [dados, setDados] = useState<ContatoForm>(vazio)
  const [erros, setErros] = useState<ContatoErros>({})
  const [estado, setEstado] = useState<Estado>('ocioso')

  function atualizar(campo: keyof ContatoForm, valor: string) {
    setDados((d) => ({ ...d, [campo]: valor }))
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: undefined }))
    if (estado === 'sucesso' || estado === 'erro') setEstado('ocioso')
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const encontrados = validar(dados)
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return

    setEstado('enviando')
    try {
      await enviarContato(dados)
      setDados(vazio)
      setEstado('sucesso')
    } catch {
      setEstado('erro')
    }
  }

  const borda = (campo: keyof ContatoForm) => (erros[campo] ? 'border-red-600' : 'border-neutral-300')

  return (
    <form onSubmit={enviar} noValidate className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="text-xs font-semibold">Nome</label>
          <input
            id="nome"
            type="text"
            value={dados.nome}
            onChange={(e) => atualizar('nome', e.target.value)}
            placeholder="Seu nome"
            aria-invalid={!!erros.nome}
            aria-describedby={erros.nome ? 'erro-nome' : undefined}
            className={`${base} mt-1.5 ${borda('nome')}`}
          />
          {erros.nome && <p id="erro-nome" className="mt-1 text-xs text-red-600">{erros.nome}</p>}
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-semibold">E-mail</label>
          <input
            id="email"
            type="email"
            value={dados.email}
            onChange={(e) => atualizar('email', e.target.value)}
            placeholder="voce@email.com"
            aria-invalid={!!erros.email}
            aria-describedby={erros.email ? 'erro-email' : undefined}
            className={`${base} mt-1.5 ${borda('email')}`}
          />
          {erros.email && <p id="erro-email" className="mt-1 text-xs text-red-600">{erros.email}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="assunto" className="text-xs font-semibold">Assunto</label>
        <div className="relative mt-1.5">
          <select
            id="assunto"
            value={dados.assunto}
            onChange={(e) => atualizar('assunto', e.target.value)}
            aria-invalid={!!erros.assunto}
            aria-describedby={erros.assunto ? 'erro-assunto' : undefined}
            className={`${base} appearance-none pr-10 ${borda('assunto')} ${dados.assunto ? '' : 'text-neutral-500'}`}
          >
            <option value="">Selecione</option>
            {assuntos.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" aria-hidden />
        </div>
        {erros.assunto && <p id="erro-assunto" className="mt-1 text-xs text-red-600">{erros.assunto}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="mensagem" className="text-xs font-semibold">Mensagem</label>
        <textarea
          id="mensagem"
          rows={4}
          value={dados.mensagem}
          onChange={(e) => atualizar('mensagem', e.target.value)}
          placeholder="Escreva sua mensagem"
          aria-invalid={!!erros.mensagem}
          aria-describedby={erros.mensagem ? 'erro-mensagem' : undefined}
          className={`${base} mt-1.5 resize-none ${borda('mensagem')}`}
        />
        {erros.mensagem && <p id="erro-mensagem" className="mt-1 text-xs text-red-600">{erros.mensagem}</p>}
      </div>

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={16} aria-hidden />
        {estado === 'enviando' ? 'Enviando...' : 'Enviar mensagem'}
      </button>

      {estado === 'sucesso' && (
        <p role="status" className="mt-4 rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-800">
          Mensagem enviada! Obrigado pelo contato.
        </p>
      )}
      {estado === 'erro' && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
          Não foi possível enviar a mensagem. Tente novamente em instantes.
        </p>
      )}
    </form>
  )
}
import { Sparkles } from 'lucide-react'
import { categorias } from '../../components/ocorrencia/config'
import { previsoesPorCategoria } from '../../data/previsao'
import type { CategoriaRegistro } from '../../types'

interface PrevisaoPrazoProps {
  categoria: CategoriaRegistro
  bairro: string
}

export default function PrevisaoPrazo({ categoria, bairro }: PrevisaoPrazoProps) {
  const { dias, risco } = previsoesPorCategoria[categoria]
  const nomeCategoria = categorias[categoria].label.toLocaleLowerCase('pt-BR')

  return (
    <section aria-labelledby="titulo-previsao" className="flex items-start gap-3 rounded-xl bg-brand-soft p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
        <Sparkles size={20} aria-hidden />
      </span>
      <div>
        <h2 id="titulo-previsao" className="text-xs font-medium text-blue-700">Previsão de prazo (IA)</h2>
        <p className="mt-0.5 text-lg font-semibold">Cerca de {dias} dias</p>
        <p className="mt-0.5 text-sm text-neutral-700">
          Risco de atraso: {risco}. Estimativa feita com dados abertos do SP156 para {nomeCategoria} em {bairro}.
        </p>
      </div>
    </section>
  )
}

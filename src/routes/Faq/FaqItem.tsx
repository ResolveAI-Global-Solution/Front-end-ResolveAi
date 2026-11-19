import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import type { PerguntaFaq } from '../../types'

interface FaqItemProps extends PerguntaFaq {
  abertoInicial?: boolean
}

// Cada item abre e fecha sozinho: mais de uma resposta pode ficar aberta, como no Figma
export default function FaqItem({ pergunta, resposta, abertoInicial = false }: FaqItemProps) {
  const [aberto, setAberto] = useState(abertoInicial)
  const idResposta = useId()

  return (
    <div
      className={`rounded-xl border transition-colors ${aberto ? 'border-brand bg-brand-soft' : 'border-neutral-200 bg-white'}`}
    >
      <h3>
        <button
          type="button"
          onClick={() => setAberto(!aberto)}
          aria-expanded={aberto}
          aria-controls={idResposta}
          className="flex w-full items-center gap-3 p-5 text-left text-lg font-semibold"
        >
          <span className="flex-1">{pergunta}</span>
          <ChevronDown
            size={24}
            className={`shrink-0 transition-transform ${aberto ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      </h3>
      <p id={idResposta} hidden={!aberto} className="-mt-3 px-5 pb-5 text-neutral-700">
        {resposta}
      </p>
    </div>
  )
}

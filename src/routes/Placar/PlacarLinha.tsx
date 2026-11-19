import type { PlacarRegiao } from '../../types/placar'

interface PlacarLinhaProps {
  posicao: number
  item: PlacarRegiao
}

/** Uma linha do placar: posição, bairro, barra do % resolvido e os números. Sem rótulos de melhor ou pior. */
export default function PlacarLinha({ posicao, item }: PlacarLinhaProps) {
  const percentual = Math.round(item.percentualResolvido)
  const tempo =
    item.tempoMedioResolucaoDias === null
      ? 'nenhuma resolvida ainda'
      : `${String(item.tempoMedioResolucaoDias).replace('.', ',')} dias em média`

  return (
    <li className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold">
        {posicao}
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-semibold">
          {item.regiao} <span className="text-sm font-normal text-neutral-500">· {item.municipio}</span>
        </p>

        <div
          className="mt-1.5 h-2 w-full rounded-full bg-neutral-100"
          role="progressbar"
          aria-label={`${percentual}% resolvido`}
          aria-valuenow={percentual}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-brand" style={{ width: `${percentual}%` }} />
        </div>

        <p className="mt-1.5 text-xs font-medium text-neutral-700">
          {percentual}% resolvido · {tempo} · {item.abertas} em aberto
        </p>
      </div>
    </li>
  )
}

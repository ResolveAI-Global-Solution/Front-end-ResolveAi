import type { PlacarItem } from '../types'

export default function PlacarRow({ posicao, nome, resolvidoPct, diasMedia, porMilHab }: PlacarItem) {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold">
        {posicao}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{nome}</p>
        <div
          className="mt-1.5 h-1.5 w-full rounded-full bg-neutral-200"
          role="progressbar"
          aria-valuenow={resolvidoPct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-brand" style={{ width: `${resolvidoPct}%` }} />
        </div>
        <p className="mt-1.5 text-xs text-neutral-600">
          {resolvidoPct}% resolvido · {diasMedia} dias em média · {String(porMilHab).replace('.', ',')} por mil hab.
        </p>
      </div>
    </li>
  )
}
import { Check, Circle, RotateCcw, Users } from 'lucide-react'

const pins = [
  { cor: 'bg-amber-800', Icone: Circle, pos: 'left-[8%] top-[6%]' },
  { cor: 'bg-blue-600', Icone: Users, pos: 'left-[65%] top-[18%]' },
  { cor: 'bg-red-700', Icone: RotateCcw, pos: 'left-[18%] top-[40%]' },
  { cor: 'bg-amber-800', Icone: Circle, pos: 'left-[42%] top-[55%]' },
  { cor: 'bg-green-800', Icone: Check, pos: 'left-[85%] top-[52%]' },
]

export default function MapPreview() {
  return (
    <div className="rounded-2xl bg-white p-4 text-black shadow-lg">
      <div className="relative h-52 overflow-hidden rounded-xl bg-slate-200 sm:h-60" aria-hidden>
        <div className="absolute inset-x-0 top-[38%] h-3 bg-white" />
        <div className="absolute inset-y-0 left-[30%] w-3 bg-white" />
        <div className="absolute inset-y-0 left-[70%] w-3 bg-white" />
        <div className="absolute -left-4 top-[50%] h-3 w-[120%] origin-left rotate-[14deg] bg-white" />
        {pins.map(({ cor, Icone, pos }, i) => (
          <span
            key={i}
            className={`absolute flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-white shadow ${cor} ${pos}`}
          >
            <Icone size={14} />
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold">5 ocorrências abertas perto de você · Vila Mariana</p>
    </div>
  )
}
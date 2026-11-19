import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import type { Integrante } from '../../types'

export default function IntegranteCard({ rm, nome, turma }: Integrante) {
  return (
    <article className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 p-6 text-center">
      <Avatar nome={nome} />
      <h2 className="text-lg font-semibold">{nome}</h2>
      <p className="text-sm text-neutral-500">
        RM {rm} · {turma}
      </p>
      <Link
        to={`/integrantes/${rm}`}
        className="mt-auto flex min-h-12 w-full items-center justify-center rounded-lg border-[1.5px] border-brand bg-white px-5 font-semibold text-brand hover:bg-brand-soft"
      >
        Ver perfil
      </Link>
    </article>
  )
}

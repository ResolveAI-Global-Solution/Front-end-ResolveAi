import { Link } from 'react-router-dom'
import { links } from '../data/home'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <Logo claro />
            <p className="mt-2 text-sm text-white/90">Plataforma de ocorrências e transparência urbana.</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold" aria-label="Rodapé">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-white/70 px-3 py-1">ODS 11 · Cidades e comunidades sustentáveis</span>
          <span className="rounded-full border border-white/70 px-3 py-1">ODS 10 · Redução das desigualdades</span>
        </div>

        <hr className="my-5 border-white/40" />
        <p className="text-xs text-white/90">Projeto acadêmico FIAP · Global Solution 2026/2 · HalfTech · Turma 1TDSPW</p>
      </div>
    </footer>
  )
}
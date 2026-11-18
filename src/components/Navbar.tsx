import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { links } from '../data/home'
import Logo from './Logo'

export default function Navbar() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="ResolveAI, página inicial">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'text-brand' : 'text-neutral-900 hover:text-brand')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/registrar"
          className="hidden rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 lg:inline-block"
        >
          Registrar ocorrência
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 lg:hidden"
          onClick={() => setAberto(!aberto)}
          aria-expanded={aberto}
          aria-label="Abrir menu"
        >
          {aberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {aberto && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 bg-white px-4 py-3 lg:hidden" aria-label="Mobile">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setAberto(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-brand-soft text-brand' : 'text-neutral-900'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/registrar"
            onClick={() => setAberto(false)}
            className="mt-2 rounded-lg bg-brand px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Registrar ocorrência
          </Link>
        </nav>
      )}
    </header>
  )
}
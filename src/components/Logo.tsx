import logoR from '../assets/images/logo-r.svg'
import logoWordmark from '../assets/images/logo-wordmark.svg'

type Variante = 'navbar' | 'footer'

interface LogoProps {
  variante?: Variante
}

export default function Logo({ variante = 'navbar' }: LogoProps) {
  // No fundo azul do footer, as duas partes ficam brancas
  const cor = variante === 'footer' ? 'brightness-0 invert' : ''

  return (
    <span className="flex items-center gap-2">
      <img src={logoR} alt="" className={cor} />
      <img src={logoWordmark} alt="ResolveAI" className={cor} />
    </span>
  )
}
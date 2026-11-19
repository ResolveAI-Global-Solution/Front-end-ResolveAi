interface AvatarProps {
  nome: string
  foto?: string
}

// Iniciais do primeiro e do último nome: "Luiz Felipe Lourenço da Silva" -> "LS"
function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/)
  const primeira = partes[0]?.[0] ?? ''
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : ''
  return (primeira + ultima).toUpperCase()
}

const base = 'size-24 shrink-0 rounded-full'

// Mostra a foto; sem foto, cai para o círculo com as iniciais
export default function Avatar({ nome, foto }: AvatarProps) {
  if (foto) {
    return <img src={foto} alt={`Foto de ${nome}`} className={`${base} object-cover object-top ring-4 ring-brand-soft`} />
  }

  return (
    <span className={`${base} flex items-center justify-center bg-brand text-2xl font-semibold text-white`} aria-hidden>
      {iniciais(nome)}
    </span>
  )
}

interface AvatarProps {
  nome: string
  tamanho?: 'md' | 'lg'
}

const tamanhos = {
  md: 'size-20 text-[22px]',
  lg: 'size-28 text-3xl sm:size-40 sm:text-[40px]',
}

// Iniciais do primeiro e do último nome: "Luiz Felipe Lourenço da Silva" -> "LS"
function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/)
  const primeira = partes[0]?.[0] ?? ''
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : ''
  return (primeira + ultima).toUpperCase()
}

export default function Avatar({ nome, tamanho = 'md' }: AvatarProps) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand font-semibold text-white ${tamanhos[tamanho]}`}
      aria-hidden
    >
      {iniciais(nome)}
    </span>
  )
}

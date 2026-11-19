import { useEffect, useRef } from 'react'

interface FotoOcorrenciaProps {
  foto: Blob
  alt: string
  className?: string
}

export default function FotoOcorrencia({ foto, alt, className }: FotoOcorrenciaProps) {
  const imagemRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const imagem = imagemRef.current
    if (!imagem) return
    const url = URL.createObjectURL(foto)
    imagem.src = url
    return () => URL.revokeObjectURL(url)
  }, [foto])

  return <img ref={imagemRef} alt={alt} className={className} />
}

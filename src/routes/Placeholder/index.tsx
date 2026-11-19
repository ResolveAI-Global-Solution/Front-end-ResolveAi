import { Link } from 'react-router-dom'

interface PlaceholderProps {
  titulo: string
}

export default function Placeholder({ titulo }: PlaceholderProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="text-3xl font-semibold">{titulo}</h1>
      <p className="mt-3 text-neutral-600">Esta página ainda está em construção.</p>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-brand hover:underline">
        Voltar ao início
      </Link>
    </section>
  )
}
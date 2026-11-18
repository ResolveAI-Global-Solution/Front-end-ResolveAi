import ContatoFormulario from './components/ContatoFormulario'

export default function Contato() {
  return (
    <section className="bg-neutral-100">
      <div className="mx-auto grid max-w-5xl items-start gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-14">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Fale com a gente</h1>
          <p className="mt-3 max-w-sm text-sm text-neutral-700">
            Dúvidas, sugestões ou parcerias? Escreva para a equipe da HalfTech.
          </p>
        </div>
        <ContatoFormulario />
      </div>
    </section>
  )
}
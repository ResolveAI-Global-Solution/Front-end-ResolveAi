import RegistroFormulario from './RegistroFormulario'

export default function Registrar() {
  return (
    <section className="bg-[#f7f7f9]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:pb-20 lg:pt-12">
        <h1 className="mb-6 text-3xl font-semibold leading-tight sm:text-[40px]">Registrar ocorrência</h1>
        <RegistroFormulario />
      </div>
    </section>
  )
}

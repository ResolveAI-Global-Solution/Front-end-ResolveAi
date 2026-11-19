import { diferenciais } from '../../data/sobre'
import DiferencialCard from './DiferencialCard'

const container = 'mx-auto max-w-5xl px-4 sm:px-6'

export default function Sobre() {
  return (
    <>
      <section>
        <div className={`${container} py-12 lg:py-14`}>
          <h1 className="text-3xl font-semibold sm:text-4xl">Sobre o ResolveAI</h1>
          <p className="mt-3 max-w-2xl text-sm font-medium text-neutral-800 sm:text-base">
            Uma plataforma de ocorrências e transparência urbana feita pela HalfTech, de quatro estudantes da FIAP.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100">
        <div className={`${container} grid gap-8 py-12 md:grid-cols-2 md:gap-12`}>
          <div>
            <h2 className="text-xl font-semibold">O problema</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              Quem reclama de um buraco ou de uma calçada quebrada no SP156 quase nunca vê o que aconteceu com o pedido. O canal repassa ao órgão responsável e só responde quando ele retorna. Em calçadas, a espera média chegou a 33 dias, quase sete vezes o prazo típico.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">A solução</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              Moradores registram ocorrências com local e foto, vizinhos apoiam e confirmam, todos acompanham até a foto que comprova a solução. Um placar público compara as subprefeituras, e modelos de IA treinados com dados abertos do SP156 estimam prazos.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className={`${container} py-12`}>
          <div className="grid gap-4 md:grid-cols-3">
            {diferenciais.map((d) => (
              <DiferencialCard key={d.titulo} {...d} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className={`${container} py-12`}>
          <h2 className="text-xl font-semibold">Como se sustenta</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-100">
            Gratuito para o morador, com anúncios identificados. O Premium, de R$ 9,90/mês, remove anúncios e traz o relatório mensal dos bairros. Sem contratos com prefeituras e sem mudar a prioridade de nenhuma ocorrência.
          </p>
        </div>
      </section>
    </>
  )
}
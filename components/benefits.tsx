const items = [
  {
    title: "Preço de grupo",
    text: "Promoções que só quem está no grupo vê, com desconto de verdade em peças de coleção.",
  },
  {
    title: "Você vê antes",
    text: "Peça nova, tamanho único, última unidade: avisamos no grupo primeiro. Quem chega antes leva.",
  },
  {
    title: "Só a loja posta",
    text: "O grupo é fechado pra mensagens de participantes. Nada de conversa solta, só oferta.",
  },
  {
    title: "Fecha pelo WhatsApp",
    text: "Gostou? Manda mensagem e a gente separa. Envio pra todo o Brasil, saindo de Lages/SC.",
  },
];

export const Benefits = () => (
  <section className="px-4 pb-20 pt-24 lg:pt-36">
    <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[1fr_320px] lg:gap-16">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="font-display text-3xl font-bold text-ameixa sm:text-4xl">
          O que chega no grupo
        </h2>
        <ul className="mt-10 space-y-8">
          {items.map((item) => (
            <li key={item.title} className="flex gap-5">
              <span className="mt-2 size-3 shrink-0 rounded-full bg-rosa" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-bold text-ameixa">{item.title}</h3>
                <p className="mt-1 leading-relaxed text-ameixa-suave">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

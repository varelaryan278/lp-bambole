const steps = [
  {
    title: "Entra no grupo",
    text: "Clica no botão, abre o WhatsApp e confirma. Leva dez segundos.",
  },
  {
    title: "Recebe as promoções",
    text: "Foto, tamanho e preço de cada peça direto no seu celular. Sem spam, só oferta.",
  },
  {
    title: "Escolhe e fecha",
    text: "Chama a gente no privado com a peça que quer. Pagamento combinado e envio rastreado.",
  },
];

export const HowItWorks = () => (
  <section className="px-4 py-20">
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display text-3xl font-bold text-ameixa sm:text-4xl">Como funciona</h2>
      <ol className="mt-10 space-y-8">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rosa font-display text-lg font-bold text-white">
              {index + 1}
            </span>
            <div className="pt-1">
              <h3 className="text-xl font-bold text-ameixa">{step.title}</h3>
              <p className="mt-1 leading-relaxed text-ameixa-suave">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const questions = [
  {
    q: "O grupo é gratuito?",
    a: "Sim. Você entra de graça e só paga se quiser comprar alguma peça.",
  },
  {
    q: "Vou receber muita mensagem?",
    a: "Só a gente posta no grupo, e só quando tem promoção. Nada de conversa solta.",
  },
  {
    q: "Vocês vendem atacado?",
    a: "Não. A Bambolê vende no varejo, uma peça por vez, pra quem quer vestir bem a filha.",
  },
  {
    q: "Enviam pra minha cidade?",
    a: "Enviamos pra todo o Brasil saindo de Lages/SC, com código de rastreio.",
  },
];

export const Faq = () => (
  <section className="px-4 py-20">
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display text-3xl font-bold text-ameixa sm:text-4xl">Dúvidas comuns</h2>
      <div className="mt-8 divide-y divide-rosa/20">
        {questions.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ameixa focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dourado">
              {item.q}
              <span
                aria-hidden="true"
                className="text-2xl leading-none text-rosa transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 leading-relaxed text-ameixa-suave">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

import { WhatsappButton } from "@/components/whatsapp-button";
import { site } from "@/lib/site";

const steps = [
  {
    title: "Você diz o tamanho",
    text: "Manda uma mensagem com o tamanho da sua filha. Só isso.",
  },
  {
    title: "A gente manda o que tem",
    text: "Fotos e preços de todas as peças disponíveis naquele tamanho, direto no seu privado.",
  },
  {
    title: "Você escolhe, a gente envia",
    text: "Gostou de alguma? Fecha ali mesmo, sem entrar em grupo nenhum.",
  },
];

const bubbles = [
  { from: "you", text: "Oi! Tenho uma menina tam 4, o que tem disponível?" },
  { from: "shop", text: "Oi, mamãe! 💗 Vou te mandar tudo que tenho no 4, um minutinho" },
  { from: "shop", photos: true },
  { from: "you", text: "Amei o vestido azul! Como faço pra levar?" },
];

const Photos = () => (
  <span className="flex gap-1.5">
    {[0, 1, 2].map((i) => (
      <span key={i} className="size-14 rounded-md bg-gradient-to-br from-nuvem via-[#f7c7d8] to-rosa/70" />
    ))}
  </span>
);

export const DirectContact = () => (
  <section className="px-4 py-20">
    <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
      <div>
        <h2 className="font-display text-3xl font-bold text-ameixa sm:text-4xl">
          Não curte grupo? Fala direto com a gente
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ameixa-suave">
          Entrar no grupo é opcional. Dá pra comprar só pelo privado, com
          atendimento de gente de verdade.
        </p>
        <ol className="mt-10 space-y-8">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-rosa font-display text-lg font-bold text-rosa">
                {index + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-ameixa">{step.title}</h3>
                <p className="mt-1 leading-relaxed text-ameixa-suave">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <WhatsappButton
          label="Falar no privado"
          href={site.whatsappDirectUrl}
          variant="secondary"
          className="mt-10"
        />
        <p className="mt-4 text-sm text-ameixa-suave">
          Se depois quiser entrar no grupo, é só pedir. A gente te convida.
        </p>
      </div>

      <div className="space-y-2 rounded-3xl bg-[#efeae2] p-4 text-[14px] leading-snug text-[#111b21] shadow-inner">
        {bubbles.map((bubble, index) => (
          <div key={index} className={`flex ${bubble.from === "you" ? "justify-end" : ""}`}>
            <p
              className={`max-w-[85%] rounded-xl px-3 py-2 shadow-sm ${
                bubble.from === "you" ? "rounded-tr-none bg-[#d9fdd3]" : "rounded-tl-none bg-white"
              }`}
            >
              {bubble.photos ? <Photos /> : bubble.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

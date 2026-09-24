import { WhatsappButton } from "@/components/whatsapp-button";

export const FinalCta = () => (
  <section className="scallop-bottom bg-nuvem px-4 py-20 text-center">
    <div className="mx-auto flex max-w-xl flex-col items-center">
      <div className="relative rounded-2xl rounded-bl-none bg-white px-5 py-3 text-left text-base leading-snug text-[#111b21] shadow-sm">
        <span className="absolute -left-2 bottom-0 border-[8px] border-transparent border-b-white border-r-white" aria-hidden="true" />
        <p className="text-sm font-bold text-rosa">Bambolê Kids</p>
        <p>Oi, mamãe! Hoje tem promo nova no grupo 💗</p>
        <p className="mt-1 text-right text-[11px] text-[#667781]">agora</p>
      </div>

      <h2 className="mt-8 font-display text-3xl font-extrabold leading-tight text-rosa sm:text-5xl">
        A próxima promoção pode ser da peça que ela pediu
      </h2>
      <p className="mt-5 text-lg text-ameixa-suave">Entra agora e não perde a próxima.</p>
      <WhatsappButton className="mt-8" label="Entrar no grupo de promoções" />
    </div>
  </section>
);

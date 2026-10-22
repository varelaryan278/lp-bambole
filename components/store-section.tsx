import { StoreLink } from "@/components/store-link";

const perks = [
  "Todas as peças com foto, tamanho e preço",
  "Escolhe no seu tempo e finaliza na hora",
  "Envio para todo o Brasil com rastreio",
];

export const StoreSection = () => (
  <section className="px-4 py-20">
    <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[2.5rem] border-4 border-dourado/60 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
      <span className="rounded-full bg-dourado px-4 py-1 font-display text-sm font-bold text-ameixa">
        loja online
      </span>
      <h2 className="mt-5 font-display text-3xl font-bold text-ameixa sm:text-4xl">
        Prefere escolher sozinha? Compre direto no site
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-ameixa-suave">
        A vitrine completa da Bambolê, aberta 24 horas. Sem precisar chamar ninguém.
      </p>
      <ul className="mt-8 grid gap-3 text-left sm:grid-cols-3 sm:gap-6">
        {perks.map((perk) => (
          <li key={perk} className="flex gap-2 text-ameixa">
            <span aria-hidden="true" className="font-bold text-rosa">✓</span>
            {perk}
          </li>
        ))}
      </ul>
      <StoreLink className="mt-10" />
    </div>
  </section>
);

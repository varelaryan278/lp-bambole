import { site } from "@/lib/site";

export const Brands = () => (
  <section className="scallop-bottom bg-nuvem px-4 py-14 text-center">
    <p className="text-sm font-semibold text-ameixa-suave">Marcas que você encontra na Bambolê</p>
    <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3">
      {site.brands.map((brand) => (
        <li key={brand} className="font-display text-2xl font-bold italic text-rosa-escuro sm:text-3xl">
          {brand}
        </li>
      ))}
    </ul>
  </section>
);

import { site } from "@/lib/site";

export const Footer = () => (
  <footer className="px-4 pb-10 pt-20 text-center text-sm text-ameixa-suave">
    <p className="font-display text-lg font-bold text-rosa">{site.name}</p>
    <p className="mt-1">Loja online de moda infantil, {site.city}</p>
    <div className="mt-4 flex justify-center gap-6 font-semibold">
      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-rosa/40 underline-offset-4 hover:text-rosa"
      >
        @{site.instagramHandle}
      </a>
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-rosa/40 underline-offset-4 hover:text-rosa"
      >
        Falar no WhatsApp
      </a>
    </div>
  </footer>
);

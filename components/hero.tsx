import { ChatPreview } from "@/components/chat-preview";
import { Crown } from "@/components/crown";
import { CtaPair } from "@/components/cta-pair";
import { site } from "@/lib/site";

export const Hero = () => (
  <header className="scallop-bottom bg-nuvem px-4 pb-16 pt-10 sm:pt-16 lg:pb-8">
    <div className="mx-auto max-w-5xl">
      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 text-rosa lg:items-start"
      >
        <Crown className="h-7 w-10 text-dourado" />
        <span className="font-display text-2xl font-extrabold tracking-wide">
          BAMBOLÊ <span className="font-bold italic">Kids</span>
        </span>
      </a>

      <div className="mt-10 grid items-center gap-14 lg:mt-12 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative">
            <span className="sticker absolute -right-1 -top-9 rounded-full border-4 border-creme bg-dourado px-4 py-2 font-display text-sm font-bold text-ameixa shadow-md sm:-right-12 sm:-top-12 sm:text-base lg:left-[21rem] lg:right-auto lg:-top-10">
              só no grupo
            </span>
            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.05] text-rosa sm:text-6xl">
              As melhores promoções chegam primeiro no WhatsApp
            </h1>
          </div>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ameixa-suave">
            Foto, tamanho e preço da peça direto no seu celular, antes de ir pro
            Instagram. Gostou? Responde no privado e a gente separa.
          </p>

          <CtaPair className="mt-8" />

          <p className="mt-4 max-w-md text-sm text-ameixa-suave">
            Não curte grupo? Fala direto com a gente: diz o tamanho e recebe as
            peças disponíveis no privado.
          </p>

          <p className="mt-5 text-sm font-semibold text-ameixa-suave">
            {site.followers} mães já acompanham a Bambolê no Instagram
          </p>
        </div>

        <div className="relative z-10 lg:translate-y-24">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70"
          />
          <p className="mb-4 text-center text-sm font-semibold text-ameixa-suave">
            Assim chega no seu celular
          </p>
          <ChatPreview />
        </div>
      </div>
    </div>
  </header>
);

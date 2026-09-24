import { WhatsappButton } from "@/components/whatsapp-button";
import { site } from "@/lib/site";

type Props = { className?: string };

export const CtaPair = ({ className = "" }: Props) => (
  <div className={`flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start ${className}`}>
    <WhatsappButton />
    <WhatsappButton
      label="Falar no privado"
      href={site.whatsappDirectUrl}
      variant="secondary"
    />
  </div>
);

import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal", "italic"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Grupo de promoções Bambolê Kids",
  description:
    "Entre no grupo VIP da Bambolê Kids no WhatsApp e receba primeiro as melhores promoções de moda infantil. Lages/SC, envio para todo o Brasil.",
  openGraph: {
    title: "Grupo de promoções Bambolê Kids",
    description:
      "As melhores promoções de moda infantil chegam primeiro no grupo do WhatsApp.",
    locale: "pt_BR",
    type: "website",
  },
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="pt-BR"
    className={`${playfair.variable} ${nunito.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col">{children}</body>
  </html>
);

export default RootLayout;

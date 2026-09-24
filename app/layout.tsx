import type { Metadata, Viewport } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
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
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "moda infantil",
    "roupa infantil",
    "promoções roupa infantil",
    "grupo whatsapp promoções",
    "Bambolê Kids",
    "Lages SC",
    ...site.brands,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: site.colors.rosa,
  colorScheme: "light",
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="pt-BR"
    className={`${playfair.variable} ${nunito.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col">
      {children}
      <JsonLd />
    </body>
  </html>
);

export default RootLayout;

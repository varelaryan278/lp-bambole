import { site } from "@/lib/site";

const data = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: site.name,
  url: site.url,
  description: site.description,
  telephone: site.phone,
  sameAs: [site.instagramUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: "BR",
  },
  areaServed: "BR",
  potentialAction: {
    "@type": "JoinAction",
    name: "Entrar no grupo de promoções",
    target: site.groupUrl,
  },
};

export const JsonLd = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

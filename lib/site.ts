const resolveUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
};

export const site = {
  name: "Bambolê Kids",
  url: resolveUrl(),
  title: "Grupo de promoções Bambolê Kids no WhatsApp",
  description:
    "Entre no grupo VIP da Bambolê Kids e receba primeiro as promoções de moda infantil: Mon Sucre, Petit Cherie e mais, com envio para todo o Brasil.",
  city: "Lages",
  state: "SC",
  phone: "+55 49 98213-459",
  instagramHandle: "bambole_kids.modainfantil",
  instagramUrl: "https://www.instagram.com/bambole_kids.modainfantil/",
  whatsappUrl: "https://wa.me/554998213459",
  whatsappDirectUrl: `https://wa.me/554998213459?text=${encodeURIComponent(
    "Oi, Bambolê! Vim pelo site e quero ver as peças disponíveis 💗 Tamanho:",
  )}`,
  groupUrl: "https://chat.whatsapp.com/FgQ606FxKvTFlrJMFMVyUQ?mode=wwt",
  followers: "11 mil",
  brands: ["Mon Sucre", "Petit Cherie", "Kukiê", "Infanti"],
  colors: { rosa: "#e6407e", nuvem: "#fbe4ec", creme: "#fff8f1", dourado: "#d9a441", ameixa: "#3a1f2c" },
};

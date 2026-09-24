import { ImageResponse } from "next/og";
import { crownPath } from "@/lib/crown-path";
import { loadGoogleFont } from "@/lib/og-font";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const headline = "As melhores promoções chegam primeiro no WhatsApp";
const wordmark = "BAMBOLÊ Kids";
const footer = `Grupo VIP no WhatsApp  •  ${site.city}/${site.state}  •  Envio para todo o Brasil`;

const OpengraphImage = async () => {
  const [playfair, nunito] = await Promise.all([
    loadGoogleFont("Playfair+Display:wght@800", headline + wordmark),
    loadGoogleFont("Nunito:wght@700", footer),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: site.colors.nuvem,
          color: site.colors.rosa,
          fontFamily: "Playfair",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="39" viewBox="0 0 64 44" fill={site.colors.dourado}>
            <path d={crownPath} />
            <circle cx="2.5" cy="10" r="2.5" />
            <circle cx="61.5" cy="10" r="2.5" />
            <circle cx="32" cy="3" r="3" />
          </svg>
          <span style={{ fontSize: 40, letterSpacing: 2 }}>{wordmark}</span>
        </div>

        <div style={{ display: "flex", fontSize: 84, lineHeight: 1.02, maxWidth: 1000 }}>{headline}</div>

        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "14px 28px",
            borderRadius: 999,
            background: site.colors.rosa,
            color: "#fff",
            fontFamily: "Nunito",
            fontSize: 26,
          }}
        >
          {footer}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair", data: playfair, weight: 800, style: "normal" },
        { name: "Nunito", data: nunito, weight: 700, style: "normal" },
      ],
    },
  );
};

export default OpengraphImage;

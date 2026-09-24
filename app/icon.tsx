import { ImageResponse } from "next/og";
import { crownPath } from "@/lib/crown-path";
import { site } from "@/lib/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const Icon = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: site.colors.rosa,
          borderRadius: 8,
        }}
      >
        <svg width="24" height="17" viewBox="0 0 64 44" fill={site.colors.dourado}>
          <path d={crownPath} />
          <circle cx="2.5" cy="10" r="2.5" />
          <circle cx="61.5" cy="10" r="2.5" />
          <circle cx="32" cy="3" r="3" />
        </svg>
      </div>
    ),
    size,
  );

export default Icon;

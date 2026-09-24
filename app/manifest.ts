import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const manifest = (): MetadataRoute.Manifest => ({
  name: site.title,
  short_name: site.name,
  description: site.description,
  start_url: "/",
  display: "standalone",
  background_color: site.colors.creme,
  theme_color: site.colors.rosa,
  icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
});

export default manifest;

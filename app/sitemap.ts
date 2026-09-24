import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const sitemap = (): MetadataRoute.Sitemap => [
  { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
];

export default sitemap;

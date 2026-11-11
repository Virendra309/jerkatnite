import type { MetadataRoute } from "next";
import { locations, pageLinks, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pageLinks.map((n) => n.href), ...locations.map((l) => `/locations/${l.slug}`)].map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
  }));
}

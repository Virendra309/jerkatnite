import type { MetadataRoute } from "next";
import { jobs } from "@/data/jobs";
import { locations, pageLinks, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pageLinks.map((n) => n.href), ...locations.map((l) => `/locations/${l.slug}`), ...jobs.map((j) => `/careers/${j.slug}`)].map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
  }));
}

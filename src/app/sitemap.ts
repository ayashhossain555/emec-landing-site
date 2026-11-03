import type { MetadataRoute } from "next";
import { featured } from "@/content/projects";
import { digitalCaseStudies } from "@/content/services";
import { nav, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...nav.map((n) => n.href),
    ...featured.map((c) => `/projects/${c.slug}`),
    ...digitalCaseStudies.map((c) => `/digital/${c.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}/` }));
}

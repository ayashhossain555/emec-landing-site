import type { MetadataRoute } from "next";
import { featured } from "@/content/projects";
import { digitalCaseStudies } from "@/content/services";
import { nav } from "@/content/site";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(); // build date: every deploy is a full rebuild
  const entry = (path: string, priority: number) => ({ url: absolute(path), lastModified, changeFrequency: "monthly" as const, priority });
  return [
    ...nav.map((n) => entry(n.href, n.href === "/" ? 1 : 0.8)),
    ...featured.map((c) => entry(`/projects/${c.slug}`, 0.6)),
    ...digitalCaseStudies.map((c) => entry(`/digital/${c.slug}`, 0.6)),
  ];
}

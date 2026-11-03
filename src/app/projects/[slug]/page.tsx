import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, caseStudyJsonLd, pageMetadata, snippet } from "@/lib/seo";
import { featured } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return featured.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = featured.find((c) => c.slug === slug);
  return study ? pageMetadata({ title: study.short, description: snippet(study.narrative), type: "article" }) : {};
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = featured.find((c) => c.slug === slug);
  if (!study) notFound();
  const path = `/projects/${study.slug}`;
  return (
    <>
      <JsonLd data={[caseStudyJsonLd(study, path), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: study.short, path }])]} />
      <CaseStudyView study={study} back={{ href: "/projects", label: "All projects" }} />
    </>
  );
}

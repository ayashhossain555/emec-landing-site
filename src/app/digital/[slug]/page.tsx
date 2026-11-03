import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, caseStudyJsonLd, pageMetadata, snippet } from "@/lib/seo";
import { digitalCaseStudies } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return digitalCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = digitalCaseStudies.find((c) => c.slug === slug);
  return study ? pageMetadata({ title: study.short, description: snippet(study.summary), type: "article" }) : {};
}

export default async function DigitalCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = digitalCaseStudies.find((c) => c.slug === slug);
  if (!study) notFound();
  const path = `/digital/${study.slug}`;
  return (
    <>
      <JsonLd data={[caseStudyJsonLd(study, path), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "AI & Digital", path: "/digital" }, { name: study.short, path }])]} />
      <CaseStudyView study={study} back={{ href: "/digital", label: "AI & Digital" }} />
    </>
  );
}

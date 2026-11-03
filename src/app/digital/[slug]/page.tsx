import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { digitalCaseStudies } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return digitalCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = digitalCaseStudies.find((c) => c.slug === slug);
  return study ? { title: study.short, description: study.summary } : {};
}

export default async function DigitalCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = digitalCaseStudies.find((c) => c.slug === slug);
  if (!study) notFound();
  return <CaseStudyView study={study} back={{ href: "/digital", label: "AI & Digital" }} />;
}

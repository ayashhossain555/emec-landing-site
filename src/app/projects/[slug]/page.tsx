import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { featured } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return featured.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = featured.find((c) => c.slug === slug);
  return study ? { title: study.short, description: study.narrative.slice(0, 155) } : {};
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = featured.find((c) => c.slug === slug);
  if (!study) notFound();
  return <CaseStudyView study={study} back={{ href: "/projects", label: "All projects" }} />;
}

import type { Metadata } from "next";
import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { PageIntro } from "@/components/PageIntro";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { featured } from "@/content/projects";
import { site } from "@/content/site";
import { vars } from "@/lib/style";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: `Hydro-morphology, drainage, environmental and AI/GIS assignments across ${site.countries.join(", ")}.`,
};

const countryList = `${site.countries.slice(0, -1).join(", ")} and the ${site.countries.at(-1)}`;

export default function ProjectsPage() {
  return (
    <>
      <PageIntro eyebrow="Projects" title={`Experience across ${countryList}`} />

      <section className="container grid-fit" style={vars({ "--min": "280px", "--gap": "16px" }, { paddingBottom: 56 })}>
        {featured.map((f) => (
          <Link key={f.slug} href={`/projects/${f.slug}`} className={styles.card}>
            <Artwork motif={f.art} aspect="16 / 10" />
            <div className="stack" style={{ padding: 20, gap: 8 }}>
              <span className="mono-label" style={{ color: "var(--c-teal)", letterSpacing: "0.06em" }}>{f.client}</span>
              <h2 className="display" style={{ fontSize: 22, lineHeight: 1.1 }}>{f.short}</h2>
              <span className="link-arrow" style={{ fontSize: 14 }}>Read case study →</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="container" style={{ paddingBottom: "var(--section-y)" }}>
        <ProjectExplorer />
      </section>
    </>
  );
}

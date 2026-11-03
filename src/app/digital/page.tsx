import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { digitalCapabilities, digitalCaseStudies } from "@/content/services";
import { stackFull } from "@/content/site";
import { vars } from "@/lib/style";
import styles from "./digital.module.css";

export const metadata: Metadata = pageMetadata({
  title: "AI & Digital",
  description: "Machine learning, remote sensing and WebGIS for water and infrastructure — from SAR flood detection to O&M platforms for river training works.",
});

export default function DigitalPage() {
  return (
    <>
      <section className="surface-deep">
        <div
          className="container grid-fit"
          style={vars({ "--min": "460px", "--gap": "48px" }, { alignItems: "end", paddingBlock: "clamp(56px,8vw,88px) clamp(56px,8vw,72px)" })}
        >
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow" style={vars({ "--eyebrow": "var(--c-gold)" })}>AI &amp; Digital</span>
            <h1 className="display" style={{ fontSize: "clamp(46px,6vw,84px)", lineHeight: 0.95, textWrap: "balance" }}>
              Machine learning, remote sensing and WebGIS for water and infrastructure.
            </h1>
          </div>
          <p className="body" style={{ fontSize: 17, lineHeight: 1.65 }}>
            We design, build and hand over working systems: from SAR flood-detection services and AI image analysis to
            asset inventories and O&amp;M platforms for river training infrastructure.
          </p>
        </div>
      </section>

      <section className="container grid-fit" style={vars({ "--min": "360px", "--gap": "20px" }, { paddingBlock: "clamp(56px,8vw,88px)" })}>
        {digitalCapabilities.map((d) => (
          <div key={d.num} className={styles.capCard}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="dot" style={vars({ "--dot": d.color })} />
              <span className="mono" style={{ fontSize: 12, color: "var(--c-muted)" }}>{d.num}</span>
            </div>
            <h2 className="display h-card">{d.title}</h2>
            <p className="body" style={{ fontSize: 15 }}>{d.text}</p>
            <ul className={`dash-list ${styles.capItems}`}>
              {d.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="surface-white">
        <div className="container section stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Platforms we have built</span>
            <h2 className="display h-section">Digital case studies</h2>
          </div>
          <div className="stack">
            {digitalCaseStudies.map((p) => (
              <Link key={p.slug} href={`/digital/${p.slug}`} className={`grid-fit ${styles.caseRow}`}>
                <Artwork motif={p.art} aspect="16 / 10" label={`Illustration: ${p.shot}`} />
                <div className="stack" style={{ gap: 14 }}>
                  <span className="mono-label" style={{ color: "var(--c-link)", fontSize: 11.5 }}>{p.client}</span>
                  <h3 className="display" style={{ fontSize: "clamp(26px,4vw,34px)", lineHeight: 1.02 }}>{p.short}</h3>
                  <p className="body">{p.summary}</p>
                  <div className="chips" style={{ gap: 6 }}>
                    {p.tech.map((t) => <span key={t} className="chip chip--soft">{t}</span>)}
                  </div>
                  <span className="link-arrow" style={{ fontSize: 14 }}>Read case study →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section stack" style={{ gap: 20 }}>
        <span className="eyebrow" style={vars({ "--eyebrow": "var(--c-muted)" })}>Technology stack</span>
        <div className="chips">
          {stackFull.map((t) => <span key={t} className="chip" style={{ padding: "8px 12px" }}>{t}</span>)}
        </div>
        <div className="cta-band surface-deep" style={{ marginTop: 48, padding: "clamp(24px,5vw,48px)" }}>
          <h2 className="display h-sub" style={{ maxWidth: 620 }}>Need a GIS platform, ML model or data pipeline for your project?</h2>
          <Link href="/contact" className="btn btn--gold">Discuss your system</Link>
        </div>
      </section>
    </>
  );
}

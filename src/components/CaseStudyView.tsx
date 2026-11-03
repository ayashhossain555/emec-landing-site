import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { vars } from "@/lib/style";

/** Shared layout for /projects/[slug] and /digital/[slug]. */
export function CaseStudyView({ study, back }: { study: CaseStudy; back: { href: string; label: string } }) {
  return (
    <article>
      <header className="container stack" style={{ paddingBlock: "56px 40px", gap: 24 }}>
        <Link href={back.href} className="link-arrow" style={{ fontSize: 14 }}>← {back.label}</Link>
        <span className="eyebrow">Case study · {study.country}</span>
        <h1 className="display" style={{ fontSize: "clamp(36px,4.6vw,64px)", lineHeight: 1, maxWidth: 1100, textWrap: "balance" }}>
          {study.name}
        </h1>
      </header>

      <div className="container">
        <div className="placeholder" style={{ aspectRatio: "21 / 8", padding: 16 }}>
          <span style={{ fontSize: 12 }}>project hero image — {study.location}</span>
        </div>
      </div>

      <div
        className="container"
        style={{ paddingBlock: "56px var(--section-y)", display: "flex", flexWrap: "wrap", gap: 56 }}
      >
        <dl className="stack" style={{ margin: 0, borderTop: "1px solid var(--c-line-strong)", flex: "1 1 280px", alignSelf: "flex-start" }}>
          {study.facts.map((f) => (
            <div key={f.k} className="stack" style={{ padding: "16px 0", borderBottom: "1px solid var(--c-line-strong)", gap: 4 }}>
              <dt className="mono-label">{f.k}</dt>
              <dd style={{ margin: 0, fontSize: 15.5, fontWeight: 500, lineHeight: 1.45 }}>{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="stack" style={{ flex: "2 1 460px", gap: 32, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.65, color: "var(--c-body-strong)", textWrap: "pretty" }}>
            {study.narrative}
          </p>
          <div className="stack" style={{ gap: 14 }}>
            <h2 className="display" style={{ fontSize: 30 }}>Services provided</h2>
            <ul
              className="dash-list grid-fill"
              style={vars({ "--min": "260px", "--gap": "0 28px", "--dash": "var(--c-blue)" })}
            >
              {study.services.map((s) => (
                <li key={s} style={{ padding: "13px 0", borderBottom: "1px solid var(--c-line-soft)", fontSize: 15 }}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

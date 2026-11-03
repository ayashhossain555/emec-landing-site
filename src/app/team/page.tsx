import type { Metadata } from "next";
import { Artwork } from "@/components/Artwork";
import { PageIntro } from "@/components/PageIntro";
import { team } from "@/content/people";
import { vars } from "@/lib/style";

export const metadata: Metadata = {
  title: "Team",
  description: "Hydrologists, geomorphologists, ecologists, GIS specialists and machine-learning engineers.",
};

/** First and last initials, e.g. "Shahzad Khan" → "SK". */
const initials = (name: string) => {
  const parts = name.replace(/\./g, " ").split(/\s+/).filter(Boolean);
  return (parts[0][0] + (parts.length > 1 ? parts.at(-1)![0] : "")).toUpperCase();
};

export default function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="Team"
        title="Hydrologists, geomorphologists, ecologists, GIS specialists and machine-learning engineers."
        maxWidth={960}
      />
      <section className="container grid-fill" style={vars({ "--min": "290px", "--gap": "20px" }, { paddingBottom: "var(--section-y)" })}>
        {team.map((m, i) => (
          <article key={m.name} className="stack" style={{ background: "var(--c-surface)", border: "1px solid var(--c-line)" }}>
            <Artwork motif="portrait" aspect="1 / 1" seed={i + 1} initials={initials(m.name)}>
              {m.years ? (
                <span className="mono" style={{ background: "var(--c-ink)", color: "var(--c-on-dark)", padding: "6px 10px", fontSize: 12 }}>
                  {m.years} yrs
                </span>
              ) : null}
            </Artwork>
            <div className="stack" style={{ padding: 22, gap: 10 }}>
              <h2 className="display" style={{ fontSize: 26, lineHeight: 1 }}>{m.name}</h2>
              {m.role && <span className="mono-label" style={{ color: "var(--c-link)", fontSize: 11.5, letterSpacing: "0.06em" }}>{m.role}</span>}
              {m.qual && <span style={{ fontSize: 13.5, color: "var(--c-muted)", lineHeight: 1.4 }}>{m.qual}</span>}
              <ul className="dash-list stack" style={{ marginTop: 6, gap: 6, borderTop: "1px solid var(--c-line-faint)", paddingTop: 12 }}>
                {m.skills.map((s) => (
                  <li key={s} style={{ fontSize: 13.5, lineHeight: 1.45, color: "var(--c-body-strong)", gap: 8 }}>{s}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

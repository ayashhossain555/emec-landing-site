import type { Metadata } from "next";
import { pageMetadata, teamJsonLd } from "@/lib/seo";
import { Artwork } from "@/components/Artwork";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { team } from "@/content/people";
import type { TeamMember } from "@/content/types";
import { vars } from "@/lib/style";

export const metadata: Metadata = pageMetadata({
  title: "Team",
  description: "Hydrologists, geomorphologists, ecologists, GIS specialists and machine-learning engineers.",
});

/** First and last initials, e.g. "Shahzad Khan" → "SK". */
const initials = (name: string) => {
  const parts = name.replace(/\./g, " ").split(/\s+/).filter(Boolean);
  return (parts[0][0] + (parts.length > 1 ? parts.at(-1)![0] : "")).toUpperCase();
};

const core = team.filter((m) => !m.intermittent);
const intermittent = team.filter((m) => m.intermittent);

function MemberCard({ m, seed }: { m: TeamMember; seed: number }) {
  return (
    <article className="stack" style={{ background: "var(--c-surface)", border: "1px solid var(--c-line)" }}>
      <Artwork motif="portrait" aspect="1 / 1" seed={seed} initials={initials(m.name)}>
        {m.years ? (
          <span className="mono" style={{ background: "var(--c-ink)", color: "var(--c-on-dark)", padding: "6px 10px", fontSize: 12 }}>
            {m.years} yrs
          </span>
        ) : null}
      </Artwork>
      <div className="stack" style={{ padding: 22, gap: 10 }}>
        <h3 className="display" style={{ fontSize: 26, lineHeight: 1 }}>{m.name}</h3>
        {m.role && <span className="mono-label" style={{ color: "var(--c-link)", fontSize: 11.5, letterSpacing: "0.06em" }}>{m.role}</span>}
        {m.qual && <span style={{ fontSize: 13.5, color: "var(--c-muted)", lineHeight: 1.4 }}>{m.qual}</span>}
        <ul className="dash-list stack" style={{ marginTop: 6, gap: 6, borderTop: "1px solid var(--c-line-faint)", paddingTop: 12 }}>
          {m.skills.map((s) => (
            <li key={s} style={{ fontSize: 13.5, lineHeight: 1.45, color: "var(--c-body-strong)", gap: 8 }}>{s}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MemberGroup({ id, eyebrow, title, note, members, seedOffset }: { id: string; eyebrow: string; title: string; note?: string; members: TeamMember[]; seedOffset: number }) {
  return (
    <section aria-labelledby={id} className="container stack" style={{ gap: 28, paddingBottom: "var(--section-y)" }}>
      <div className="stack" style={{ gap: 12, maxWidth: 760 }}>
        <span className="eyebrow eyebrow--ruled">{eyebrow}</span>
        <h2 id={id} className="display h-sub">{title}</h2>
        {note && <p className="body">{note}</p>}
      </div>
      <div className="grid-fill" style={vars({ "--min": "270px", "--gap": "20px" })}>
        {members.map((m, i) => <MemberCard key={m.name} m={m} seed={seedOffset + i + 1} />)}
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <>
      <JsonLd data={teamJsonLd()} />
      <PageIntro
        eyebrow="Team"
        title="Hydrologists, geomorphologists, ecologists, GIS specialists and machine-learning engineers."
        maxWidth={960}
      />
      <MemberGroup id="core-team" eyebrow="Core team" title="The people who run EMEC day to day." members={core} seedOffset={0} />
      <MemberGroup
        id="intermittent-experts"
        eyebrow="Intermittent experts"
        title="Senior specialists we bring in project by project."
        note="These experts are not permanent staff. They join EMEC assignments on an intermittent basis when a project calls for their specialism."
        members={intermittent}
        seedOffset={core.length}
      />
    </>
  );
}

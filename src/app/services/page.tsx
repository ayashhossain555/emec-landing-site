import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { services } from "@/content/services";
import { vars } from "@/lib/style";

export const metadata: Metadata = {
  title: "Services",
  description: "Hydro-morphology and bridge hydraulics, water and municipal infrastructure, environment and biodiversity, and AI, WebGIS and remote sensing.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="Planning, feasibility, public consultation, detail design and contract administration."
        maxWidth={960}
      />
      <section className="container stack" style={{ paddingBottom: "var(--section-y)" }}>
        {services.map((g) => (
          <div
            key={g.num}
            id={`service-${g.num}`}
            className="grid-fit"
            style={vars({ "--min": "360px", "--gap": "40px" }, { padding: "48px 0", borderTop: "1px solid var(--c-line-strong)" })}
          >
            <div className="stack" style={{ gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="dot" style={vars({ "--dot": g.color }, { width: 12, height: 12 })} />
                <span className="mono" style={{ fontSize: 12, color: "var(--c-muted)" }}>{g.num}</span>
              </div>
              <h2 className="display h-sub" style={{ lineHeight: 1 }}>{g.title}</h2>
              <p className="body" style={{ fontSize: 16, maxWidth: 480 }}>{g.blurb}</p>
            </div>
            <ul className="dash-list grid-fill" style={vars({ "--min": "220px", "--gap": "0 24px" }, { alignContent: "start" })}>
              {g.items.map((it) => (
                <li key={it} style={{ padding: "14px 0", borderBottom: "1px solid var(--c-line-soft)", fontSize: 15.5, fontWeight: 500 }}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Artwork } from "@/components/Artwork";
import { PageIntro } from "@/components/PageIntro";
import { pillars, site, software } from "@/content/site";
import { vars } from "@/lib/style";

export const metadata: Metadata = {
  title: "About",
  description: "An engineering consulting firm in infrastructure development and environmental management, founded in Dhaka in 2018.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About EMEC"
        title="An engineering consulting firm in infrastructure development and environmental management."
      />

      <section className="container grid-fit" style={vars({ "--min": "420px", "--gap": "56px" }, { paddingBottom: "clamp(56px,8vw,80px)" })}>
        <Artwork motif="field" aspect="4 / 3" seed={3} label="Illustration: drone and total-station field survey over contour lines" />
        <div className="prose">
          <p>
            EMEC is an esteemed engineering consulting firm that operates in the infrastructure development and
            environmental management sector. We specialize in offering comprehensive engineering solutions for clients
            in the public and private sectors. Our team of experienced and highly skilled professionals is committed to
            providing exceptional service and exceeding our client’s expectations.
          </p>
          <p>
            EMEC’s principal focus is on fluvial geomorphology, hydrologic, 1D, 2D and 3D hydraulic and morphologic
            modeling, computational fluid dynamics, artificial intelligence, water resources engineering, and municipal
            infrastructure design. Our services include planning, feasibility analysis, public consultation, detail
            design, and contract administration services. A strong emphasis is placed on environmental considerations
            for all projects undertaken.
          </p>
        </div>
      </section>

      <section className="surface-white">
        <div className="container grid-fit" style={vars({ "--min": "340px", "--gap": "48px" }, { paddingBlock: "clamp(56px,8vw,80px)" })}>
          {pillars.map((p) => (
            <div key={p.title} className="stack" style={{ gap: 14, borderTop: `3px solid ${p.color}`, paddingTop: 24 }}>
              <h2 className="display" style={{ fontSize: 30 }}>{p.title}</h2>
              <p className="body">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container grid-fit" style={vars({ "--min": "420px", "--gap": "56px" }, { paddingBlock: "clamp(56px,8vw,80px)" })}>
        <div className="stack" style={{ gap: 14 }}>
          <span className="eyebrow">Background</span>
          <h2 className="display" style={{ fontSize: "clamp(32px,5.5vw,48px)", lineHeight: 1 }}>Founded in {site.founded}</h2>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: "var(--c-body-strong)" }}>
            The company&apos;s growth is attributed to the wealth of experience of its founders, who together bring
            more than 85 years of experience in civil engineering and related fields in diverse industry sectors. With a diverse
            range of expertise, EMEC can service a wide variety of customers, ranging from small to major enterprises.
          </p>
        </div>
        <div className="stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 12 }}>
            <span className="eyebrow" style={vars({ "--eyebrow": "var(--c-muted)" })}>Software</span>
            <div className="chips">
              {software.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
          <div className="stack" style={{ gap: 12 }}>
            <span className="eyebrow" style={vars({ "--eyebrow": "var(--c-muted)" })}>Field &amp; office equipment</span>
            <p className="body" style={{ fontSize: 15 }}>
              Intel Core i9 / RTX3070 modeling workstations, laptops, colour printing and electronic devices for data
              collection, including drone, multibeam echo sounder, side scan sonar and sub-bottom profiler surveys.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

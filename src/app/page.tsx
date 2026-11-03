import Link from "next/link";
import { HeroGlobe } from "@/components/home/HeroGlobe";
import { clients } from "@/content/people";
import { featured, projects } from "@/content/projects";
import { digitalCapabilities, services } from "@/content/services";
import { site, stack } from "@/content/site";
import { vars } from "@/lib/style";
import styles from "./page.module.css";

const stats = [
  { value: String(site.founded), label: `Founded in ${site.city}` },
  { value: String(projects.length), label: "Assignments delivered or ongoing" },
  { value: String(clients.length), label: "Public and private clients" },
  { value: String(site.countries.length), label: `Countries: ${site.countries.join(", ")}` },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={`container grid-fit ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <div className="eyebrow eyebrow--ruled">{site.city} · Since {site.founded}</div>
          <h1 className="display h-hero">River engineering, AI and geospatial technology for a changing delta.</h1>
          <p className="lead">{site.description}</p>
          <div className={styles.actions}>
            <Link href="/projects" className="btn btn--primary">View our projects</Link>
            <Link href="/digital" className="btn btn--outline">AI &amp; digital solutions</Link>
          </div>
        </div>
        <div className={styles.globeCard}>
          <HeroGlobe />
          <div className={styles.globeStrip}>
            <div className={styles.globeStripHead}>
              <span className={styles.globeLabel}>Where we work</span>
              <span className={styles.globeHint}>Drag globe to rotate</span>
            </div>
            <ul className={styles.countryList}>
              {site.countries.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="surface-white">
        <div className={`container ${styles.stats}`}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 01 — AI & digital */}
      <section className="surface-deep">
        <div className={`container section ${styles.block}`}>
          <div className="grid-fit" style={vars({ "--min": "420px", "--gap": "40px" }, { alignItems: "end" })}>
            <div className={styles.heading}>
              <span className="eyebrow" style={vars({ "--eyebrow": "var(--c-gold)" })}>01 — AI &amp; digital</span>
              <h2 className="display h-section">Engineers who also build the software</h2>
            </div>
            <p className="body" style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 560 }}>
              Our in-house team develops machine-learning models, satellite and drone processing pipelines, WebGIS
              platforms and web applications, so that field data and model results become tools clients use every day.
            </p>
          </div>
          <div className="grid-fit tiles--dark" style={vars({ "--min": "280px" })}>
            {digitalCapabilities.map((d) => (
              <div key={d.num} className={styles.darkTile}>
                <span className="mono" style={{ fontSize: 12, color: d.color }}>{d.num}</span>
                <h3 className="display" style={{ fontSize: 28, lineHeight: 1.05 }}>{d.title}</h3>
                <p className="body" style={{ fontSize: 14.5, lineHeight: 1.55 }}>{d.text}</p>
              </div>
            ))}
          </div>
          <div className="row-between" style={{ alignItems: "center" }}>
            <div className="chips">
              {stack.map((t) => <span key={t} className="chip chip--dark">{t}</span>)}
            </div>
            <Link href="/digital" className="btn btn--gold">See our platforms →</Link>
          </div>
        </div>
      </section>

      {/* 02 — Capabilities */}
      <section className={`container section ${styles.block}`}>
        <div className="row-between">
          <div className={styles.heading} style={{ maxWidth: 640 }}>
            <span className="eyebrow">02 — Capabilities</span>
            <h2 className="display h-section">Four disciplines, one modeling core</h2>
          </div>
          <Link href="/services" className="link-arrow">All services →</Link>
        </div>
        <div className="grid-fit tiles" style={vars({ "--min": "260px" })}>
          {services.map((g) => (
            <Link key={g.num} href="/services" className={styles.serviceTile}>
              <div className={styles.serviceTileHead}>
                <span className="mono" style={{ fontSize: 12, color: "var(--c-muted)" }}>{g.num}</span>
                <span className="dot" style={vars({ "--dot": g.color })} />
              </div>
              <h3 className="display h-card">{g.title}</h3>
              <p className="body" style={{ fontSize: 15, lineHeight: 1.55 }}>{g.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 03 — Selected work */}
      <section className="surface-ink">
        <div className={`container section ${styles.block}`}>
          <div className="row-between">
            <div className={styles.heading}>
              <span className="eyebrow" style={vars({ "--eyebrow": "var(--c-lime)" })}>03 — Selected work</span>
              <h2 className="display h-section">Featured assignments</h2>
            </div>
            <Link href="/projects" className="link-arrow">All {projects.length} projects →</Link>
          </div>
          <div className="grid-fit" style={vars({ "--min": "520px" })}>
            {featured.map((f) => (
              <Link key={f.slug} href={`/projects/${f.slug}`} className={styles.featureCard}>
                <div className="placeholder placeholder--dark" style={{ aspectRatio: "1", padding: 8 }}>
                  <span style={{ fontSize: 10 }}>site photo</span>
                </div>
                <div className={styles.featureCardBody}>
                  <span className="mono-label" style={{ color: "var(--c-lime)" }}>{f.client}</span>
                  <h3 className="display" style={{ fontSize: 24, lineHeight: 1.1 }}>{f.short}</h3>
                  <span style={{ fontSize: 14, color: "var(--c-on-dark-body)" }}>{f.location}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Clients */}
      <section className={`container section ${styles.block}`} style={{ gap: 40 }}>
        <div className={styles.heading} style={{ maxWidth: 760 }}>
          <span className="eyebrow">04 — Clients</span>
          <h2 className="display h-section">Trusted by agencies and development partners</h2>
        </div>
        <ul className={`grid-fill tiles ${styles.clientGrid}`} style={vars({ "--min": "140px" })}>
          {clients.map((c) => (
            <li key={c.abbr} title={c.name} className={styles.clientTile}>
              {c.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- static export, arbitrary logo aspect ratios
                <img src={c.logo} alt={`${c.name} logo`} className={styles.clientLogo} loading="lazy" />
              ) : null}
              <span className="display" style={{ fontSize: 20, letterSpacing: "0.04em" }}>{c.abbr}</span>
              <span style={{ fontSize: 11.5, lineHeight: 1.35, color: "var(--c-muted)" }}>{c.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="container" style={{ marginBottom: "var(--section-y)" }}>
        <div className="cta-band" style={{ background: "var(--c-mint)" }}>
          <h2 className="display" style={{ fontSize: "clamp(30px,5vw,44px)", lineHeight: 1.02, maxWidth: 640 }}>
            Planning a bridge, drainage network or environmental study?
          </h2>
          <Link href="/contact" className="btn btn--dark">Talk to our engineers</Link>
        </div>
      </section>
    </>
  );
}

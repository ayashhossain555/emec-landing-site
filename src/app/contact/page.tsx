import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Artwork } from "@/components/Artwork";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";
import { vars } from "@/lib/style";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Tell us about your project. ${site.address}. ${site.phone.display}.`,
});

const rowStyle = { padding: "18px 0", borderBottom: "1px solid var(--c-line-strong)", gap: 4 } as const;

export default function ContactPage() {
  return (
    <section
      className="container grid-fit"
      style={vars({ "--min": "420px", "--gap": "64px" }, { paddingBlock: "clamp(56px,8vw,80px) var(--section-y)" })}
    >
      <div className="stack" style={{ gap: 28 }}>
        <span className="eyebrow">Contact</span>
        <h1 className="display" style={{ fontSize: "clamp(44px,5.6vw,72px)", lineHeight: 0.98 }}>Tell us about your project.</h1>
        <address className="stack" style={{ borderTop: "1px solid var(--c-line-strong)", fontStyle: "normal" }}>
          <div className="stack" style={rowStyle}>
            <span className="mono-label">Office</span>
            <span style={{ fontSize: 16, lineHeight: 1.5 }}>{site.address}</span>
          </div>
          <div className="stack" style={rowStyle}>
            <span className="mono-label">Phone</span>
            <a href={site.phone.href} style={{ fontSize: 16 }}>{site.phone.display}</a>
          </div>
          <div className="stack" style={rowStyle}>
            <span className="mono-label">Email</span>
            <a href={`mailto:${site.emails.primary}`} style={{ fontSize: 16, fontWeight: 600 }}>{site.emails.primary}</a>
          </div>
        </address>
        <a href="https://www.google.com/maps/search/?api=1&query=Lalmatia+Block+A+Dhaka+1207" target="_blank" rel="noopener noreferrer" aria-label="Open EMEC's office location in Google Maps">
          <Artwork motif="map" aspect="16 / 9" />
        </a>
      </div>
      <ContactForm />
    </section>
  );
}

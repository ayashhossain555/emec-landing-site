import type { Metadata } from "next";
import { team } from "@/content/people";
import { digitalCapabilities, services } from "@/content/services";
import { site } from "@/content/site";

/**
 * Per-page metadata with matching Open Graph / Twitter tags. Next replaces (not merges) the
 * layout's `openGraph` object when a page sets its own, so every page goes through here.
 */
export function pageMetadata({ title, description, type = "website" }: { title: string; description: string; type?: "website" | "article" }): Metadata {
  return {
    title,
    description,
    openGraph: { type, siteName: `${site.name} · ${site.fullName}`, locale: "en_US", title: `${title} · ${site.name}`, description, url: "./", images: [ogImage] },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description, images: [ogImage.url] },
  };
}

/** Trims text to a meta-description length at a word boundary. */
export function snippet(text: string, max = 158) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:.\s]+$/, "")}…`;
}

/** Share image for Open Graph / Twitter, served by app/og.png/route.tsx. */
export const ogImage = { url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.fullName}, Dhaka` };

export const absolute = (path: string) => `${site.url}${path === "/" ? "" : path}/`;

const ORG_ID = `${site.url}/#organization`;

/** Topics EMEC works on, derived from the service lists so it stays in sync. */
export const expertise = [...services.flatMap((s) => s.items), ...digitalCapabilities.map((d) => d.title)];

/** Site-wide JSON-LD: the firm (as a local professional service) and the website. */
export function organizationJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: site.name,
      alternateName: site.fullName,
      legalName: site.fullName,
      url: absolute("/"),
      logo: `${site.url}/brand/emec-logo.png`,
      image: `${site.url}/og.png`,
      description: site.description,
      foundingDate: String(site.founded),
      telephone: site.phone.href.replace("tel:", ""),
      email: site.emails.primary,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Apt 1-B, House No.-4/1, Block A, Lalmatia",
        addressLocality: "Dhaka",
        postalCode: "1207",
        addressCountry: "BD",
      },
      areaServed: site.countries.map((name) => ({ "@type": "Country", name })),
      knowsAbout: expertise,
      numberOfEmployees: { "@type": "QuantitativeValue", value: team.filter((m) => !m.intermittent).length },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engineering, environmental and digital services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.blurb, provider: { "@id": ORG_ID } },
        })),
      },
      slogan: "River engineering, AI and geospatial technology for a changing delta.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: `${site.name} · ${site.fullName}`,
      url: absolute("/"),
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
  ];
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: absolute(t.path) })),
  };
}

export function caseStudyJsonLd(study: { name: string; short: string; client: string; location: string; country: string; narrative: string; services: string[] }, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.name,
    alternativeHeadline: study.short,
    description: study.narrative.slice(0, 300),
    url: absolute(path),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: study.services,
    contentLocation: { "@type": "Place", name: `${study.location}, ${study.country}` },
    mentions: { "@type": "Organization", name: study.client, description: "Client" },
  };
}

export function teamJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: team.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: m.name,
        jobTitle: m.role ?? (m.intermittent ? "Intermittent expert" : undefined),
        knowsAbout: m.skills,
        ...(m.intermittent ? { affiliation: { "@id": ORG_ID } } : { worksFor: { "@id": ORG_ID } }),
      },
    })),
  };
}

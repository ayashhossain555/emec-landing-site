import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, JetBrains_Mono, Public_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { ogImage, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-barlow" });
const publicSans = Public_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-public-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — River engineering, AI and geospatial technology`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // "./" resolves per route against metadataBase, so every page gets its own canonical URL.
  alternates: { canonical: "./" },
  applicationName: site.name,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  publisher: site.fullName,
  category: "Engineering consulting",
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Pages override this through pageMetadata() in lib/seo.ts; the home page uses it as is.
  openGraph: {
    type: "website",
    siteName: `${site.name} · ${site.fullName}`,
    locale: "en_US",
    title: `${site.name} — River engineering, AI and geospatial technology`,
    description: site.description,
    url: "./",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: `${site.name} — River engineering, AI and geospatial technology`, description: site.description, images: [ogImage.url] },
};

export const viewport: Viewport = { themeColor: "#17302b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${publicSans.variable} ${jetbrains.variable}`}>
      {/* Extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before hydration. */}
      <body suppressHydrationWarning>
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

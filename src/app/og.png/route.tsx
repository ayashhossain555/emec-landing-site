import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Social share card (1200x630) at /og.png, rendered once at build time and used by every page.
// A route (not the opengraph-image file convention) so the export gets a real .png filename,
// which Apache needs to send the right Content-Type.
// ImageResponse can't read CSS variables, so the hex values below mirror the tokens
// --c-ink, --c-on-dark, --c-on-dark-body and --c-gold in globals.css.
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export async function GET() {
  const mark = await readFile(join(process.cwd(), "public/brand/emec-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#17302b", color: "#f6f7f4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} height={96} alt="" style={{ background: "#f6f7f4", borderRadius: 12, padding: 8 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: 2 }}>{site.name}</span>
            <span style={{ fontSize: 26, color: "#b9c7c1" }}>{site.fullName}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ width: 80, height: 6, background: "#e8bd2a" }} />
          <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, maxWidth: 1000 }}>River engineering, AI and geospatial technology for a changing delta.</span>
          <span style={{ fontSize: 26, color: "#b9c7c1" }}>{`${site.city}, Bangladesh · Since ${site.founded} · ${site.url.replace("https://", "")}`}</span>
        </div>
      </div>
    ),
    size,
  );
}

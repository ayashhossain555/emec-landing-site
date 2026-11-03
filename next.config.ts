import type { NextConfig } from "next";

// Fully static marketing site: `next build` emits plain HTML/CSS/JS to ./out
// that can be hosted on any static host (no Node server needed).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Don't generate AGENTS.md on `next dev`; CLAUDE.md already covers this repo.
  agentRules: false,
};

export default nextConfig;

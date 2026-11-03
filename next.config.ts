import type { NextConfig } from "next";

// Fully static marketing site: `next build` emits plain HTML/CSS/JS to ./out
// that can be hosted on any static host (no Node server needed).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

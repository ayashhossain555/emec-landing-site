import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

// AI search and assistant crawlers are welcomed explicitly so the firm can be cited in
// AI answers (ChatGPT, Claude, Perplexity, Gemini, Copilot). See also /llms.txt.
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

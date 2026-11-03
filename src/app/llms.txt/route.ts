import { clients, team } from "@/content/people";
import { featured, projects } from "@/content/projects";
import { digitalCapabilities, digitalCaseStudies, services } from "@/content/services";
import { nav, site } from "@/content/site";
import { absolute } from "@/lib/seo";

// /llms.txt (https://llmstxt.org): a plain-markdown summary of the site for AI assistants and
// answer engines. Built from src/content at export time, so it never drifts from the pages.
export const dynamic = "force-static";

export function GET() {
  const core = team.filter((m) => !m.intermittent);
  const experts = team.filter((m) => m.intermittent);
  const person = (m: (typeof team)[number]) => `- ${m.name}${m.role ? `, ${m.role}` : ""}${m.qual ? ` (${m.qual})` : ""}${m.years ? `, ${m.years} years' experience` : ""}: ${m.skills.join("; ")}`;

  const md = [
    `# ${site.name} (${site.fullName})`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is an engineering and environmental consulting firm founded in ${site.city}, Bangladesh in ${site.founded}. It has delivered or is running ${projects.length} assignments for ${clients.length} public and private clients in ${site.countries.join(", ")}.`,
    "",
    "## Key facts",
    `- Website: ${absolute("/")}`,
    `- Address: ${site.address}`,
    `- Map: https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`,
    `- Phone: ${site.phone.display}`,
    `- Email: ${site.emails.primary}`,
    `- Countries of work: ${site.countries.join(", ")}`,
    `- Clients include: ${clients.map((c) => c.name).join("; ")}`,
    "",
    "## Pages",
    ...nav.map((n) => `- [${n.label}](${absolute(n.href)})`),
    "",
    "## Services",
    ...services.map((s) => `- **${s.title}:** ${s.blurb} Includes: ${s.items.join("; ")}.`),
    "",
    "## AI & digital capabilities",
    ...digitalCapabilities.map((d) => `- **${d.title}:** ${d.text}`),
    "",
    "## Project case studies",
    ...featured.map((c) => `- [${c.name}](${absolute(`/projects/${c.slug}`)}): client ${c.client}; ${c.location}, ${c.country}.`),
    "",
    "## Digital case studies",
    ...digitalCaseStudies.map((c) => `- [${c.name}](${absolute(`/digital/${c.slug}`)}): ${c.summary}`),
    "",
    "## Core team",
    ...core.map(person),
    "",
    "## Intermittent experts (engaged per project, not permanent staff)",
    ...experts.map(person),
    "",
  ].join("\n");

  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}

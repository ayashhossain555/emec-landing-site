# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **EMEC** (Environmental Management & Engineering Consultant, Dhaka). It is a Next.js App Router site, written in TypeScript and built as a **fully static export**. It was ported from the Claude Design project `https://claude.ai/design/p/d63d0962-2c8b-4410-bb75-acf80cce165a` (`EMEC Website.dc.html` + `hero-globe.html`). That design is the visual source of truth. To re-check layout or styling, read it with the `DesignSync` tool (`get_file`). Reading needs `/design-login`.

## Commands

```bash
npm run dev         # dev server on http://localhost:3000
npm run build       # static export to ./out (also runs the TS check)
npm run start       # serve ./out locally (npx serve)
npm run lint        # eslint (flat config, next core-web-vitals + typescript)
npm run typecheck   # tsc --noEmit
```

There is no test suite. Verify with `typecheck` + `lint` + `build`, then look at the built pages in a browser.

## Architecture

- **Content is data, pages are views.** Every piece of copy, every list and every figure lives in typed modules under `src/content/` (`site.ts`, `projects.ts`, `services.ts`, `people.ts`, with shapes in `types.ts`). Pages only map over them. To add a project, case study, team member or client, edit the content file, not the JSX. Home-page stats (project count, client count, countries) are derived from these arrays, so they update automatically.
- **Routes** (`src/app/`): `/`, `/about`, `/services`, `/digital`, `/projects`, `/team`, `/contact`. Case studies are SSG via `generateStaticParams` + `dynamicParams = false`:
  - `/projects/[slug]` comes from `featured` in `projects.ts`.
  - `/digital/[slug]` comes from `digitalCaseStudies` in `services.ts`.

  Both render the shared `components/CaseStudyView.tsx`. New slugs need no routing changes.
- **Static export constraints** (`next.config.ts`: `output: "export"`, `trailingSlash`, unoptimized images). There are no server actions, route handlers, middleware or runtime `next/image` optimisation. Metadata routes (`sitemap.ts`, `robots.ts`) need `export const dynamic = "force-static"`.
- **Client components are kept minimal:**
  - `SiteHeader` uses the active route and the mobile menu.
  - `HeroGlobe` is a d3-geo canvas globe using bundled `world-atlas` data. Its country ISO ids must match `world-atlas` feature ids.
  - `ProjectExplorer` handles filter and search.
  - `ContactForm` has no backend. It opens a prefilled `mailto:`. Swap `onSubmit` to POST to a form service once one is chosen.
- **Styling:** design tokens are CSS variables in `src/app/globals.css` (`--c-*` colours, `--font-*`, `--gutter`, `--section-y`). Use the tokens and never hard-code hex values in new code. The file also defines shared primitives (`.container`, `.grid-fit`/`.grid-fill` driven by `--min`/`--gap`, `.tiles`, `.eyebrow`, `.display .h-*`, `.btn--*`, `.chip`, `.dash-list`, `.placeholder`). Component-specific CSS goes in colocated `*.module.css`. Pass CSS custom properties through `style` with `vars()` from `src/lib/style.ts`.
- **Fonts:** Barlow Condensed (display), Public Sans (body) and JetBrains Mono (labels), loaded via `next/font` in `layout.tsx` and exposed as `--font-barlow/--font-public-sans/--font-jetbrains`.
- **Imagery:** striped `.placeholder` blocks mark photos the client hasn't supplied yet. Brand files are in `public/brand/`. Client logos are text-only until approved files land in `public/clients/` and a `logo` path is set in `people.ts`.

## Knowledge base

`knowledge/` holds sourced markdown digests of EMEC's company documents: profile, experience list, project reports and digital case-study specs. **Check copy changes against it**, because each section cites its source document. Its README lists conflicts between the design copy and the documents, such as project counts, the Ireland/USA country claims and email addresses. Raw source files (CVs, timesheets, client reports) must never be committed. Only the digests belong in the repo, and `knowledge/sources/` is gitignored.

## Progress tracking

- `/catchup` runs at the start of a session. It reads `PROGRESS.md` + git state and summarizes where things stand.
- `/wrap` runs at the end of a session. It prepends a dated entry to `PROGRESS.md` (done / decisions / next up / open questions).

`PROGRESS.md` is the cross-session record, including open content questions for the client.

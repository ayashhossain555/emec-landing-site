# Progress Log

The `/wrap` skill maintains this log and the `/catchup` skill reads it. Newest session first.

**Status:** The full site is implemented from the Claude Design project. It builds as a static export (20 routes) and typecheck and lint are clean. It is waiting on client content decisions and real imagery.

## Sessions

### 2026-11-03: Design import, site build, knowledge base
**Done**
- Imported the Claude Design project `d63d0962-…` through DesignSync (after `/design-login`).
- Ported `EMEC Website.dc.html` (custom dc-runtime template) to Next.js 16 App Router + TypeScript as a static export:
  - The pages are home, about, services, AI & digital, projects (filter/search explorer), team and contact.
  - There are 4 project case studies and 3 digital case studies (SSG).
  - Also added: 404, sitemap and robots.
- Ported `hero-globe.html` to the `HeroGlobe` React canvas component. It now uses bundled `world-atlas` data instead of a CDN fetch and respects reduced motion.
- Design tokens are in `globals.css`. All copy and data are in typed `src/content/*`.
- Brand assets: the hex mark was cropped from `assets/emec-mark.png` into `public/brand/`, and the favicon and apple icon were generated from it. `assets/untitled.png` (the design's header icon) came through truncated, so the crop replaces it.
- Built `knowledge/` from the `uploads/` documents. Personal files (resume, timesheet, CV) were skipped on purpose.
- Added the `/catchup` and `/wrap` skills, `CLAUDE.md` and `README.md`.
- Phone-width check (390px): no page scrolls sideways, including the case studies and the 404. The project explorer switches to stacked rows, and the mobile menu opens, closes on navigation and has 53px tap targets.
- Fixed the globe labels: Bhutan and India now draw to the left of their pins, so they no longer cover the Bangladesh/HQ label. The design had the same overlap.
- Committed on branch `feat/site-from-design`.

**Decisions**
- Next.js static export, because a marketing site needs no backend and can deploy to any static host.
- The contact form opens a `mailto:` because there's no backend yet. Hooking up a form service is a follow-up.
- Client logos are text-only. The design hotlinked Wikimedia files, and those need approved local copies.
- The site keeps the design's copy verbatim. Discrepancies are flagged below rather than silently "fixed".

**Next up**
- [ ] Review the `feat/site-from-design` branch and merge it into `main`
- [ ] Resolve the open content questions below with EMEC, then update `src/content/*`
- [ ] Replace the `.placeholder` blocks with real photos (hero/field, project sites, team portraits, map embed)
- [ ] Add approved client logo files to `public/clients/` and set `logo` in `people.ts`
- [ ] Choose a contact-form backend (Formspree, Web3Forms or a serverless function) and wire it into `ContactForm`
- [ ] Choose hosting and a domain (`site.url` is set to `https://emecbd.com`)
- [ ] Consider case studies drawn from `knowledge/`: GIZ CONNECT household survey, BRAC RISE drone mapping, PCKK flood detection

**Open questions** (the design copy conflicts with the source documents; see `knowledge/README.md`)
- **Countries:** the design lists Ireland and the USA. The documents support only Bangladesh, India, Japan and Bhutan. A USA project (Faztrack) is in the design's project list, but nothing for Ireland.
- **Contact emails:** the design uses emec.servicesbd@gmail.com and info@emecbd.com. The documents show emeiconsultant@gmail.com. Which is current?
- **Project count:** the design has 43 assignments. The documents list 25 to 36, or about 41 after deduplication.
- **Shahzad Khan's title:** the design says "CEO". The documents say "Proprietor".
- **"Founders' combined 40 years":** this conflicts with the individual figures (30, 31 and 25 years).
- **Company name:** the V6 profile header says "Engineering Management…". Every other source says "Environmental Management…".

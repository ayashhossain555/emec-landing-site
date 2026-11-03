# Progress Log

The `/wrap` skill maintains this log and the `/catchup` skill reads it. Newest session first.

**Status:** The full site is implemented from the Claude Design project and pushed to GitHub (`ayashhossain555/emec-landing-site`, `main`). It builds as a static export (20 routes) and typecheck and lint are clean. 22 of 30 client logos are in. It is waiting on client content decisions, real imagery, the remaining logos and a hosting choice.

## Sessions

### 2026-11-03: Globe rotation, client logos, AGENTS.md off
**Done**
- Deleted `AGENTS.md` and set `agentRules: false` in `next.config.ts`, so `next dev` stops generating it.
- `HeroGlobe` now always auto-rotates, as in the design. Windows "Animation effects" off was triggering reduced motion and freezing it. Drag still works.
- Added 22 of 30 client logos in `public/clients/`, set via `logo` in `src/content/people.ts`:
  - Wikimedia Commons / Wikipedia: World Bank, ADB, JICA, AIIB, GIZ, BRAC, DWASA, BWDB, BEZA, RAJUK, IIFC, KWASA, NSU, CCECC, PCKK, plus the Government Seal for LGED.
  - The organisation's own site: OCG, JDI, DDC (ddclbd.com), d.zignscape.
  - Supplied by the user: RHD, BBA (white backgrounds made transparent).
- New `src/components/home/ClientLogo.tsx` sizes logos by area, so wordmarks and seals look equally weighted.
- The client grid has a fixed 64px logo slot at the top of every tile, and 6 columns (`--min: 180px`) fill 5 rows exactly.
- CCECC's card now shows the full name "China Civil Engineering Construction Corporation".
- Checked all 14 routes at 390px: no horizontal overflow.
- Commits `b55bae0`, `6c6553b` and `e5c9fa0` are pushed to `origin/main`.

**Decisions**
- The globe ignores `prefers-reduced-motion`, at the user's request to match the design. If accessibility matters later, a slower spin is the fallback.
- Logos are local copies rather than hotlinks, so the static export has no third-party image requests.
- The Bangladesh Army candidate was skipped because it was the Army Aviation roundel, the wrong emblem for the 14th Brigade.
- The `.gov.bd` portals show a generic government seal in the logo slot, but RHD and BBA have their own logos. Only LGED uses the seal, as the user chose.

**Next up**
- [ ] Find logos for the remaining 8: DPHE, 14th Bde (Army), Phuentsholing Thromde, DECL, EPC, SPMC, HeptaTech, A. I. Associates
- [ ] Get higher-res OCG (88x100) and d.zignscape (203x55) logos, which look soft
- [ ] Choose hosting (Vercel, Netlify or GitHub Pages) and the domain (`site.url` = `https://emecbd.com`) (carried over)
- [ ] Resolve the open content questions with EMEC, then update `src/content/*` (carried over)
- [ ] Replace the `.placeholder` blocks with real photos (carried over)
- [ ] Choose a contact-form backend and wire it into `ContactForm` (carried over)
- [ ] Consider case studies from `knowledge/`: GIZ CONNECT, BRAC RISE, PCKK flood detection (carried over)

**Open questions**
- EMEC should confirm permission to show the 22 client logos (third-party trademarks) before launch.
- The six content conflicts from the earlier entry are still open.

### 2026-11-03: Merge, push and repo housekeeping
**Done**
- Fast-forward merged `feat/site-from-design` into `main` (`6a9189e`) and deleted the branch.
- Pushed `main` to `origin` (github.com/ayashhossain555/emec-landing-site). Local and remote match at `a65eb3c`.
- Added `.gitattributes`: LF line endings everywhere (stops the CRLF warnings on Windows), and `package-lock.json` marked `-diff linguist-generated` so it collapses in diffs and PRs.
- Confirmed git is clean: `node_modules/`, `.next/` and `out/` are ignored, and `PROGRESS.md`, `CLAUDE.md` and `.claude/` are tracked. Untracked files shown in the editor were a stale Source Control view, and refreshing fixes it.

**Decisions**
- `package-lock.json` stays committed, because it pins exact dependency versions for reproducible installs and builds. `.gitattributes` handles the diff noise instead of ignoring the file.

**Next up**
- [ ] Choose hosting now that the repo is on GitHub (Vercel, Netlify or GitHub Pages can deploy `out/` directly), plus the domain (`site.url` = `https://emecbd.com`)
- [ ] Resolve the open content questions (listed in the entry below) with EMEC, then update `src/content/*`
- [ ] Replace the `.placeholder` blocks with real photos (hero/field, project sites, team portraits, map embed)
- [ ] Add approved client logo files to `public/clients/` and set `logo` in `people.ts`
- [ ] Choose a contact-form backend (Formspree, Web3Forms or a serverless function) and wire it into `ContactForm`
- [ ] Consider case studies drawn from `knowledge/`: GIZ CONNECT household survey, BRAC RISE drone mapping, PCKK flood detection

**Open questions**
- The six content conflicts in the entry below (countries, contact emails, project count, CEO title, "40 years", company name) are all still open.

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
- Committed on branch `feat/site-from-design` and fast-forward merged into `main`.

**Decisions**
- Next.js static export, because a marketing site needs no backend and can deploy to any static host.
- The contact form opens a `mailto:` because there's no backend yet. Hooking up a form service is a follow-up.
- Client logos are text-only. The design hotlinked Wikimedia files, and those need approved local copies.
- The site keeps the design's copy verbatim. Discrepancies are flagged below rather than silently "fixed".

**Next up**
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

# Progress Log

The `/wrap` skill maintains this log and the `/catchup` skill reads it. Newest session first.

**Status:** **Live at https://www.emecbd.com** since 2026-11-03, as a static export on the existing HostGator account (`public_html`; no DNS changes, email untouched). The repo is pushed to GitHub (`ayashhossain555/emec-landing-site`, `main`). The build has 24 routes (including `/llms.txt` and `/og.png`), and typecheck and lint are clean. **All 30 client logos are in**, and SVG illustrations stand in for photos. The site has full SEO/AI-search metadata. The contact form posts to **Web3Forms with hCaptcha** (tested end to end; enquiries reach emec.servicesbd@gmail.com). The contact page has a live Google Map pinned at the office. Waiting on real imagery and logo permission. WordPress is kept in `~/wp-old` for rollback until about 2026-12-03.

## Sessions

### 2026-11-03 — Web3Forms + hCaptcha contact form, Google Map on contact page (late evening)
**Done**
- Contact form moved from FormSubmit to Web3Forms (`ContactForm.tsx`, `ContactForm.module.css`, `site.ts`):
  - form "EMEC website enquiries" (key `c7cd14df-…`) sends to emec.servicesbd@gmail.com;
  - dashboard settings: hCaptcha, Advanced Spam Filter on, Strict spam level;
  - `@hcaptcha/react-hcaptcha` with Web3Forms' free shared site key;
  - honeypot renamed to `botcheck`; the spam-word check moved into the form itself, as a word-boundary regex.
- Verified:
  - Web3Forms rejects posts without a captcha token ("hCaptcha Token is mandatory");
  - Web3Forms rejects all server-side posts on the free plan (403);
  - the form asks for the captcha if it's missing;
  - Ayash sent a live test enquiry, and it arrived.
- Contact page: the drawn map graphic is replaced by an embedded Google Map (`components/contact/OfficeMap.tsx`).
  - Pinned at `site.geo` (23.756722, 90.3735), with "Get directions" and "Open in Google Maps" links.
  - The map loads only when scrolled to (`loading="lazy"`); no API key needed.
- JSON-LD has `geo` (GeoCoordinates) and `hasMap`; `/llms.txt` has a map link; `knowledge/company.md` records the pin.
- `CLAUDE.md` describes the Web3Forms setup.
- Deployed twice through cPanel and verified live. Commits `bfcafe9` and `850bf06` are pushed.
**Decisions**
- Web3Forms over FormSubmit: FormSubmit returned Cloudflare 522 for hours. Web3Forms offers server-enforced hCaptcha and a spam filter for free.
- hCaptcha rather than Turnstile or reCAPTCHA: Web3Forms supplies the hCaptcha site key, so no Cloudflare or Google account is needed.
- Strict spam level, because the client wants zero spam. Drop to Basic if a real enquiry is ever held back.
- Pin by coordinates, not address: the address search pins SSS at House 6/1, and EMEC has no Google listing.
**Next up**
- [ ] Google Business Profile for EMEC (business.google.com, needs Google's verification); then point the map at the listing (new).
- [ ] Google Search Console: add `https://www.emecbd.com/`, submit `sitemap.xml`, and run Rich Results Test (carried over).
- [ ] Test email: send and receive one message on a company mailbox (carried over).
- [ ] Around 2026-12-03, if the site is stable: delete `~/wp-old`, the server backup zip, and only the `…_wp495` database and its user (carried over).
- [ ] Store the two downloaded backups somewhere safer than the Downloads folder (carried over).
- [ ] Higher-res OCG, d.zignscape and DECL logos (carried over).
- [ ] Replace the `Artwork` illustrations with real photos once supplied (carried over).
- Done and dropped: FormSubmit activation (replaced by Web3Forms, tested).
**Open questions**
- `npm run package` only works from PowerShell or cmd (Git Bash's GNU `tar` can't write zip files). Make it portable? (carried over)
- `info@emecbd.com`: put it back on the contact page? (carried over)
- Logo permission from EMEC for all 30 logos, which are live (carried over).
- 14th Bde: Army crest or Corps of Engineers insignia? (carried over)
- Should EMEC review the cleared content calls (Ireland dropped, "Proprietor & CEO", 85+ years)? (carried over)
- 6.6 GB `.cpanel.zip` and old backup folders in the home directory: keep or clean up? (carried over)

### 2026-11-03 — Team split, form spam defences, SEO/AI search, last 3 logos (evening)
**Done**
- Team (`people.ts`, `types.ts`, `team/page.tsx`):
  - Sowmitra Das removed.
  - New `intermittent` flag on `TeamMember`; `/team` now has a "Core team" section (Shahzad, Salemun, Ayash, Shohel) and an "Intermittent experts" section (Zakir Hossein, Sudhir Sharma, Qayum, Abdul Baki).
  - Card `--min` changed from 290px to 270px so both sections show 4 across on desktop.
- `ContactForm.tsx` spam defences, all silent (a bot sees a fake "sent"):
  - honeypot `_honey`, also forwarded to FormSubmit;
  - 4 s minimum fill time;
  - at most 2 links per message;
  - length caps on every field;
  - FormSubmit `_blacklist` of common spam phrases.
- SEO (`src/lib/seo.ts`, `components/JsonLd.tsx`):
  - `pageMetadata()` on every page gives complete OG/Twitter tags.
  - 1200x630 share card at `/og.png` (`app/og.png/route.tsx`).
  - JSON-LD: ProfessionalService + WebSite site-wide, Article + BreadcrumbList on case studies, Person list on `/team`.
  - Sitemap has `lastModified` and priorities; meta descriptions end at a word boundary.
- AI search:
  - `/llms.txt` (`app/llms.txt/route.ts`), generated from `src/content/`;
  - `robots.ts` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others.
- `.htaccess` serves text files as UTF-8. `CLAUDE.md` describes the SEO setup and the contact form.
- Logos for DPHE, EPC and Phuentsholing Thromde added (`public/clients/`, cropped and scaled to 240px tall). That makes all 30. EPC is now named "Engineering & Planning Consultants Ltd.", as on its logo.
- `knowledge/team.md` and `knowledge/clients.md` note the team and EPC decisions.
- Deployed twice through the cPanel Fileman API (upload, extract over `public_html`, zip to Trash). Verified live: pages, redirects, 410s, `llms.txt`, `og.png`, the 30 logos.
- Commits `35c872b` and `8ea4338` are pushed to `origin/main`.
**Decisions**
- Team split comes from EMEC: intermittent experts are not permanent staff. In JSON-LD they are `affiliation`, not `worksFor`.
- The share image is a route at `/og.png`, not the `opengraph-image` file convention, because that convention exports with no extension and Apache would send the wrong Content-Type.
- No FormSubmit CAPTCHA: it only works for non-AJAX posts. The silent checks and `_blacklist` cover AJAX instead.
- Redeploy by extracting over `public_html` (allowed by the runbook when no files are removed) rather than doing a folder swap.
**Next up**
- [ ] Activate FormSubmit once it's back up (it returned 522 all session): submit the live form once, then click the activation email to emec.servicesbd@gmail.com. If it stays down, switch to another form service (carried over).
- [ ] Google Search Console: add `https://www.emecbd.com/`, submit `sitemap.xml`, and run Rich Results Test on a case study (carried over).
- [ ] Test email: send and receive one message on a company mailbox (carried over).
- [ ] Around 2026-12-03, if the site is stable: delete `~/wp-old`, the server backup zip, and only the `…_wp495` database and its user (carried over).
- [ ] Store the two downloaded backups somewhere safer than the Downloads folder (carried over).
- [ ] Higher-res OCG, d.zignscape and DECL logos (carried over).
- [ ] Replace the `Artwork` illustrations with real photos once supplied (carried over).
- Done and dropped: the missing DPHE, Phuentsholing Thromde and EPC logos.
**Open questions**
- `npm run package` only works from PowerShell or cmd: Git Bash's GNU `tar` can't write zip files. Make the script portable?
- `info@emecbd.com`: put it back on the contact page? (carried over)
- Logo permission from EMEC for all 30 logos, which are live (carried over).
- 14th Bde: Army crest or Corps of Engineers insignia? (carried over)
- Should EMEC review the cleared content calls (Ireland dropped, "Proprietor & CEO", 85+ years)? (carried over)
- 6.6 GB `.cpanel.zip` and old backup folders in the home directory: keep or clean up? (carried over)

### 2026-11-03 — Case studies, HostGator deploy, live cutover
**Done**
- New case studies in `src/content/projects.ts`: GIZ CONNECT (`/projects/giz-connect-baseline/`) and BRAC RISe (`/projects/brac-rise-barishal-baseline/`), from the `knowledge/` digests.
- The existing PCKK UFD digital case study (`services.ts`) now covers the web-app phase (Feb 2026 onwards).
- New `coast` motif in `Artwork.tsx` (mangrove shoreline), used for CONNECT so it doesn't repeat the Kewatkhali drawing.
- Projects grid `--min` changed from 280px to 360px, so 6 cards fall into two rows of 3.
- Main address is now `www`: `site.url` is `https://www.emecbd.com`, and `layout.tsx` gives every page a canonical tag via `alternates.canonical: "./"`.
- New `public/.htaccess`:
  - HTTPS, plus apex → www;
  - 301s for `/service/`, `/projects-2/`, `/blog/` and `wp-sitemap*.xml`;
  - 410 for the demo posts, archives and WordPress internals;
  - custom 404, security headers and caching rules;
  - rewrites for the Next 16 prefetch filenames (see Decisions).
- `npm run package` (`tar --format=zip`) builds `emec-site.zip`.
- `DEPLOY.md` is the runbook: account layout, backup, preview, cutover, rollback and post-launch. `CLAUDE.md` points to it.
- Backups were downloaded to the local Downloads folder and verified: the `public_html` zip (162 MB, 18,195 files) and the `…_wp495` SQL dump (31 tables).
- Preview was tested on `preview.emecbd.com` (pages, redirects, 410s, TLS, browser), and the subdomain was then removed.
- Cutover took about 21 s: WordPress moved to `~/wp-old`, and the build went into `public_html`. The live site, redirects, 410s, TLS, DNS and mail ports were all verified afterwards.
- Commits `7a35810`, `b4d90ac` and `0787272` are pushed to `origin/main`.
**Decisions**
- Static upload to HostGator, not Vercel: it needs no DNS change, cannot affect email, and rolls back in seconds.
- Keep `www` as the main address, because that is what Google has indexed from the WordPress site.
- The old demo posts, tag/category/author pages and WordPress internals return 410 rather than redirecting to home, since redirecting junk to home counts as a soft 404.
- The `.htaccess` maps dot-joined prefetch names onto the folders Next writes. Next 16's export writes `__next.about/__PAGE__.txt` but the browser requests `__next.about.__PAGE__.txt`.
- The server is LiteSpeed (it reports itself as Apache) and reads `.htaccess` correctly.
- The other 5 subdomains, their 4 databases and the mailboxes live outside `public_html` and were left untouched.
**Next up**
- [ ] Test email: send and receive one message on a company mailbox (only port reachability was checked).
- [ ] Activate FormSubmit: submit the live form once, then click the activation email to emec.servicesbd@gmail.com (carried over).
- [ ] Google Search Console: add `https://www.emecbd.com/` and submit `sitemap.xml`.
- [ ] Around 2026-12-03, if the site is stable: delete `~/wp-old`, the `~/public_html-wp-2026-11.zip` on the server, and only the `…_wp495` database and its user.
- [ ] Store the two downloaded backups somewhere safer than the Downloads folder.
- [ ] Logos still missing: DPHE, Phuentsholing Thromde, EPC (carried over).
- [ ] Higher-res OCG, d.zignscape and DECL logos (carried over).
- [ ] Replace the `Artwork` illustrations with real photos once supplied (carried over).
- Done and dropped: hosting/domain choice (HostGator, `www.emecbd.com`) and the case studies from `knowledge/`.
**Open questions**
- `info@emecbd.com` is an active mailbox (about 10.7 MB). It was dropped from the site last session; should it go back on the contact page?
- EMEC should confirm permission to show the 27 client logos before they are widely shared (the site is now live with them) (carried over).
- 14th Bde: keep the general Army crest, or switch to the Corps of Engineers insignia? (carried over)
- Should EMEC review the cleared content calls (Ireland dropped, "Proprietor & CEO", 85+ years)? (carried over)
- The home directory holds a 6.6 GB `.cpanel.zip` and older backup folders of unknown origin. Keep or clean up?

### 2026-11-03: Placeholder artwork, contact backend, more logos, content conflicts cleared
**Done**
- `src/components/Artwork.tsx` (+ `.module.css`) is a set of token-coloured SVG engineering illustrations that replace every striped `.placeholder` block.
- Motifs: river, drainage, bridge, biodiversity, field survey, dashboard, SAR flood grid, asset map, office map and initials portraits.
- A new `art: Motif` field on `CaseStudy` (`types.ts`, `projects.ts`, `services.ts`) picks each case study's illustration.
- The contact-page map links to Google Maps.
- `ContactForm` now POSTs to FormSubmit (`formsubmit.co/ajax/<primary email>`). It has a honeypot and a sending state, and falls back to a pre-filled `mailto:` if the request fails.
- 27 of 30 client logos are in. The new ones are 14th Bde (Bangladesh Army crest, Commons), DECL, SPMC, HeptaTech and AIA (each firm's own site).
- The AIA name is now "A.I. & Associates Ltd.", matching its logo.
- Content conflicts cleared:
  - Ireland is removed from `site.countries` and the globe.
  - `info@emecbd.com` is removed (secondary email dropped site-wide).
  - Shahzad Khan's role is "Proprietor & CEO".
  - The about copy now says the founders bring "more than 85 years" of experience.
- Typecheck, lint and build (20 routes) are clean. I checked the pages in the dev server.
- Commit `e66af2e` is pushed to `origin/main`.

**Decisions**
- FormSubmit, because it is the simplest backend: no account, no key, and it works from a static export.
- The bridge motif uses SVG `meet` with an over-wide drawing, so the banks stay visible from 21:8 down to 1:1. The other motifs use `slice`.
- USA stays as a country because of the Faztrack project in `projects.ts`. Ireland went because no source supports it.
- DPHE gets no logo: its portal only has the generic government seal, which would duplicate LGED's tile.
- The project count and company name needed no change: the count is derived from `projects.length`, and every source already says "Environmental Management…".

**Next up**
- [ ] Activate FormSubmit: submit the live form once, then click the activation email sent to emec.servicesbd@gmail.com. Optionally swap `ENDPOINT` to the random alias FormSubmit offers.
- [ ] Logos still missing: DPHE, Phuentsholing Thromde, EPC (need files from EMEC).
- [ ] Get higher-res OCG, d.zignscape and DECL (200x55) logos (carried over, DECL added).
- [ ] Choose hosting (Vercel, Netlify or GitHub Pages) and the domain (`site.url` = `https://emecbd.com`) (carried over)
- [ ] Replace the `Artwork` illustrations with real photos once supplied (carried over, was placeholders)
- [ ] Consider case studies from `knowledge/`: GIZ CONNECT, BRAC RISE, PCKK flood detection (carried over)
- Done and dropped from the list: the content questions, the placeholder graphics and the contact-form backend.

**Open questions**
- EMEC should confirm permission to show the 27 client logos (third-party trademarks) before launch.
- 14th Bde uses the general Army crest. Would EMEC prefer the Corps of Engineers insignia?
- Should EMEC review the cleared content calls (Ireland dropped, "Proprietor & CEO", 85+ years)?
- `knowledge/clients.md` still says "A. I. Associates Ltd." as in the source documents. The site now uses the firm's own "A.I. & Associates Ltd.".

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

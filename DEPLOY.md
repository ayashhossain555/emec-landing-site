# Deploying emecbd.com (HostGator, static export)

The site is a static export (`output: "export"`): no Node runtime, no API routes, and the contact
form posts to FormSubmit from the browser. It is served on the existing HostGator account
from `public_html`. **No DNS change is needed**, so email is never touched.

- Server: `gator3277.hostgator.com`, IP `192.254.236.35`. The web server is **LiteSpeed**
  (it reports itself as Apache), which reads Apache `.htaccess` rules.
- Home directory is `/home2/<user>`; `public_html` is the docroot for `emecbd.com`, `www` and `mail`.
- TLS: a wildcard AutoSSL certificate (`*.emecbd.com` + `emecbd.com`) is installed and renews automatically.
- Canonical host: `https://www.emecbd.com` (as on the WordPress site; `site.url` in `src/content/site.ts`)
- Redirects, 410s, HTTPS and apex→www live in `public/.htaccess`, which the build copies into `out/`.

## Build

```bash
npm run package     # next build + zip of out/ -> emec-site.zip (gitignored)
```

`emec-site.zip` is the only thing that gets uploaded.

## DNS snapshot (2026-11-03, public lookup; do not change)

| Name | Type | Value |
|---|---|---|
| emecbd.com | NS | ns6553.hostgator.com, ns6554.hostgator.com |
| emecbd.com | A | 192.254.236.35 |
| www | CNAME | emecbd.com |
| emecbd.com | MX 0 | mail.emecbd.com |
| mail | A | 192.254.236.35 |
| autodiscover | A | 192.254.236.35 |
| emecbd.com | TXT | `v=spf1 a mx include:websitewelcome.com ~all` |
| default._domainkey | TXT | DKIM1 RSA key |
| _dmarc | none | no DMARC record |

SOA default TTL 86400. Email is hosted on the same cPanel account (MX → mail.emecbd.com).
Compare against Zone Editor → Manage → screenshot before cutover.

## Account layout (checked 2026-11-03)

**Leave alone, not part of this job:**
- Subdomains `training`, `stagingtraining`, `biodent`, `biodent1` and `dentalapp`. Each has
  its own folder in the home directory, outside `public_html`, plus its own databases
  (`…_wp889`, `…_wp964`, `…_biodent`, `…_biodent1`).
- 5 mailboxes on this account (cPanel → Email Accounts), including `info@`.

**`public_html` contents:**

| Item | Action at cutover |
|---|---|
| `.well-known/` (ACME challenge) | **keep** |
| `cgi-bin/` (empty) | **keep** |
| `wp-admin/`, `wp-content/`, `wp-includes/`, `test/` (empty) | move to `wp-old` |
| `index.php`, `license.txt`, `readme.html`, `xmlrpc.php`, all `wp-*.php`, `wp-config.php` | move to `wp-old` |
| `wp-admin.zip` (45 MB), `error_log` | move to `wp-old` |
| `.htaccess`, `.htaccess.lock-*`, `.htaccess.phpupgrader.*` | move to `wp-old` |

The main site's WordPress database is **`…_wp495`** (table prefix `wp74_`). It is the only
database that belongs to this site.

Disk: about 15.4 GB of 50 GB used. The home directory already holds a 6.6 GB `.cpanel.zip`
and `softaculous_backups/` / `wpfm-private-backups/` (older backups, origin unknown).

## 1. Pre-cutover (no risk, nothing live changes)

- [ ] **Site backup (what rollback relies on):**
      File Manager → select `public_html` → *Compress* → Zip → `~/public_html-wp-2026-11.zip`, then download it.
      cPanel → Backup → *Download a MySQL Database Backup* → `…_wp495`.
- [ ] **Full account backup (belt and braces):** cPanel → Backup → *Download a Full Account Backup*.
      It will be large, because it includes the existing 6.6 GB `.cpanel.zip`. Download it, then delete
      the archive from the server.
- [ ] **DNS:** Zone Editor → `emecbd.com` → Manage, screenshot every record; check it matches the table above.
- [ ] **Email baseline:** cPanel → Email Accounts, note the mailboxes. Send one mail in and one out of
      a mailbox and confirm both arrive.
- [ ] TTL: no need to lower it, since no DNS record changes.

## 2. Stage and preview (adds one subdomain, nothing existing changes)

1. File Manager → home directory (`~`) → create folder `emec-new`.
2. Upload `emec-site.zip` into `emec-new`, then Extract it there and delete the zip.
   Turn on *Settings → Show Hidden Files* and confirm `.htaccess` is present.
3. cPanel → Domains → Create a new domain: `preview.emecbd.com`, document root `~/emec-new`.
   This adds an A record for `preview` only.
4. HTTPS should already work, because the wildcard certificate covers `preview.emecbd.com`. If the browser
   warns, use SSL/TLS Status → *Run AutoSSL*.
5. Test on `https://preview.emecbd.com`:
   - all pages, nav, mobile menu, globe, project filter, case-study pages, 404 page
   - `/service/` → `/services/`, `/projects-2/` → `/projects/`, `/blog/` → `/`
   - `/2016/10/25/anything/`, `/tag/design/`, `/wp-login.php` → 410
   - the `.htaccess` apex→www rule only fires on `emecbd.com`, so preview isn't redirected.

## 3. Cutover (the only step visitors see; about 1 minute of downtime)

1. File Manager → home directory → create folder `wp-old`.
2. Open `public_html`, show hidden files, and select **everything except `.well-known` and `cgi-bin`**
   (see *Account layout*). *Move* the selection to `~/wp-old`.
3. Open `emec-new`, select all (including `.htaccess`), *Move* to `~/public_html`.
4. Verify immediately (from any terminal):

```bash
curl -sI http://emecbd.com/           # 301 -> https://emecbd.com/
curl -sI https://emecbd.com/          # 301 -> https://www.emecbd.com/
curl -sI https://www.emecbd.com/      # 200
curl -sI https://www.emecbd.com/service/            # 301 -> /services/
curl -sI https://www.emecbd.com/2016/10/25/x/       # 410
curl -sI https://www.emecbd.com/nope/               # 404 (custom page)
curl -s  https://www.emecbd.com/sitemap.xml | head
nslookup -type=MX emecbd.com 8.8.8.8                # still mail.emecbd.com
```

5. In a private window, open `https://www.emecbd.com` and check that the padlock is valid.
   Then send a test from the contact form (the first submission triggers FormSubmit's activation email).
6. Send and receive one email on a company mailbox, and check webmail at `https://mail.emecbd.com:2096`.

## Rollback (seconds, no DNS involved)

1. `public_html`: select the new site's files (`index.html`, `_next`, page folders, `.htaccess`, …) → Move to `emec-new`.
2. `wp-old`: select all → Move to `public_html`.

## 4. Post-launch

- [ ] **Google Search Console:** add a *Domain* property (DNS TXT record, adds one record and
      doesn't touch mail) or a *URL prefix* property for `https://www.emecbd.com/` with the HTML-file method
      (put the file in `public/` and redeploy). Submit `https://www.emecbd.com/sitemap.xml`.
- [ ] Check *Pages → Not indexed* after 1–2 weeks: the old demo posts should drop out as 410s.
- [ ] Remove the `preview.emecbd.com` subdomain and the empty `emec-new` folder.
- [ ] **Delete WordPress after about 30 days** of stable running, and only once the full backup is downloaded
      and opens: delete `wp-old`, then **only** the `…_wp495` database and its `…_wp495` user (cPanel → MySQL Databases). The other databases belong to the subdomains.
      Also delete the backup archive from the server's home directory once it's downloaded.
- [ ] Optional, separate from this job: add a DMARC record (`_dmarc` TXT `v=DMARC1; p=none; rua=mailto:…`)
      to start monitoring mail spoofing.

## Redeploying later

`npm run package` → upload the zip to a fresh `emec-new` → extract → swap as in step 3,
moving the old build to a dated folder. Or, if no files were removed, extract straight over
`public_html` (overwrite). Stale `_next/static` chunks are harmless.

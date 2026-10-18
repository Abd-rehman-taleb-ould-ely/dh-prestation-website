# D.H. PRESTATION, S.L. — corporate website

Static, multilingual (ES / EN / FR) B2B website for **D.H. PRESTATION, S.L.**, prepared for publication at **https://dhp-solar.site**.

The site presents the company's photovoltaic structure and tracker assembly, module installation, electrical installation and subcontracting services to EPC contractors, developers and construction companies. WhatsApp is the main conversion channel. There is no backend, database, CMS, form, cookie, tracker or third-party script.

> **Not ready to publish yet.** Work through the [pre-publication checklist](#pre-publication-checklist) first. It covers company facts, imagery, legal texts and domain setup.

---

## Contents

- [Technology](#technology)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Images](#images)
- [Brand assets](#brand-assets)
- [Quality checks](#quality-checks)
- [Deployment and the dhp-solar.site domain](#deployment-and-the-dhp-solarsite-domain)
- [Privacy and external services](#privacy-and-external-services)
- [Pre-publication checklist](#pre-publication-checklist)

---

## Technology

| Choice                                            | Why                                                                                                                                                                                                                                                              |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Astro 7](https://astro.build)**, static output | It renders every page to plain HTML at build time and ships almost no JavaScript (under 2 KB, for the mobile menu and scroll effects). It has built-in responsive image optimisation (AVIF/WebP). The output is a `dist/` folder that any static host can serve. |
| **TypeScript**                                    | The translation files share one `Dictionary` type, so a missing translation fails the type check.                                                                                                                                                                |
| **Plain CSS** (design tokens + component styles)  | No CSS framework. Styles are scoped to each component.                                                                                                                                                                                                           |
| **Self-hosted fonts** (Fontsource)                | Archivo (variable) and IBM Plex Mono are bundled at build time. Google Fonts is not called at runtime.                                                                                                                                                           |
| **Vitest + Playwright + axe-core** (dev only)     | Unit tests for content and links, end-to-end tests on the production build, and automated WCAG 2.1 AA checks.                                                                                                                                                    |

Runtime dependencies are limited to Astro, `sharp` for image processing at build time, and the two font packages. Nothing in `node_modules` reaches the visitor except the fonts.

## Getting started

Requirements: **Node.js ≥ 22.22** and npm.

```bash
npm install          # install dependencies
npm run dev          # development server at http://localhost:4321
npm run build        # production build into dist/
npm run preview      # serve dist/ locally exactly as a static host would
```

| Script             | What it does                                                                         |
| ------------------ | ------------------------------------------------------------------------------------ |
| `npm run dev`      | Development server with hot reload                                                   |
| `npm run build`    | Static production build in `dist/`                                                   |
| `npm run preview`  | Serves the built site                                                                |
| `npm run check`    | TypeScript and Astro diagnostics                                                     |
| `npm run format`   | Formats everything with Prettier (`format:check` only checks)                        |
| `npm test`         | Unit tests (Vitest)                                                                  |
| `npm run test:e2e` | End-to-end and accessibility tests (Playwright). **Run `npm run build` first.**      |
| `npm run verify`   | Format check → type check → unit tests → build → e2e: the full pre-deploy gate       |
| `npm run brand`    | Regenerates logo files, favicons and the social image from `scripts/build-brand.mjs` |

Playwright needs a Chromium browser. If it isn't installed on your machine, run `npx playwright install chromium` once.

## Project structure

```
src/
  config/
    company.ts          ← company facts (single source of truth, incl. unconfirmed items)
    site.ts             ← domain, legal-draft flag, illustrative-image notice
  i18n/
    types.ts            ← Dictionary type shared by all languages
    locales/es.ts       ← Spanish (default)
    locales/en.ts       ← English
    locales/fr.ts       ← French
    index.ts            ← locale helpers and the localised route map
  data/
    services.ts         ← service order, tier (core / secondary) and image
    images.ts           ← image registry (file names and focal points)
  components/
    sections/           ← Hero, Services, Company, Capabilities, Commitments, Contact
    Header, Footer, ServiceCard, LanguageSwitcher, WhatsAppFloat, Logo, Icon, Photo, …
  layouts/BaseLayout.astro   ← <head> metadata, hreflang, Open Graph, JSON-LD
  lib/                  ← WhatsApp / tel / mailto helpers, structured data
  scripts/              ← tiny client scripts (menu, reveal on scroll)
  styles/global.css     ← design tokens and base styles
  pages/                ← one file per URL (see below), robots.txt, sitemap.xml
  assets/brand/         ← generated inline logo SVGs
  assets/images/        ← photographs (optimised at build time)
public/                 ← favicons, logo files, og-image.jpg, manifest, _headers
scripts/build-brand.mjs ← logo / favicon / social-image generator
tests/unit, tests/e2e   ← Vitest and Playwright suites
```

### URLs

| Page           | Spanish (default) | English             | French                  |
| -------------- | ----------------- | ------------------- | ----------------------- |
| Home           | `/`               | `/en/`              | `/fr/`                  |
| Legal notice   | `/aviso-legal/`   | `/en/legal-notice/` | `/fr/mentions-legales/` |
| Privacy policy | `/privacidad/`    | `/en/privacy/`      | `/fr/confidentialite/`  |

Each page has a canonical URL, `hreflang` alternates for all three languages, and `x-default` pointing to Spanish. The same alternates appear in `/sitemap.xml`. These URLs only resolve publicly once the site is deployed and the domain is configured. Paths are defined once in `ROUTES` (`src/i18n/index.ts`).

## Editing content

- **Company details** (phones, emails, address, NIF): `src/config/company.ts`. Every page, the legal texts and the structured data read from this one file.
- **Text in every language**: `src/i18n/locales/{es,en,fr}.ts`. Keep the three files in step. `npm run check` and `npm test` fail if a key is missing, empty, or copied untranslated.
- **WhatsApp messages**: `contact.whatsappMessage` holds the general message, and `services.items.<id>.whatsapp` holds one message per service. Links are built by `src/lib/whatsapp.ts` as `https://wa.me/34687032956?text=<URL-encoded message>`. WhatsApp opens on the visitor's device with the text prefilled, and the visitor can edit it before sending. The site never sends anything itself.
- **Order or emphasis of services**: `src/data/services.ts` (`tier: 'core'` services lead the page).
- **Workforce figures** (≈20–25 professionals, own site manager): set `confirmed: true` in `company.team` only after written confirmation. While `confirmed` is `false` they are not rendered, and a test enforces that.
- **Legal draft banner**: `site.legalDraft` in `src/config/site.ts`.

## Images

> **Current images are original 3D-rendered placeholders created for this project.** They are not photographs of D.H. PRESTATION work, and the footer says so (`site.illustrativeImages`). They carry no third-party licence obligations. Stock-photo libraries were not reachable from the build environment, so no stock photographs were downloaded.

| Slot                     | File (in `src/assets/images/`) | Size / ratio used                                           |
| ------------------------ | ------------------------------ | ----------------------------------------------------------- |
| Hero                     | `hero-solar-plant.jpg`         | ≥ 2560 × 1440, 16:9, keep the left side calm (text overlay) |
| Structures               | `service-structures.jpg`       | ≥ 1600 × 1067 (3:2)                                         |
| Trackers                 | `service-trackers.jpg`         | ≥ 1600 × 1067                                               |
| Modules                  | `service-modules.jpg`          | ≥ 1600 × 1067                                               |
| Electrical installations | `service-electrical.jpg`       | ≥ 1600 × 1067                                               |
| Subcontracting           | `service-subcontracting.jpg`   | ≥ 1600 × 1067                                               |
| Construction             | `service-construction.jpg`     | ≥ 1600 × 1067                                               |
| Machinery & equipment    | `service-machinery.jpg`        | ≥ 1600 × 1067                                               |
| Company section          | `company-site.jpg`             | ≥ 1600 × 1200 (4:3)                                         |

**To replace an image with a real company photograph:**

1. Export it as a high-quality JPG (or PNG/WebP/AVIF) at least the size above.
2. Save it in `src/assets/images/` with the **same base name**. If the extension changes, delete the old file.
3. Update its alt text in all three locale files under `images.<slot>`. Describe what the photo shows.
4. If the subject isn't centred, set a focal point in `src/data/images.ts` (e.g. `position: '30% 60%'`).
5. When _every_ image shows genuine company work, set `illustrativeImages: false` in `src/config/site.ts` to remove the footer notice.
6. Run `npm run brand` if you replaced the hero, so the social-sharing image (`public/og-image.jpg`) uses it.

Astro generates resized AVIF/WebP versions automatically. The hero is preloaded and every other image is lazy-loaded.

**Licensed stock photography:** if you use stock photos (Unsplash, Pexels, Adobe Stock, etc.), keep each photo's licence and source URL on record. Do not caption or describe them as company projects, and keep `illustrativeImages: true`. Do not hot-link remote image URLs. Always download the file into `src/assets/images/`.

## Brand assets

The logo is an original mark: three photovoltaic module cells tilted like a tracker row, carried by an "H" frame of two driven posts and a cross-beam. It pairs with an Archivo ExtraBold wordmark converted to outlines. Brand colours: navy `#0B1F33`, solar green `#3DA35D` (`#4CB86B` on dark backgrounds).

`npm run brand` regenerates all brand files from `scripts/build-brand.mjs`:

| File                                                                      | Use                                           |
| ------------------------------------------------------------------------- | --------------------------------------------- |
| `public/brand/dhp-logo.svg` / `.png`                                      | Logo on light backgrounds                     |
| `public/brand/dhp-logo-white.svg` / `.png`                                | Logo on dark backgrounds                      |
| `public/brand/dhp-mark.svg`, `dhp-mark-white.svg`                         | Symbol only                                   |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-*.png` | Browser and device icons                      |
| `public/og-image.jpg`                                                     | 1200×630 social sharing image                 |
| `src/assets/brand/logo.svg`, `mark.svg`                                   | Inline versions used by the site (CSS colour) |

**Brand kit for printers, partners and social media** (in `brand/`):

- `DHP-Brand-Identity-Guidelines.pdf`: logo, versions, clear space, incorrect use, colours (HEX/RGB/CMYK), typography, imagery and applications.
- `DHP-Logo-Package.zip`: the `brand/logo/` folder zipped. It contains every logo and symbol variant (colour, white, black, app icon) as SVG, vector PDF and high-resolution transparent PNG.

Regenerate both with `npm run brand && npm run brand:guide`, then re-zip `brand/logo/`.

## Quality checks

`npm run verify` runs everything below in order. The test suites cover:

- **Unit (Vitest):** the three languages have identical key structures, no empty strings, and no untranslated copies. Every service has a title, description and its own WhatsApp message. Marketing copy has no certification, guarantee, statistics or testimonial claims. WhatsApp URLs use the correct number and URL-encoding round-trips exactly. `tel:`/`mailto:` links and address formatting are correct. Unconfirmed workforce facts stay hidden.
- **End-to-end (Playwright, desktop + mobile, run on the production build):** each language renders translated headings, title, description, canonical, hreflang and Open Graph locale. JSON-LD parses and contains only supplied facts. All images load and have alt text. There are no console errors or failed requests. Phone, email and WhatsApp destinations are correct, and each service sends its own message. There are no forms. The language switcher changes the content and keeps the visitor on the equivalent page. Anchors resolve. The mobile menu opens, closes with Escape, closes when a link is clicked, and returns focus. The skip link works. Reduced motion is respected. There is no horizontal overflow at 320/375/768 px. Legal pages exist in all languages, every internal link returns 200, and robots/sitemap/manifest/icons are served.
- **Accessibility:** axe-core WCAG 2.1 A/AA scan of each home page (no violations at time of writing). There are also visible focus styles, a skip link, semantic landmarks and headings, `aria-current` on the active language, and a keyboard-operable menu with focus containment.

Manual checks are still recommended before launch: a screen reader pass (VoiceOver/NVDA), real iOS/Android devices, and confirming that WhatsApp opens correctly on phones and on WhatsApp Web.

## Deployment and the dhp-solar.site domain

The build output (`dist/`) is a folder of static files. Any static host works. Build settings are the same everywhere:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 22 (set `NODE_VERSION=22` if the host asks)

Security headers are pre-configured in `public/_headers` (Netlify, Cloudflare Pages) and `vercel.json` (Vercel). They set a strict Content-Security-Policy, HSTS, `X-Frame-Options`, `Referrer-Policy` and long-term caching for hashed assets. On other hosts, configure the same headers there.

### Option A: Cloudflare Pages / Netlify / Vercel (recommended)

1. Push this repository to GitHub and import it into the host. Use the build settings above.
2. Check the generated preview URL (`*.pages.dev`, `*.netlify.app`, `*.vercel.app`).
3. In the host's **Domains** settings, add `dhp-solar.site` and `www.dhp-solar.site`. Make `dhp-solar.site` the primary domain and redirect `www` to it, because canonical URLs use `https://dhp-solar.site`.
4. At the registrar or DNS provider for `dhp-solar.site`, create the records the host shows you. Typically these are:
   - apex `dhp-solar.site`: an `A`/`ALIAS`/`ANAME` record (or CNAME flattening) to the host's target,
   - `www`: a `CNAME` to the host's target.
     Alternatively, delegate the whole zone's nameservers to the host (e.g. Cloudflare).
5. HTTPS: all three hosts issue and renew a free Let's Encrypt certificate automatically once DNS resolves. Enable **"Force HTTPS"** or **"Always use HTTPS"**.
6. **Email:** the site lists `info@dhp-solar.site` and `gerencia@dhp-solar.site`. Create these mailboxes with an email provider (e.g. the registrar's mail service, Google Workspace or Microsoft 365) and add the `MX`, SPF and DKIM records it gives you. Once email works, don't remove those records when changing the website's DNS.

### Option B: traditional hosting (Apache/Nginx, e.g. a Spanish hosting plan)

Upload the **contents** of `dist/` to the web root (e.g. `public_html`). Then enable HTTPS with the provider's free certificate and add the headers from `public/_headers` to the server configuration. On Apache, `ErrorDocument 404 /404.html` enables the custom 404 page.

### After going live

- Open `https://dhp-solar.site/`, `/en/` and `/fr/` and check that the certificate is valid.
- Register the domain in **Google Search Console** and **Bing Webmaster Tools**, and submit `https://dhp-solar.site/sitemap.xml`.
- Test social previews with a link-preview tool (LinkedIn Post Inspector, etc.).
- If the domain ever changes, edit `url` in `src/config/site.ts` and rebuild.

## Privacy and external services

- No cookies, `localStorage`, analytics, ads, maps, embeds or third-party scripts. Fonts and images are served from the same domain.
- **WhatsApp** (`wa.me`, operated by WhatsApp Ireland Ltd / Meta) is only contacted when a visitor clicks a WhatsApp link. That is a normal link to an external service, and the privacy policy draft explains it.
- `tel:` and `mailto:` links open the visitor's own phone or email app.
- The hosting provider will typically keep technical access logs (IP addresses). Name the provider in the privacy policy once chosen.
- If analytics or any other external service is added later, update the privacy policy, the CSP in `_headers`/`vercel.json`, and add a consent mechanism if it uses cookies or similar technologies.

## Pre-publication checklist

Everything below must be confirmed by D.H. PRESTATION, S.L. (and a legal adviser where noted) before the site goes public. Items marked `TODO(confirm)` / `TODO(legal)` in the code point to the exact places.

**Company information**

- [ ] Legal name, NIF `B27656149` and registered address are correct as displayed.
- [ ] Phone numbers +34 624 817 846 and +34 672 546 266 should be public, and are answered under the company name.
- [ ] WhatsApp +34 687 032 956 is an active (preferably WhatsApp Business) account that is monitored.
- [ ] Mailboxes `info@dhp-solar.site` and `gerencia@dhp-solar.site` are created and receive mail (MX records for `dhp-solar.site` are configured). Send a test message to each before launch.
- [ ] Workforce figures: approximately **20–25 professionals** and an **own site manager**. Confirm in writing, then set `confirmed: true` in `src/config/company.ts`. Both are hidden until then.
- [ ] Mercantile Registry details (Registro Mercantil de Sevilla: tomo, folio, hoja, inscripción) are filled in `company.registry`. LSSI-CE art. 10 requires them in the legal notice.
- [ ] Service descriptions match the work the company actually performs and wants to offer. In particular, confirm the scope of "Instalaciones eléctricas" and whether it includes any regulated work, and the real activity level of construction/real estate development and machinery trading.

**Imagery**

- [ ] Replace the rendered placeholders with genuine company photographs, or with licensed stock images whose licence terms are on file.
- [ ] Workers in real photos have consented to publication, and no client logos, plant names or identifiable third-party sites appear without permission.
- [ ] Keep the "illustrative images" footer notice while any image is not genuine company work.

**Legal (review by a lawyer or data-protection adviser)**

- [ ] Aviso legal / Legal notice / Mentions légales: drafts written without sight of the company's deed of incorporation.
- [ ] Política de privacidad / Privacy policy / Politique de confidentialité: check the controller details, legal bases, retention, processors (hosting, email provider) and the WhatsApp section.
- [ ] Confirm that no cookie banner is needed (the site sets no cookies). Re-assess if anything is added.
- [ ] The Spanish legal texts are the reference version. Check the EN/FR translations, then set `legalDraft: false` in `src/config/site.ts` and update the "last updated" date in `src/components/LegalPage.astro`.

**Copy and translations**

- [ ] A native speaker reviews the English and French copy, including the prefilled WhatsApp messages.
- [ ] The tone, positioning and audience descriptions are approved by the company.

**Domain and hosting**

- [ ] Ownership of `dhp-solar.site` and access to its DNS are confirmed.
- [ ] Hosting provider is chosen and the deployment is configured (see above).
- [ ] HTTPS is active, `www` redirects to the apex domain, and email DNS records are untouched.
- [ ] Sitemap is submitted to Search Console and Bing Webmaster Tools.

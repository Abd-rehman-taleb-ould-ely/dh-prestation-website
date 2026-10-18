/**
 * Builds the brand identity guidelines PDF and vector PDF versions of the logo.
 *
 *   npm run brand        (generates the logo files first)
 *   npm run brand:guide
 *
 * Outputs
 *   brand/DHP-Brand-Identity-Guidelines.pdf
 *   brand/logo/pdf/*.pdf
 *
 * The document is laid out in HTML and printed with Playwright's Chromium, using the same
 * self-hosted fonts and logo files as the website.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const root = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const url = (p) => pathToFileURL(path.join(root, p)).href;
const svg = (name) => read(`brand/logo/svg/${name}.svg`).replace(/<title>.*?<\/title>/, '');

const C = {
  navy: '#0B1F33',
  navyDeep: '#071423',
  green: '#3DA35D',
  greenOnDark: '#4CB86B',
  greenText: '#1E7A3F',
  stone: '#F4F5F2',
  line: '#D6DAD4',
  ink: '#0E1B28',
  grey: '#44525F',
};

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Naive RGB → CMYK conversion, for reference only (to be matched by the printer). */
function cmyk(hex) {
  const [r, g, b] = rgb(hex).map((v) => v / 255);
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return [0, 0, 0, 100];
  return [(1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k].map((v) =>
    Math.round(v * 100),
  );
}

const palette = [
  {
    name: 'Structural Navy',
    hex: C.navy,
    role: 'Primary colour. Logo, headings, dark backgrounds.',
  },
  { name: 'Deep Navy', hex: C.navyDeep, role: 'Header, footer and overlays on photography.' },
  { name: 'Solar Green', hex: C.green, role: 'Accent. Logo modules, highlights, key data.' },
  { name: 'Solar Green Light', hex: C.greenOnDark, role: 'Accent on navy backgrounds only.' },
  { name: 'Action Green', hex: C.greenText, role: 'Buttons and green text on white (accessible).' },
  { name: 'Stone', hex: C.stone, role: 'Light section backgrounds and panels.' },
  { name: 'Ink', hex: C.ink, role: 'Body text on light backgrounds.' },
  { name: 'Steel Grey', hex: C.grey, role: 'Secondary text, captions, fine lines.' },
];

const fontCss = `
@font-face { font-family: 'Archivo Variable'; font-weight: 100 900; font-stretch: 62% 125%;
  src: url('${url('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'IBM Plex Mono'; font-weight: 500;
  src: url('${url('node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2')}') format('woff2'); }
`;

let pageNo = 0;
const page = (section, title, body, { dark = false, cls = '' } = {}) => {
  pageNo += 1;
  return `<section class="page ${dark ? 'dark' : ''} ${cls}">
    <header class="ph"><span class="mono">${section}</span><span class="mono">D.H. PRESTATION, S.L.</span></header>
    ${title ? `<h2>${title}</h2>` : ''}
    ${body}
    <footer class="pf"><span class="mono">Brand identity guidelines · v1.0</span><span class="mono">${String(pageNo).padStart(2, '0')}</span></footer>
  </section>`;
};

const swatch = (p) => {
  const [r, g, b] = rgb(p.hex);
  const [c, m, y, k] = cmyk(p.hex);
  const light = ['#F4F5F2'].includes(p.hex);
  return `<div class="swatch">
    <div class="chip" style="background:${p.hex};${light ? `box-shadow: inset 0 0 0 1px ${C.line};` : ''}"></div>
    <p class="sw-name">${p.name}</p>
    <p class="mono sw-val">HEX ${p.hex}<br>RGB ${r} ${g} ${b}<br>CMYK ${c} ${m} ${y} ${k}</p>
    <p class="sw-role">${p.role}</p>
  </div>`;
};

const cross = `<svg class="x" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#B42318"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2.2"/></svg>`;
const check = `<svg class="x" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="${C.greenText}"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.2" fill="none"/></svg>`;

const logoColor = svg('dhp-logo-color');
const logoWhite = svg('dhp-logo-white');
const logoBlack = svg('dhp-logo-black');
const symColor = svg('dhp-symbol-color');
const symWhite = svg('dhp-symbol-white');
const symBlack = svg('dhp-symbol-black');
const appIcon = svg('dhp-app-icon');

const pages = [];

// Cover
pages.push(`<section class="page cover dark">
  <img class="cover-img" src="${url('src/assets/images/hero-solar-plant.jpg')}" alt="">
  <div class="cover-shade"></div>
  <div class="cover-body">
    <div class="cover-logo">${logoWhite}</div>
    <h1>Brand identity<br>guidelines</h1>
    <p class="mono cover-sub">Manual de identidad visual · Version 1.0 · October 2026</p>
  </div>
</section>`);

// Introduction
pages.push(
  page(
    '01 · Introduction',
    'A brand built like a structure.',
    `<div class="cols">
      <div>
        <p class="lead">D.H. PRESTATION, S.L. is an execution partner for photovoltaic, electrical and construction projects. The identity reflects what the company delivers on site: organised teams, precise assembly work and reliable coordination with the main contractor.</p>
        <p>These guidelines describe how to use the logo, colours, typography and imagery so that every touchpoint, from the website to a business card or a site vest, looks consistent and professional.</p>
      </div>
      <div>
        <h3>Brand character</h3>
        <ul class="traits">
          <li><b>Precise.</b> Clean geometry, straight lines, deliberate spacing.</li>
          <li><b>Reliable.</b> A calm, solid palette led by structural navy.</li>
          <li><b>Renewable.</b> Solar green used as a focused accent, never as decoration.</li>
          <li><b>Direct.</b> Clear language, strong typography, no unnecessary effects.</li>
        </ul>
        <h3>Contents</h3>
        <ol class="toc mono">
          <li>02 · Logo</li><li>03 · Logo versions</li><li>04 · Clear space and minimum size</li>
          <li>05 · Incorrect use</li><li>06 · Colour</li><li>07 · Typography</li>
          <li>08 · Imagery and graphic elements</li><li>09 · Applications</li><li>10 · Logo files</li>
        </ol>
      </div>
    </div>`,
  ),
);

// Logo
pages.push(
  page(
    '02 · Logo',
    'The logo.',
    `<div class="hero-logo">${logoColor}</div>
    <div class="cols three">
      <div><h3>The symbol</h3><p>Three photovoltaic module cells, tilted like a tracker row, rest on an "H" frame made of two driven posts and a cross-beam: the company initial drawn as a mounting structure.</p></div>
      <div><h3>The wordmark</h3><p>"D.H. PRESTATION" is set in Archivo ExtraBold with slightly open letter-spacing for legibility at small sizes. "S.L." follows in a lighter weight and tone.</p></div>
      <div><h3>The lockup</h3><p>Symbol and wordmark always appear together in this fixed arrangement. Never redraw, re-space or re-type the logo: always use the supplied files.</p></div>
    </div>`,
  ),
);

// Versions
pages.push(
  page(
    '03 · Logo versions',
    'Logo versions.',
    `<div class="grid2">
      <figure class="tile light">${logoColor}<figcaption class="mono">Primary · colour on white</figcaption></figure>
      <figure class="tile navy">${logoWhite}<figcaption class="mono">Reversed · white on navy</figcaption></figure>
      <figure class="tile stone">${logoBlack}<figcaption class="mono">Monochrome · black (fax, stamps, engraving)</figcaption></figure>
      <figure class="tile row">
        <div class="sym light">${symColor}</div><div class="sym navy">${symWhite}</div><div class="sym stone">${symBlack}</div>
        <div class="sym icon">${appIcon}</div>
        <figcaption class="mono">Symbol only · favicon, app icon, social avatar, small spaces</figcaption>
      </figure>
    </div>
    <p class="note">Use the colour version whenever possible. Use the reversed version on navy or dark photography, and the black version only where colour printing is not available.</p>`,
  ),
);

// Clear space / minimum size
pages.push(
  page(
    '04 · Clear space and minimum size',
    'Clear space and minimum size.',
    `<div class="cols">
      <div class="clear-demo">
        <div class="clear-box">${logoColor}
          <span class="mx mx-top"></span><span class="mx-l mono" style="top:1.5mm;left:calc(50% + 2mm)">x</span>
          <span class="mx mx-left"></span><span class="mx-l mono" style="left:2.5mm;top:calc(50% - 6mm)">x</span>
        </div>
      </div>
      <div>
        <h3>Clear space</h3>
        <p>Keep a free area around the logo equal to <b>x</b>, the height of the "H" symbol, on every side. No text, edges or other graphics should enter this space.</p>
        <h3>Minimum size</h3>
        <div class="min-row">
          <div><div class="min-logo" style="width:30mm">${logoColor}</div><p class="mono">Full logo · 30 mm / 120 px wide</p></div>
          <div><div class="min-sym" style="width:6mm">${symColor}</div><p class="mono">Symbol · 6 mm / 16 px</p></div>
        </div>
        <p>Below these sizes, use the symbol alone. For favicons and app icons use the supplied navy icon tile.</p>
      </div>
    </div>`,
  ),
);

// Misuse
const misuse = [
  [`<div style="transform: scaleX(1.45)">${logoColor}</div>`, 'Do not stretch or distort.'],
  [`<div style="transform: rotate(-12deg)">${logoColor}</div>`, 'Do not rotate.'],
  [
    logoColor.replaceAll(C.navy, '#C2410C').replaceAll(C.green, '#7C3AED'),
    'Do not change the colours.',
  ],
  [
    `<div style="filter: drop-shadow(4px 6px 3px rgba(0,0,0,.55))">${logoColor}</div>`,
    'Do not add shadows or effects.',
  ],
  [`<div class="busy">${logoColor}</div>`, 'Do not place on busy or low-contrast backgrounds.'],
  [
    `<div class="fake-word"><span class="fake-sym">${symColor}</span><span>D.H. Prestation</span></div>`,
    'Do not retype or change the wordmark.',
  ],
];
pages.push(
  page(
    '05 · Incorrect use',
    'Incorrect use.',
    `<div class="grid3">${misuse
      .map(
        ([art, label]) =>
          `<figure class="mis"><div class="mis-art">${art}</div>${cross}<figcaption>${label}</figcaption></figure>`,
      )
      .join('')}</div>`,
  ),
);

// Colour
pages.push(
  page(
    '06 · Colour',
    'Colour palette.',
    `<div class="swatches">${palette.map(swatch).join('')}</div>
    <div class="ratio"><span style="flex:55;background:${C.navy}"></span><span style="flex:28;background:${C.stone};box-shadow: inset 0 0 0 1px ${C.line}"></span><span style="flex:10;background:#fff;box-shadow: inset 0 0 0 1px ${C.line}"></span><span style="flex:7;background:${C.green}"></span></div>
    <p class="note">Proportion: navy and neutrals carry the identity; green stays a small, purposeful accent. CMYK values are approximate conversions for reference: ask the printer to match the HEX values or an equivalent Pantone swatch.</p>`,
  ),
);

// Typography
pages.push(
  page(
    '07 · Typography',
    'Typography.',
    `<div class="cols">
      <div>
        <p class="mono t-label">Primary typeface · Archivo</p>
        <p class="spec-big">Aa</p>
        <p class="spec-line" style="font-weight:700;font-stretch:112%">Montaje de seguidores solares</p>
        <p class="spec-line" style="font-weight:600">Instalaciones eléctricas y subcontratación</p>
        <p class="spec-line" style="font-weight:400">Equipos organizados y coordinación en obra.</p>
        <p class="note">Open-source (SIL Open Font License), free for print and web. Headings use Bold at semi-expanded width (112%); body text uses Regular at normal width.</p>
      </div>
      <div>
        <p class="mono t-label">Secondary typeface · IBM Plex Mono</p>
        <p class="spec-big mono" style="font-size:72pt">01</p>
        <p class="mono spec-mono">SERVICIOS · CAPACIDADES · CONTACTO</p>
        <p class="note">Used sparingly, in capitals with wide letter-spacing, for labels, numbering and technical details. Also open-source (SIL OFL).</p>
        <h3>Hierarchy</h3>
        <table class="hier">
          <tr><td class="mono">Headline</td><td>Archivo Bold, 112% width, tight line spacing</td></tr>
          <tr><td class="mono">Subheading</td><td>Archivo Semibold</td></tr>
          <tr><td class="mono">Body</td><td>Archivo Regular, 1.6 line spacing</td></tr>
          <tr><td class="mono">Label</td><td>IBM Plex Mono Medium, capitals, wide tracking</td></tr>
        </table>
        <p class="note">Fallback when the brand fonts are unavailable (e.g. Word, email): Arial.</p>
      </div>
    </div>`,
  ),
);

// Imagery
pages.push(
  page(
    '08 · Imagery and graphic elements',
    'Imagery and graphic elements.',
    `<div class="cols">
      <div>
        <div class="img-wrap"><img src="${url('src/assets/images/service-trackers.jpg')}" alt=""><div class="img-lines"></div></div>
      </div>
      <div>
        <h3>Photography</h3>
        <ul class="dos">
          <li>${check}<span>Real worksites: structures, trackers, modules, electrical work and organised teams.</span></li>
          <li>${check}<span>Natural daylight, wide framing, clean horizons and a calm, slightly warm grade.</span></li>
          <li>${check}<span>Visible safety equipment and tidy work areas.</span></li>
          <li>${cross}<span>Never present stock or illustrative images as completed company projects.</span></li>
          <li>${cross}<span>No clip-art icons, heavy filters or decorative gradients.</span></li>
        </ul>
        <h3>Graphic elements</h3>
        <p>Thin structural grid lines over navy areas, numbered sequences (01, 02, 03) in the monospaced typeface, and solid square nodes in solar green. Corners stay square; avoid rounded cards and drop shadows.</p>
      </div>
    </div>`,
  ),
);

// Applications
pages.push(
  page(
    '09 · Applications',
    'Applications.',
    `<div class="apps">
      <div class="card-pair">
        <div class="bcard front">${logoWhite}</div>
        <div class="bcard back">
          <div class="bc-sym">${symColor}</div>
          <p class="bc-name">Name Surname</p><p class="bc-role mono">Site Manager</p>
          <p class="bc-info">+34 624 817 846<br>info@dhp-solar.site<br>dhp-solar.site</p>
        </div>
        <p class="mono cap">Business card · 85 × 55 mm</p>
      </div>
      <div class="web">
        <div class="web-bar"><div class="web-logo">${logoWhite}</div><span>Servicios</span><span>Empresa</span><span>Capacidades</span><span>Contacto</span><span class="web-btn">WhatsApp</span></div>
        <div class="web-hero" style="background-image:linear-gradient(90deg, rgba(7,20,35,.92), rgba(7,20,35,.2)), url('${url('src/assets/images/hero-solar-plant.jpg')}')">
          <p class="mono">MONTAJE FOTOVOLTAICO · SUBCONTRATACIÓN</p>
          <p class="web-h">Soluciones de ejecución para proyectos solares y de construcción.</p>
        </div>
        <p class="mono cap">Website header</p>
      </div>
      <div class="vest">
        <div class="vest-body"><div class="vest-logo">${logoWhite}</div></div>
        <p class="mono cap">Workwear · reversed logo on navy, back panel</p>
      </div>
    </div>`,
  ),
);

// Files
pages.push(
  page(
    '10 · Logo files',
    'Logo files.',
    `<div class="cols">
      <div>
        <table class="files">
          <tr><th>File</th><th>Use</th></tr>
          <tr><td class="mono">svg/dhp-logo-color.svg</td><td>Website, digital documents, signage (scalable)</td></tr>
          <tr><td class="mono">pdf/dhp-logo-color.pdf</td><td>Print shops, vinyl, embroidery (vector)</td></tr>
          <tr><td class="mono">png/dhp-logo-color.png</td><td>Office documents, presentations (transparent)</td></tr>
          <tr><td class="mono">*-white.*</td><td>Navy or dark photographic backgrounds</td></tr>
          <tr><td class="mono">*-black.*</td><td>Single-colour printing, stamps, engraving</td></tr>
          <tr><td class="mono">dhp-symbol-*.*</td><td>Small spaces, social avatars, watermarks</td></tr>
          <tr><td class="mono">dhp-app-icon.*</td><td>Favicon, app and WhatsApp Business profile</td></tr>
        </table>
      </div>
      <div class="contact-card dark">
        <div class="cc-logo">${logoWhite}</div>
        <p>D.H. PRESTATION, S.L.<br>NIF B27656149<br>Calle María del Rocío 83 B<br>41130 La Puebla del Río, Sevilla, España</p>
        <p class="mono">+34 624 817 846 · +34 672 546 266<br>WhatsApp +34 687 032 956<br>info@dhp-solar.site</p>
      </div>
    </div>`,
  ),
);

const css = `
${fontCss}
@page { size: A4 landscape; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body { font-family: 'Archivo Variable', Arial, sans-serif; color: ${C.ink}; font-size: 10.5pt; line-height: 1.55; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.mono { font-family: 'IBM Plex Mono', monospace; font-weight: 500; letter-spacing: .08em; }
.page { position: relative; width: 297mm; height: 210mm; padding: 16mm 18mm 18mm; overflow: hidden; page-break-after: always; background: #fff; }
.page.dark { background: ${C.navy}; color: #fff; }
.ph, .pf { position: absolute; left: 18mm; right: 18mm; display: flex; justify-content: space-between; font-size: 7pt; text-transform: uppercase; color: ${C.grey}; }
.ph { top: 9mm; } .pf { bottom: 9mm; border-top: 0.3mm solid ${C.line}; padding-top: 2.5mm; }
h2 { font-size: 30pt; font-weight: 700; font-stretch: 112%; letter-spacing: -.02em; line-height: 1.05; margin: 4mm 0 9mm; color: ${C.navy}; }
h3 { font-size: 11pt; font-weight: 650; margin: 0 0 2mm; color: ${C.navy}; }
p { margin: 0 0 3.5mm; color: ${C.grey}; }
.lead { font-size: 14pt; line-height: 1.5; color: ${C.ink}; }
.note { font-size: 9pt; color: ${C.grey}; max-width: 200mm; }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 14mm; }
.cols.three { grid-template-columns: repeat(3, 1fr); gap: 10mm; margin-top: 10mm; }
.cols p + h3, .cols ul + h3, .cols table + p, .cols p + .min-row { margin-top: 6mm; }
svg { display: block; }

.cover { padding: 0; }
.cover-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.cover-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7,20,35,.95) 0%, rgba(7,20,35,.8) 45%, rgba(7,20,35,.25) 100%); }
.cover-body { position: absolute; left: 22mm; bottom: 26mm; right: 22mm; }
.cover-logo svg { height: 16mm; width: auto; }
.cover h1 { font-size: 46pt; font-weight: 700; font-stretch: 112%; line-height: 1; letter-spacing: -.02em; margin: 18mm 0 6mm; color: #fff; }
.cover-sub { font-size: 8.5pt; color: ${C.greenOnDark}; text-transform: uppercase; }

.traits { list-style: none; padding: 0; margin: 0; }
.traits li { padding: 2.2mm 0; border-top: 0.3mm solid ${C.line}; color: ${C.grey}; }
.traits b { color: ${C.navy}; }
.toc { list-style: none; padding: 0; margin: 0; columns: 2; font-size: 8pt; color: ${C.grey}; }
.toc li { padding: 1mm 0; }

.hero-logo { display: flex; align-items: center; justify-content: center; height: 78mm; background: ${C.stone}; }
.hero-logo svg { width: 190mm; height: auto; }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
.tile { margin: 0; height: 52mm; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6mm; position: relative; }
.tile > svg { width: 95mm; height: auto; }
.tile figcaption { position: absolute; left: 5mm; bottom: 4mm; font-size: 6.5pt; text-transform: uppercase; color: ${C.grey}; }
.tile.light { box-shadow: inset 0 0 0 0.3mm ${C.line}; }
.tile.navy { background: ${C.navy}; } .tile.navy figcaption { color: rgba(255,255,255,.7); }
.tile.stone { background: ${C.stone}; }
.tile.row { flex-direction: row; gap: 5mm; box-shadow: inset 0 0 0 0.3mm ${C.line}; }
.sym { width: 26mm; height: 26mm; display: flex; align-items: center; justify-content: center; }
.sym svg { width: 18mm; height: 18mm; }
.sym.light { box-shadow: inset 0 0 0 0.3mm ${C.line}; } .sym.navy { background: ${C.navy}; } .sym.stone { background: ${C.stone}; }
.sym.icon svg { width: 26mm; height: 26mm; }
.grid2 + .note { margin-top: 6mm; }

.clear-demo { position: relative; display: flex; align-items: center; justify-content: center; height: 120mm; background: ${C.stone}; }
.clear-box { position: relative; padding: 9.5mm; outline: 0.4mm dashed ${C.greenText}; background: #fff; }
.clear-box svg { width: 80mm; height: auto; }
.mx { position: absolute; background: ${C.greenText}; }
.mx-top { top: 0; left: 50%; width: 0.4mm; height: 9.5mm; }
.mx-left { left: 0; top: 50%; height: 0.4mm; width: 9.5mm; }
.mx-l { position: absolute; font-size: 8pt; color: ${C.greenText}; }
.min-row { display: flex; gap: 14mm; align-items: flex-end; margin-bottom: 5mm; }
.min-row svg { width: 100%; height: auto; }
.min-row p { font-size: 7pt; margin-top: 3mm; text-transform: uppercase; }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm; }
.mis { margin: 0; position: relative; }
.mis-art { height: 46mm; display: flex; align-items: center; justify-content: center; background: ${C.stone}; overflow: hidden; }
.mis-art svg { width: 62mm; height: auto; }
.mis-art > div { display: flex; }
.mis .x { position: absolute; top: 3mm; right: 3mm; width: 6mm; height: 6mm; }
.mis figcaption { margin-top: 2.5mm; font-size: 9pt; color: ${C.ink}; }
.busy { padding: 10mm; background: repeating-linear-gradient(45deg, #9aa7b1 0 6px, #d4c38e 6px 12px, #6d8f6a 12px 18px); }
.fake-word { display: flex; align-items: center; gap: 3mm; font-family: Georgia, serif; font-style: italic; font-size: 17pt; color: ${C.navy}; }
.fake-sym svg { width: 12mm; height: 12mm; }

.swatches { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5mm 6mm; }
.chip { height: 24mm; }
.sw-name { margin: 2.5mm 0 1mm; font-weight: 650; color: ${C.navy}; font-size: 10pt; }
.sw-val { font-size: 6.8pt; line-height: 1.5; margin: 0 0 1mm; color: ${C.ink}; }
.sw-role { font-size: 8pt; margin: 0; }
.ratio { display: flex; height: 6mm; margin: 7mm 0 3mm; }

.t-label { font-size: 7pt; text-transform: uppercase; color: ${C.greenText}; }
.spec-big { font-size: 96pt; font-weight: 700; font-stretch: 112%; line-height: .95; color: ${C.navy}; margin: 0 0 4mm; letter-spacing: -.03em; }
.spec-line { font-size: 15pt; color: ${C.navy}; margin: 0 0 2mm; line-height: 1.25; }
.spec-mono { font-size: 9pt; color: ${C.navy}; letter-spacing: .16em; }
.hier { border-collapse: collapse; width: 100%; font-size: 8.5pt; }
.hier td { border-top: 0.3mm solid ${C.line}; padding: 1.8mm 2mm 1.8mm 0; color: ${C.grey}; }
.hier td.mono { font-size: 7pt; text-transform: uppercase; color: ${C.navy}; width: 28mm; }

.img-wrap { position: relative; height: 140mm; overflow: hidden; }
.img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.img-lines { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(11,31,51,.55), rgba(11,31,51,0) 50%), linear-gradient(90deg, rgba(255,255,255,.22) 0.3mm, transparent 0.3mm); background-size: 100% 100%, 25% 100%; }
.dos { list-style: none; padding: 0; margin: 0 0 4mm; }
.dos li { display: flex; gap: 3mm; align-items: flex-start; padding: 1.8mm 0; color: ${C.grey}; }
.dos .x { width: 5mm; height: 5mm; flex: none; margin-top: .5mm; }

.apps > * { min-width: 0; }
.apps { display: grid; grid-template-columns: 1fr 1.2fr; grid-template-rows: auto auto; gap: 8mm 10mm; }
.card-pair { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 4mm; align-content: start; }
.card-pair .cap { grid-column: 1 / -1; }
.bcard { aspect-ratio: 85 / 55; padding: 4.5mm; overflow: hidden; box-shadow: 0 2mm 5mm rgba(7,20,35,.18); }
.bcard.front { background: ${C.navy}; display: flex; align-items: center; justify-content: center; }
.bcard.front svg { width: 85%; height: auto; }
.bcard.back { background: #fff; position: relative; font-size: 6pt; }
.bc-sym svg { width: 7mm; height: 7mm; }
.bc-name { margin: 2.5mm 0 0; font-weight: 700; font-size: 9pt; color: ${C.navy}; }
.bc-role { font-size: 5.5pt; color: ${C.greenText}; text-transform: uppercase; margin: 0 0 2mm; }
.bc-info { font-size: 6.5pt; line-height: 1.5; margin: 0; color: ${C.ink}; }
.cap { font-size: 6.5pt; text-transform: uppercase; color: ${C.grey}; margin-top: 2mm; }
.web { grid-row: span 2; overflow: hidden; }
.web-bar { display: flex; align-items: center; gap: 3.5mm; padding: 3mm 5mm; background: ${C.navyDeep}; color: rgba(255,255,255,.8); font-size: 6.5pt; }
.web-logo svg { height: 5mm; width: auto; }
.web-logo { margin-right: auto; }
.web-btn { background: ${C.greenText}; color: #fff; padding: 1.5mm 3mm; font-weight: 600; }
.web-hero { height: 95mm; background-size: cover; background-position: center; padding: 18mm 8mm; }
.web-hero .mono { font-size: 5.5pt; color: ${C.greenOnDark}; }
.web-h { font-size: 16pt; font-weight: 700; font-stretch: 112%; color: #fff; line-height: 1.05; max-width: 105mm; letter-spacing: -.02em; }
.vest-body { height: 52mm; background: ${C.navy}; display: flex; align-items: center; justify-content: center; position: relative; }
.vest-body::before, .vest-body::after { content: ''; position: absolute; left: 0; right: 0; height: 3.5mm; background: #c9d1d6; opacity: .85; }
.vest-body::before { top: 11mm; } .vest-body::after { bottom: 11mm; }
.vest-logo svg { width: 70mm; height: auto; }

.files { border-collapse: collapse; width: 100%; font-size: 9pt; }
.files th { text-align: left; font-size: 7pt; text-transform: uppercase; letter-spacing: .08em; color: ${C.grey}; padding-bottom: 2mm; font-weight: 500; }
.files td { border-top: 0.3mm solid ${C.line}; padding: 2.4mm 3mm 2.4mm 0; color: ${C.grey}; }
.files td.mono { color: ${C.navy}; font-size: 7.5pt; letter-spacing: .02em; }
.contact-card { background: ${C.navy}; padding: 12mm; color: #fff; }
.contact-card p { color: rgba(255,255,255,.8); }
.contact-card .mono { font-size: 7.5pt; color: ${C.greenOnDark}; line-height: 1.8; }
.cc-logo svg { width: 85mm; height: auto; margin-bottom: 10mm; }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>D.H. PRESTATION, S.L. · Brand identity guidelines</title><style>${css}</style></head><body>${pages.join('')}</body></html>`;

const browser = await chromium.launch();
const tab = await browser.newPage();
const tmp = path.join(root, 'brand', '.guide.html');
fs.writeFileSync(tmp, html);
await tab.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
await tab.evaluate(() => document.fonts.ready);
await tab.pdf({
  path: path.join(root, 'brand/DHP-Brand-Identity-Guidelines.pdf'),
  width: '297mm',
  height: '210mm',
  printBackground: true,
});
fs.unlinkSync(tmp);

// Vector PDF versions of each logo variant, cropped to the artwork with a small margin.
fs.mkdirSync(path.join(root, 'brand/logo/pdf'), { recursive: true });
for (const file of fs.readdirSync(path.join(root, 'brand/logo/svg'))) {
  const name = file.replace(/\.svg$/, '');
  const art = read(`brand/logo/svg/${file}`);
  const [, , , vw, vh] = /viewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/.exec(art).map(Number);
  const widthMm = name.includes('logo') ? 160 : 60;
  const heightMm = (widthMm * vh) / vw;
  const pad = 6;
  const bg = name.includes('white') ? C.navy : '#fff';
  await tab.setContent(
    `<html><head><style>@page{margin:0}html,body{margin:0;background:${bg};-webkit-print-color-adjust:exact;print-color-adjust:exact}svg{display:block;width:${widthMm}mm;height:${heightMm}mm;margin:${pad}mm}</style></head><body>${art}</body></html>`,
  );
  await tab.pdf({
    path: path.join(root, `brand/logo/pdf/${name}.pdf`),
    width: `${widthMm + pad * 2}mm`,
    height: `${heightMm + pad * 2}mm`,
    printBackground: true,
  });
}

await browser.close();
console.log('Brand guide and logo PDFs generated.');

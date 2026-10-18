/**
 * Generates the D.H. PRESTATION brand assets from a single geometric definition.
 *
 *   npm run brand
 *
 * Outputs
 *   src/assets/brand/logo.svg        Inline lockup (currentColor + CSS accent var) used by <Logo />
 *   src/assets/brand/mark.svg        Inline symbol only
 *   public/brand/*.svg|png           Standalone files for documents, email signatures, press
 *   public/favicon.svg|ico, icons    Favicons and web-app icons
 *   public/og-image.jpg              Social sharing image (uses the hero photograph when present)
 *
 * The wordmark is converted to outlines with opentype.js so the SVG files render identically
 * everywhere without depending on installed fonts.
 */
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const out = (p) => {
  const file = path.join(root, p);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  return file;
};

export const COLORS = {
  navy: '#0B1F33',
  navyDeep: '#071423',
  green: '#3DA35D',
  greenOnDark: '#4CB86B',
  white: '#FFFFFF',
};

const font = (weight) =>
  opentype.parse(
    fs.readFileSync(
      path.join(root, `node_modules/@fontsource/archivo/files/archivo-latin-${weight}-normal.woff`),
    ).buffer,
  );

/** Text to an SVG path with manual letter-spacing (in user units). */
function textPath(f, str, x, y, size, tracking = 0) {
  let d = '';
  let cx = x;
  for (const ch of str) {
    const glyph = f.charToGlyph(ch);
    d += glyph.getPath(cx, y, size).toPathData(2);
    cx += (glyph.advanceWidth * size) / f.unitsPerEm + tracking;
  }
  return { d, width: cx - x - tracking };
}

/*
 * The symbol (48×48 grid): three photovoltaic module cells tilted like a tracker row,
 * carried by an "H" frame of two driven posts and a cross-beam — the company initial
 * drawn as a mounting structure.
 */
const MODULES = [
  '4,20.5 16.3,17.2 16.3,24.2 4,27.5',
  '17.9,16.8 30.1,13.5 30.1,20.5 17.9,23.8',
  '31.7,13.1 44,9.8 44,16.8 31.7,20.1',
];
const FRAME = [
  '<polygon points="9,27 16,25.1 16,44 9,44"/>',
  '<polygon points="32,20.9 39,19 39,44 32,44"/>',
  '<rect x="9" y="31" width="30" height="5"/>',
];
const mark = (structure, accent) =>
  `<g fill="${accent}">${MODULES.map((p) => `<polygon points="${p}"/>`).join('')}</g>` +
  `<g fill="${structure}">${FRAME.join('')}</g>`;

const f800 = font(800);
const f600 = font(600);
const WORD_X = 58;
const name = textPath(f800, 'D.H. PRESTATION', WORD_X, 31, 22, 0.6);
const suffix = textPath(f600, 'S.L.', WORD_X + name.width + 6, 31, 13.64, 0.4);
const LOCKUP_W = Math.ceil(WORD_X + name.width + 6 + suffix.width + 2);

const lockup = ({ structure, accent, text, suffixOpacity = 0.68, attrs = '' }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOCKUP_W} 48"${attrs}>` +
  mark(structure, accent) +
  `<path d="${name.d}" fill="${text}"/>` +
  `<path d="${suffix.d}" fill="${text}" opacity="${suffixOpacity}"/>` +
  `</svg>`;

const markSvg = ({ structure, accent, attrs = '' }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"${attrs}>${mark(structure, accent)}</svg>`;

const tile = (size = 48) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}">` +
  `<rect width="48" height="48" rx="9" fill="${COLORS.navy}"/>` +
  `<g transform="translate(4.8 3.6) scale(0.8)">${mark(COLORS.white, COLORS.greenOnDark)}</g></svg>`;

// Full-bleed tile for maskable icons (safe zone = inner 80%).
const maskableTile = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="512" height="512">` +
  `<rect width="48" height="48" fill="${COLORS.navy}"/>` +
  `<g transform="translate(9.6 8.6) scale(0.6)">${mark(COLORS.white, COLORS.greenOnDark)}</g></svg>`;

// 1. Inline sources for the site components (colour controlled from CSS).
fs.writeFileSync(
  out('src/assets/brand/logo.svg'),
  lockup({
    structure: 'currentColor',
    accent: 'var(--logo-accent, #3DA35D)',
    text: 'currentColor',
    attrs: ' aria-hidden="true" focusable="false"',
  }),
);
fs.writeFileSync(
  out('src/assets/brand/mark.svg'),
  markSvg({
    structure: 'currentColor',
    accent: 'var(--logo-accent, #3DA35D)',
    attrs: ' aria-hidden="true" focusable="false"',
  }),
);

// 2. Standalone brand files.
const title = (t) => (svg) => svg.replace('>', `><title>${t}</title>`);
const named = title('D.H. PRESTATION, S.L.');
const standalone = {
  'public/brand/dhp-logo.svg': named(
    lockup({ structure: COLORS.navy, accent: COLORS.green, text: COLORS.navy }),
  ),
  'public/brand/dhp-logo-white.svg': named(
    lockup({ structure: COLORS.white, accent: COLORS.greenOnDark, text: COLORS.white }),
  ),
  'public/brand/dhp-mark.svg': named(markSvg({ structure: COLORS.navy, accent: COLORS.green })),
  'public/brand/dhp-mark-white.svg': named(
    markSvg({ structure: COLORS.white, accent: COLORS.greenOnDark }),
  ),
  'public/favicon.svg': tile(),
};
for (const [file, svg] of Object.entries(standalone)) fs.writeFileSync(out(file), svg);

const png = (svg, file, width) =>
  sharp(Buffer.from(svg), { density: 600 }).resize({ width }).png().toFile(out(file));

await png(
  standalone['public/brand/dhp-logo.svg'].replace('<svg ', `<svg width="${LOCKUP_W}" height="48" `),
  'public/brand/dhp-logo.png',
  1600,
);
await png(
  standalone['public/brand/dhp-logo-white.svg'].replace(
    '<svg ',
    `<svg width="${LOCKUP_W}" height="48" `,
  ),
  'public/brand/dhp-logo-white.png',
  1600,
);
await png(tile(), 'public/apple-touch-icon.png', 180);
await png(tile(), 'public/icon-192.png', 192);
await png(tile(), 'public/icon-512.png', 512);
await png(maskableTile(), 'public/icon-maskable-512.png', 512);

// 3. favicon.ico with embedded PNG frames (16, 32, 48).
const sizes = [16, 32, 48];
const frames = await Promise.all(
  sizes.map((s) => sharp(Buffer.from(tile()), { density: 600 }).resize(s, s).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(frames[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += frames[i].length;
});
fs.writeFileSync(out('public/favicon.ico'), Buffer.concat([header, ...frames]));

// 4. Open Graph image (1200×630): hero photograph + navy gradient + white lockup.
const heroFile = path.join(root, 'src/assets/images/hero-solar-plant.jpg');
const OG_W = 1200;
const OG_H = 630;
const base = fs.existsSync(heroFile)
  ? sharp(heroFile).resize(OG_W, OG_H, { fit: 'cover', position: 'right' })
  : sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: COLORS.navyDeep } });
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="${COLORS.navyDeep}" stop-opacity=".94"/>
    <stop offset=".55" stop-color="${COLORS.navyDeep}" stop-opacity=".72"/>
    <stop offset="1" stop-color="${COLORS.navyDeep}" stop-opacity=".2"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="80" y="${OG_H - 92}" width="56" height="4" fill="${COLORS.greenOnDark}"/>
</svg>`;
const logoWidth = 640;
const logoPng = await sharp(
  Buffer.from(
    lockup({
      structure: COLORS.white,
      accent: COLORS.greenOnDark,
      text: COLORS.white,
      attrs: ` width="${LOCKUP_W}" height="48"`,
    }),
  ),
  { density: 900 },
)
  .resize({ width: logoWidth })
  .png()
  .toBuffer();
await base
  .composite([
    { input: Buffer.from(overlay), top: 0, left: 0 },
    { input: logoPng, top: Math.round(OG_H / 2 - (logoWidth * 48) / LOCKUP_W / 2) - 20, left: 80 },
  ])
  .jpeg({ quality: 84, progressive: true, mozjpeg: true })
  .toFile(out('public/og-image.jpg'));

// 5. Logo package for print and third parties (brand/logo/): every colour variant as SVG
//    plus high-resolution transparent PNGs. PDF versions are added by build-brand-guide.mjs.
const variants = {
  color: { structure: COLORS.navy, accent: COLORS.green, text: COLORS.navy },
  white: { structure: COLORS.white, accent: COLORS.greenOnDark, text: COLORS.white },
  black: { structure: '#000000', accent: '#000000', text: '#000000', suffixOpacity: 1 },
};
for (const [name, colors] of Object.entries(variants)) {
  const logo = named(lockup(colors));
  const symbol = named(markSvg(colors));
  fs.writeFileSync(out(`brand/logo/svg/dhp-logo-${name}.svg`), logo);
  fs.writeFileSync(out(`brand/logo/svg/dhp-symbol-${name}.svg`), symbol);
  await png(
    logo.replace('<svg ', `<svg width="${LOCKUP_W}" height="48" `),
    `brand/logo/png/dhp-logo-${name}.png`,
    3000,
  );
  await png(
    symbol.replace('<svg ', '<svg width="48" height="48" '),
    `brand/logo/png/dhp-symbol-${name}.png`,
    1500,
  );
}
// Stacked monogram: symbol above "D.H.P", centred. Text width matches the symbol (40 units).
const MONO = 'D.H.P';
const monoProbe = textPath(f800, MONO, 0, 0, 10, 0.9);
const monoSize = (10 * 40) / monoProbe.width;
const monoTrack = 0.9 * (monoSize / 10);
const monoBox = f800.charToGlyph('H').getPath(0, 0, monoSize).getBoundingBox();
const capH = -monoBox.y1;
const monoBaseline = 44 + 7 + capH;
const mono = textPath(f800, MONO, 4, monoBaseline, monoSize, monoTrack);
const STACK_PAD = 2;
const stackH = Math.ceil(monoBaseline + STACK_PAD);
const stacked = ({ structure, accent, text }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${4 - STACK_PAD} ${9.8 - STACK_PAD} ${40 + 2 * STACK_PAD} ${stackH - 9.8 + STACK_PAD}">` +
  mark(structure, accent) +
  `<path d="${mono.d}" fill="${text}"/></svg>`;
for (const [name, colors] of Object.entries(variants)) {
  const logo = named(stacked(colors)).replace('D.H. PRESTATION, S.L.</title>', 'D.H.P</title>');
  fs.writeFileSync(out(`brand/logo/svg/dhp-monogram-${name}.svg`), logo);
  const [, , , vw, vh] = /viewBox="([\d.-]+) ([\d.-]+) ([\d.]+) ([\d.]+)"/.exec(logo).map(Number);
  await png(
    logo.replace('<svg ', `<svg width="${vw}" height="${vh}" `),
    `brand/logo/png/dhp-monogram-${name}.png`,
    1500,
  );
}

fs.writeFileSync(out('brand/logo/svg/dhp-app-icon.svg'), tile());
await png(tile(), 'brand/logo/png/dhp-app-icon.png', 1024);

console.log('Brand assets generated.');

import { describe, expect, it } from 'vitest';
import { company } from '../../src/config/company';
import { SERVICES } from '../../src/data/services';
import { IMAGE_FILES } from '../../src/data/images';
import { LOCALES, ROUTES, SERVICE_IDS, t } from '../../src/i18n';
import type { Dictionary } from '../../src/i18n';

/** Flattens a dictionary into "path → value" pairs, expanding the legal document builders. */
function flatten(value: unknown, path = ''): [string, unknown][] {
  if (typeof value === 'function') return flatten(value(company), path);
  if (Array.isArray(value))
    return [
      [`${path}.length`, value.length],
      ...value.flatMap((v, i) => flatten(v, `${path}[${i}]`)),
    ];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => flatten(v, path ? `${path}.${k}` : k));
  }
  return [[path, value]];
}

const flat = Object.fromEntries(LOCALES.map((l) => [l, new Map(flatten(t(l)))]));

describe('translations', () => {
  it('have exactly the same structure in every language', () => {
    const reference = [...flat.es.keys()].sort();
    for (const locale of LOCALES) {
      expect([...flat[locale].keys()].sort(), locale).toEqual(reference);
    }
  });

  it('have no empty strings', () => {
    for (const locale of LOCALES) {
      for (const [key, value] of flat[locale]) {
        if (typeof value === 'string') expect(value.trim(), `${locale}:${key}`).not.toBe('');
      }
    }
  });

  it('are actually translated (no Spanish text copied into EN/FR)', () => {
    const ignore =
      /^(anchors|nav\.whatsapp|contact\.whatsapp$|services\.eyebrow|nav\.services|footer\.servicesTitle|contact\.eyebrow|nav\.contact|footer\.contactTitle|services\.items\.electrical\.(title|short))/;
    for (const locale of ['en', 'fr'] as const) {
      const same = [...flat[locale]].filter(
        ([key, value]) =>
          typeof value === 'string' &&
          value.length > 12 &&
          !ignore.test(key) &&
          value === flat.es.get(key),
      );
      expect(same, locale).toEqual([]);
    }
  });

  it('cover every service with a title, description and WhatsApp message', () => {
    for (const locale of LOCALES) {
      const items = t(locale).services.items;
      expect(Object.keys(items).sort()).toEqual([...SERVICE_IDS].sort());
      for (const id of SERVICE_IDS) {
        expect(items[id].whatsapp).toContain(company.legalName);
        expect(items[id].whatsapp).not.toBe(t(locale).contact.whatsappMessage);
      }
    }
  });

  it('avoid unsupported marketing claims (certifications, guarantees, statistics, testimonials)', () => {
    const forbidden =
      /\b(ISO\s?\d|certificad|certified|certifié|homologad|acreditad|accredit|garantiz|guarantee|garanti|años de experiencia|years of experience|ans d’expérience|líder|leader|\d+\s?MW|testimonio|testimonial|témoignage|n[ºo°]\s?1)\b/i;
    for (const locale of LOCALES) {
      for (const [key, value] of flat[locale]) {
        // Legal texts legitimately contain disclaimers such as "does not guarantee".
        if (typeof value === 'string' && !key.startsWith('legal.')) {
          expect(value, `${locale}:${key}`).not.toMatch(forbidden);
        }
      }
    }
  });
});

describe('configuration', () => {
  it('keeps unconfirmed workforce facts hidden by default', () => {
    expect(company.team.size.confirmed).toBe(false);
    expect(company.team.ownSiteManager.confirmed).toBe(false);
  });

  it('defines a route for every page in every language', () => {
    for (const routes of Object.values(ROUTES)) {
      for (const locale of LOCALES) expect(routes[locale]).toMatch(/^\/.*\/$|^\/$/);
    }
  });

  it('references an image for every service', () => {
    for (const s of SERVICES) expect(IMAGE_FILES[s.image]).toBeDefined();
  });

  it('has alt text for every image in every language', () => {
    for (const locale of LOCALES) {
      const images: Dictionary['images'] = t(locale).images;
      for (const id of Object.keys(IMAGE_FILES) as (keyof typeof images)[]) {
        expect(images[id].length, `${locale}:${id}`).toBeGreaterThan(10);
      }
    }
  });
});

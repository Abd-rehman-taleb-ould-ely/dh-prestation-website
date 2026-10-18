import { site } from '../config/site';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import { LOCALES, type Dictionary, type Locale } from './types';

export { LOCALES, SERVICE_IDS, IMAGE_IDS } from './types';
export type { Dictionary, Locale, ServiceId, ImageId } from './types';

export const DEFAULT_LOCALE: Locale = 'es';

const dictionaries: Record<Locale, Dictionary> = { es, en, fr };

export function t(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Logical pages of the site and their localised paths (always with trailing slash). */
export const ROUTES = {
  home: { es: '/', en: '/en/', fr: '/fr/' },
  legalNotice: { es: '/aviso-legal/', en: '/en/legal-notice/', fr: '/fr/mentions-legales/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/', fr: '/fr/confidentialite/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof ROUTES;

export function pathFor(page: PageKey, locale: Locale): string {
  return ROUTES[page][locale];
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/** Link to a section of the home page in the given locale, e.g. "/en/#services". */
export function sectionHref(
  locale: Locale,
  section: keyof Dictionary['anchors'],
  fromHome = true,
): string {
  const anchor = `#${t(locale).anchors[section]}`;
  return fromHome ? anchor : `${ROUTES.home[locale]}${anchor}`;
}

/** hreflang alternates for a page, including x-default (Spanish). */
export function alternatesFor(page: PageKey) {
  const list = LOCALES.map((locale) => ({
    hreflang: t(locale).htmlLang,
    locale,
    href: absoluteUrl(ROUTES[page][locale]),
  }));
  return [...list, { hreflang: 'x-default', locale: DEFAULT_LOCALE, href: list[0].href }];
}

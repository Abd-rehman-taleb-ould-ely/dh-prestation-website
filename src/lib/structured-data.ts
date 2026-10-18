import { company } from '../config/company';
import { site } from '../config/site';
import { absoluteUrl, pathFor, t, type Locale } from '../i18n';

/**
 * schema.org Organization built only from verified company data.
 * No opening hours, ratings, founding date or service area are declared.
 */
export function organizationSchema(locale: Locale) {
  const dict = t(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: company.shortName,
    legalName: company.legalName,
    taxID: company.nif,
    url: absoluteUrl(pathFor('home', locale)),
    logo: absoluteUrl('/brand/dhp-logo.png'),
    image: absoluteUrl(site.ogImage),
    description: dict.meta.description,
    email: company.emails.general,
    telephone: company.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      addressCountry: company.address.countryCode,
    },
    contactPoint: [
      ...company.phones.map((telephone) => ({
        '@type': 'ContactPoint',
        telephone,
        contactType: 'sales',
      })),
      {
        '@type': 'ContactPoint',
        telephone: company.whatsapp,
        contactType: 'customer service',
        contactOption: 'WhatsApp',
      },
    ],
    knowsAbout: Object.values(dict.services.items).map((s) => s.title),
  };
}

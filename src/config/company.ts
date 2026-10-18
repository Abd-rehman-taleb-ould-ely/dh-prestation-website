/**
 * Single source of truth for company facts.
 *
 * Every value here comes from the company brief. Anything that still needs written
 * confirmation from D.H. PRESTATION, S.L. is marked `confirmed: false` and is NOT shown
 * on the public site until it is switched to `true`. See README → "Pre-publication checklist".
 */

export interface PendingFact<T> {
  value: T;
  /** Set to true only after the company has confirmed the fact in writing. */
  confirmed: boolean;
}

export const company = {
  legalName: 'D.H. PRESTATION, S.L.',
  shortName: 'D.H. PRESTATION',
  legalForm: 'Sociedad Limitada',
  nif: 'B27656149',

  address: {
    street: 'Calle María del Rocío 83 B',
    postalCode: '41130',
    locality: 'La Puebla del Río',
    region: 'Sevilla',
    country: 'España',
    countryCode: 'ES',
  },

  /** Phone numbers in E.164 format. Display formatting is derived in src/lib/contact.ts. */
  phones: ['+34624817846', '+34672546266'],
  whatsapp: '+34687032956',
  emails: {
    general: 'info@dhp.es',
    management: 'gerencia@dhp.es',
  },

  /**
   * Company-provided workforce figures. Hidden until confirmed.
   * TODO(confirm): approximate team size and the existence of an in-house site manager.
   */
  team: {
    size: { value: '20–25', confirmed: false } satisfies PendingFact<string>,
    ownSiteManager: { value: true, confirmed: false } satisfies PendingFact<boolean>,
  },

  /**
   * Mercantile Registry details required by Spanish law (LSSI-CE art. 10) for the legal notice.
   * TODO(confirm): fill in from the company's registration deed.
   */
  registry: null as null | {
    registry: string;
    tomo: string;
    folio: string;
    hoja: string;
    inscripcion?: string;
  },
} as const;

export type Company = typeof company;

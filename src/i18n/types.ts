import type { Company } from '../config/company';

export const LOCALES = ['es', 'en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export const SERVICE_IDS = [
  'structures',
  'trackers',
  'modules',
  'electrical',
  'subcontracting',
  'construction',
  'machinery',
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const IMAGE_IDS = [
  'hero',
  'structures',
  'trackers',
  'modules',
  'electrical',
  'subcontracting',
  'construction',
  'machinery',
  'company',
] as const;
export type ImageId = (typeof IMAGE_IDS)[number];

export interface TitledText {
  title: string;
  text: string;
}

export interface ServiceCopy {
  title: string;
  /** Short label for navigation lists and WhatsApp shortcuts. */
  short: string;
  description: string;
  /** Prefilled WhatsApp message for this service. The visitor can edit it before sending. */
  whatsapp: string;
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDocument {
  title: string;
  metaDescription: string;
  updatedLabel: string;
  sections: LegalSection[];
}

export interface Dictionary {
  /** BCP 47 tag for the html lang attribute. */
  htmlLang: string;
  /** Open Graph locale, e.g. es_ES. */
  ogLocale: string;
  languageName: string;

  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
  };

  anchors: {
    services: string;
    company: string;
    capabilities: string;
    commitments: string;
    contact: string;
  };

  a11y: {
    skipToContent: string;
    homeLink: string;
    primaryNav: string;
    footerNav: string;
    openMenu: string;
    closeMenu: string;
    languageSwitcher: string;
    currentLanguage: string;
    opensWhatsApp: string;
    whatsappFloat: string;
    backToTop: string;
  };

  nav: {
    services: string;
    company: string;
    capabilities: string;
    contact: string;
    whatsapp: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    audienceLabel: string;
    audience: string[];
    indexLabel: string;
  };

  services: {
    eyebrow: string;
    title: string;
    intro: string;
    otherTitle: string;
    otherIntro: string;
    items: Record<ServiceId, ServiceCopy>;
  };

  company: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    teamSize: string;
    siteManager: string;
    qualitiesTitle: string;
    qualities: TitledText[];
  };

  capabilities: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: TitledText[];
    note: string;
    audienceTitle: string;
    audience: string[];
  };

  commitments: {
    eyebrow: string;
    title: string;
    intro: string;
    items: TitledText[];
  };

  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    whatsappCta: string;
    whatsappNote: string;
    whatsappMessage: string;
    shortcutsTitle: string;
    detailsTitle: string;
    phone: string;
    whatsapp: string;
    email: string;
    emailGeneral: string;
    emailManagement: string;
    address: string;
  };

  footer: {
    description: string;
    servicesTitle: string;
    contactTitle: string;
    languageTitle: string;
    legalTitle: string;
    privacy: string;
    legalNotice: string;
    rights: string;
    illustrativeImages: string;
  };

  images: Record<ImageId, string>;

  legal: {
    draftNotice: string;
    backHome: string;
    notice: (c: Company) => LegalDocument;
    privacy: (c: Company) => LegalDocument;
  };

  notFound: {
    title: string;
    text: string;
    cta: string;
  };
}

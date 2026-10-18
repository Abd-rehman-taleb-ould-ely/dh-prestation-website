import type { Dictionary } from '../types';
import { formatAddress, formatPhone } from '../../lib/contact';

const en: Dictionary = {
  htmlLang: 'en',
  ogLocale: 'en_GB',
  languageName: 'English',

  meta: {
    title: 'D.H. PRESTATION, S.L. | PV mounting, solar tracker assembly and subcontracting',
    description:
      'Photovoltaic mounting structures, solar tracker assembly, module installation, electrical installations and subcontracting for EPC contractors, developers and builders. Seville, Spain.',
    ogImageAlt: 'D.H. PRESTATION, S.L. logo over a photovoltaic solar plant',
  },

  anchors: {
    services: 'services',
    company: 'company',
    capabilities: 'capabilities',
    commitments: 'commitments',
    contact: 'contact',
  },

  a11y: {
    skipToContent: 'Skip to main content',
    homeLink: 'Home: D.H. PRESTATION, S.L.',
    primaryNav: 'Main navigation',
    footerNav: 'Footer navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageSwitcher: 'Choose language',
    currentLanguage: 'current language',
    opensWhatsApp: 'opens WhatsApp in a new tab',
    whatsappFloat: 'Contact us on WhatsApp',
    backToTop: 'Back to top',
  },

  nav: {
    services: 'Services',
    company: 'Company',
    capabilities: 'Capabilities',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
  },

  hero: {
    eyebrow: 'PV mounting · Electrical installations · Subcontracting',
    title: 'Execution capacity for solar and construction projects.',
    lead: 'Specialised teams, on-site coordination and subcontracting solutions for photovoltaic, electrical and construction projects.',
    primaryCta: "Let's talk about your project",
    secondaryCta: 'Explore our services',
    audienceLabel: 'For',
    audience: [
      'EPC contractors',
      'Renewable energy developers',
      'Installation companies',
      'Builders and industry',
    ],
    indexLabel: 'Core services',
  },

  services: {
    eyebrow: 'Services',
    title: 'On-site execution, delivered as defined work packages.',
    intro:
      'We work within the main contractor’s project to carry out assembly and installation work with organised teams and direct coordination on site. The scope of each engagement is agreed with the client before work starts.',
    otherTitle: 'Other activities',
    otherIntro: 'Complementary business activities.',
    items: {
      structures: {
        title: 'Photovoltaic mounting structures',
        short: 'PV mounting structures',
        description:
          'Mechanical assembly of steel mounting structures for photovoltaic plants: profiles, purlins and support elements assembled in line with the project drawings and the manufacturer’s instructions.',
        whatsapp:
          'Hello, I am interested in photovoltaic mounting structure assembly by D.H. PRESTATION, S.L. for a project. Could we discuss the scope and requirements?',
      },
      trackers: {
        title: 'Mechanical assembly of solar trackers',
        short: 'Solar trackers',
        description:
          'Mechanical assembly of solar trackers: torque tubes, supports and system components installed according to the manufacturer’s assembly manual, in coordination with site management.',
        whatsapp:
          'Hello, I am interested in mechanical solar tracker assembly by D.H. PRESTATION, S.L. for a project. Could we discuss the scope and requirements?',
      },
      modules: {
        title: 'Photovoltaic module installation',
        short: 'PV modules',
        description:
          'Installation of photovoltaic modules on fixed-tilt structures or trackers, with careful material handling and fixing in accordance with manufacturer and project specifications.',
        whatsapp:
          'Hello, I am interested in photovoltaic module installation by D.H. PRESTATION, S.L. for a project. Could we discuss the scope and requirements?',
      },
      electrical: {
        title: 'Electrical installations',
        short: 'Electrical installations',
        description:
          'Electrical installation work on photovoltaic, industrial and construction projects, within the scope and technical documentation defined by the client for each job.',
        whatsapp:
          'Hello, I am interested in electrical installation services from D.H. PRESTATION, S.L. for a project. Could we discuss the scope and requirements?',
      },
      subcontracting: {
        title: 'Subcontracting for construction and energy projects',
        short: 'Subcontracting',
        description:
          'Organised teams that add execution capacity for builders, EPC contractors and installation companies, under a scope, schedule and terms agreed in advance.',
        whatsapp:
          'Hello, I am looking for subcontracting capacity for an energy or construction project and would like to discuss the scope and requirements with D.H. PRESTATION, S.L.',
      },
      construction: {
        title: 'Construction and property development',
        short: 'Construction',
        description:
          'Construction and property development activity, complementary to our execution services for third parties.',
        whatsapp:
          'Hello, I would like information about the construction and property development activity of D.H. PRESTATION, S.L.',
      },
      machinery: {
        title: 'Machinery, tools and equipment trading',
        short: 'Machinery and equipment',
        description:
          'Wholesale and retail trade in machinery, tools and equipment. Contact us for availability and terms.',
        whatsapp:
          'Hello, I would like to ask D.H. PRESTATION, S.L. about machinery, tools or equipment. Could we discuss what I need?',
      },
    },
  },

  company: {
    eyebrow: 'Company',
    title: 'An on-site execution partner.',
    paragraphs: [
      'D.H. PRESTATION, S.L. is a company based in La Puebla del Río (Seville, Spain) that carries out assembly, installation and construction work for main contractors, EPC companies and developers.',
      'Our approach is practical: organised teams, direct communication and continuous coordination with the project lead, so that each work package is delivered to the agreed scope, quality and schedule.',
    ],
    teamSize: 'professionals, approximately',
    siteManager: 'Coordinated by our own site manager',
    qualitiesTitle: 'How we work',
    qualities: [
      {
        title: 'Direct communication',
        text: 'A clear point of contact and quick responses by phone, email or WhatsApp.',
      },
      {
        title: 'Organised teams',
        text: 'Crews organised by task and work front, with clearly defined responsibilities.',
      },
      {
        title: 'Coordination with the main contractor',
        text: 'Joint planning and follow-up with site management throughout execution.',
      },
      {
        title: 'Adapted to each project',
        text: 'Resources and organisation matched to the requirements and phase of each site.',
      },
      {
        title: 'Quality and agreed schedules',
        text: 'Work focused on execution quality and on meeting the agreed programme.',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Capabilities',
    title: 'How we work with the main contractor.',
    intro:
      'A simple, transparent way of working, designed to fit into the site organisation of EPC contractors, builders and installation companies.',
    steps: [
      {
        title: 'Initial discussion',
        text: 'A first conversation about the project, its location, the type of work and the expected timeline.',
      },
      {
        title: 'Scope and requirements',
        text: 'Definition of the work package, technical documentation, safety requirements and terms of collaboration.',
      },
      {
        title: 'Resource planning',
        text: 'Organisation of crews, means and work phases in line with the overall site programme.',
      },
      {
        title: 'Execution',
        text: 'Delivery of the agreed work package, following site procedures and the instructions of site management.',
      },
      {
        title: 'Follow-up and reporting',
        text: 'Ongoing communication with the responsible project team on progress, issues and next steps.',
      },
    ],
    note: 'An indicative way of working: each collaboration is adapted to the requirements of the project and the client.',
    audienceTitle: 'Designed for',
    audience: [
      'EPC contractors',
      'Photovoltaic plant developers',
      'Renewable energy contractors',
      'Solar installation companies',
      'Builders and general contractors',
      'Industrial project managers and procurement teams',
    ],
  },

  commitments: {
    eyebrow: 'Commitments',
    title: 'Quality, safety and collaboration.',
    intro: 'The principles we apply to every job.',
    items: [
      {
        title: 'Professionalism',
        text: 'A serious, responsible approach towards clients, our own teams and the other companies on site.',
      },
      {
        title: 'Quality of execution',
        text: 'Careful work in accordance with the drawings, specifications and quality criteria of the project.',
      },
      {
        title: 'Agreed schedules',
        text: 'Commitment to the agreed programme and early notice of any issue that may affect it.',
      },
      {
        title: 'Occupational safety',
        text: 'Attention to occupational risk prevention and to the procedures that apply on each site.',
      },
      {
        title: 'Flexibility',
        text: 'Ability to adapt to programme changes and to the real needs of the project.',
      },
      {
        title: 'Communication and collaboration',
        text: 'Clear information and smooth coordination with the main contractor and site management.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about your project.",
    lead: 'Tell us what you need: type of work, location and timeline. WhatsApp is the quickest way to reach us; you can also call or email.',
    whatsappCta: 'Message us on WhatsApp',
    whatsappNote:
      'WhatsApp will open with a suggested message that you can review and edit before sending.',
    whatsappMessage:
      'Hello, I would like to learn about the capacity of D.H. PRESTATION, S.L. to collaborate on a project. Could we discuss the scope and requirements?',
    shortcutsTitle: 'Or ask about a specific service',
    detailsTitle: 'Contact details',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    email: 'Email',
    emailGeneral: 'General enquiries',
    emailManagement: 'Management',
    address: 'Registered address',
    nif: 'Tax ID (NIF)',
  },

  footer: {
    description:
      'Photovoltaic mounting, electrical installations and subcontracting for solar and construction projects.',
    servicesTitle: 'Services',
    contactTitle: 'Contact',
    languageTitle: 'Language',
    legalTitle: 'Legal information',
    privacy: 'Privacy policy',
    legalNotice: 'Legal notice',
    rights: 'All rights reserved.',
    illustrativeImages:
      'Images on this site are illustrative and do not show projects carried out by the company.',
  },

  images: {
    hero: 'Photovoltaic solar plant with rows of solar trackers at sunset',
    structures: 'Steel photovoltaic mounting structures being assembled, without modules yet',
    trackers: 'Solar tracker row with tilted modules and the torque tube visible',
    modules: 'Tracker row partly fitted with photovoltaic modules, with pallets of modules nearby',
    electrical: 'Transformer station and electrical boxes at a photovoltaic plant',
    subcontracting: 'Aerial view of a photovoltaic plant under construction with site cabins',
    construction: 'Concrete frame of a building under construction with a tower crane',
    machinery: 'Cable drums, steel profiles and pallets of material in an outdoor yard',
    company: 'Access road to a photovoltaic plant with site cabins in the morning',
  },

  legal: {
    draftNotice:
      'Draft pending legal review. This text must be reviewed and approved before publication. The Spanish version is the reference text.',
    backHome: 'Back to home',
    notice: (c) => ({
      title: 'Legal notice',
      metaDescription: `Legal notice and website owner information for ${c.legalName}.`,
      updatedLabel: 'Last updated',
      sections: [
        {
          heading: 'Company details',
          paragraphs: [
            'In accordance with Article 10 of Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), the owner of this website is:',
          ],
          list: [
            `Company name: ${c.legalName}`,
            `Tax ID (NIF): ${c.nif}`,
            `Registered address: ${formatAddress(c.address)}`,
            `Email: ${c.emails.general}`,
            `Phone: ${formatPhone(c.phones[0])}`,
            c.registry
              ? `Registry details: ${c.registry.registry}, volume ${c.registry.tomo}, folio ${c.registry.folio}, sheet ${c.registry.hoja}`
              : 'Registry details: to be completed',
          ],
        },
        {
          heading: 'Purpose',
          paragraphs: [
            'This website is informative and presents the company’s activity and services. It does not allow online contracting or collect data through forms.',
          ],
        },
        {
          heading: 'Terms of use',
          paragraphs: [
            'Access to this website is free of charge. Users agree to make appropriate use of its content in accordance with the law, good faith and this legal notice.',
          ],
        },
        {
          heading: 'Intellectual and industrial property',
          paragraphs: [
            `The texts, logo and design of this website belong to ${c.legalName} or are used with due authorisation. Reproduction without prior permission is prohibited.`,
            'The images on this site are illustrative and do not show projects carried out by the company.',
          ],
        },
        {
          heading: 'Links to third-party services',
          paragraphs: [
            'The site contains links that open third-party services such as WhatsApp, or the phone and email applications of your device. Those services are governed by their own terms and policies.',
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'The company strives to keep the information on this site accurate and up to date, but does not guarantee that it is free of errors and accepts no liability for its use. Information on this site does not constitute a contractual offer.',
          ],
        },
        {
          heading: 'Governing law',
          paragraphs: ['This legal notice is governed by Spanish law.'],
        },
      ],
    }),
    privacy: (c) => ({
      title: 'Privacy policy',
      metaDescription: `How ${c.legalName} processes personal data.`,
      updatedLabel: 'Last updated',
      sections: [
        {
          heading: 'Data controller',
          paragraphs: [],
          list: [
            `Controller: ${c.legalName}`,
            `Tax ID (NIF): ${c.nif}`,
            `Address: ${formatAddress(c.address)}`,
            `Email: ${c.emails.general}`,
          ],
        },
        {
          heading: 'What data we process',
          paragraphs: [
            'This website has no forms, does not use cookies and does not include analytics or advertising tools. Its code does not collect personal data automatically.',
            'We only process the data you choose to give us when you contact us by phone, email or WhatsApp, such as your name, company, contact details and the content of your enquiry.',
          ],
        },
        {
          heading: 'Purpose and legal basis',
          paragraphs: [
            'We use this data to answer your enquiry, prepare proposals and, where applicable, manage the business relationship. The legal basis is the taking of steps prior to entering into a contract or the performance of a contract (Art. 6(1)(b) GDPR) and our legitimate interest in responding to enquiries (Art. 6(1)(f) GDPR).',
          ],
        },
        {
          heading: 'Retention',
          paragraphs: [
            'We keep data for as long as necessary to handle your enquiry and, if a business relationship begins, for its duration and the periods required by law.',
          ],
        },
        {
          heading: 'Recipients',
          paragraphs: [
            'We do not share data with third parties unless required by law. Providers of technical services, such as email or web hosting, may access data as data processors.',
          ],
        },
        {
          heading: 'WhatsApp',
          paragraphs: [
            'WhatsApp buttons open the WhatsApp app or website, a service provided by WhatsApp Ireland Limited. The suggested message is not sent until you confirm it, and you can edit it beforehand. Use of WhatsApp is governed by its own privacy policy and may involve international data transfers.',
          ],
        },
        {
          heading: 'Hosting and cookies',
          paragraphs: [
            'The website hosting provider may log technical access data, such as IP addresses, for security and operational purposes.',
            'This website does not use cookies or similar technologies. If they are introduced in the future, you will be informed and asked for consent where required.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            `You can exercise your rights of access, rectification, erasure, objection, restriction of processing and portability by writing to ${c.emails.general}. If you believe your rights have not been respected, you can lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).`,
          ],
        },
      ],
    }),
  },

  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved.',
    cta: 'Back to home',
  },
};

export default en;

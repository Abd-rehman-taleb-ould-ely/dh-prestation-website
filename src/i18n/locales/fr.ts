import type { Dictionary } from '../types';
import { formatAddress, formatPhone } from '../../lib/contact';

const fr: Dictionary = {
  htmlLang: 'fr',
  ogLocale: 'fr_FR',
  languageName: 'Français',

  meta: {
    title: 'D.H. PRESTATION, S.L. | Montage photovoltaïque, trackers solaires et sous-traitance',
    description:
      'Montage de structures photovoltaïques et de trackers solaires, pose de modules, installations électriques et sous-traitance pour EPC, développeurs et entreprises de construction. Séville, Espagne.',
    ogImageAlt: 'Logo de D.H. PRESTATION, S.L. sur une centrale solaire photovoltaïque',
  },

  anchors: {
    services: 'services',
    company: 'entreprise',
    capabilities: 'capacites',
    commitments: 'engagements',
    contact: 'contact',
  },

  a11y: {
    skipToContent: 'Aller au contenu principal',
    homeLink: 'D.H. PRESTATION, S.L. — accueil',
    primaryNav: 'Navigation principale',
    footerNav: 'Navigation du pied de page',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    languageSwitcher: 'Choisir la langue',
    currentLanguage: 'langue actuelle',
    opensWhatsApp: 'ouvre WhatsApp dans un nouvel onglet',
    whatsappFloat: 'Nous contacter sur WhatsApp',
    backToTop: 'Retour en haut',
  },

  nav: {
    services: 'Services',
    company: 'Entreprise',
    capabilities: 'Capacités',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
  },

  hero: {
    eyebrow: 'Montage photovoltaïque · Installations électriques · Sous-traitance',
    title: 'Des solutions d’exécution pour les projets solaires et de construction.',
    lead: 'Équipes spécialisées, coordination sur chantier et solutions de sous-traitance pour les projets photovoltaïques, électriques et de construction.',
    primaryCta: 'Parlons de votre projet',
    secondaryCta: 'Découvrir nos services',
    audienceLabel: 'Pour',
    audience: [
      'Entreprises EPC',
      'Développeurs d’énergies renouvelables',
      'Entreprises d’installation',
      'Constructeurs et industrie',
    ],
    indexLabel: 'Services principaux',
  },

  services: {
    eyebrow: 'Services',
    title: 'Exécution sur chantier, par lots de travaux.',
    intro:
      'Nous intervenons dans le projet de l’entreprise principale pour réaliser des travaux de montage et d’installation avec des équipes organisées et une coordination directe sur chantier. Le périmètre de chaque collaboration est défini avec le client avant le démarrage.',
    otherTitle: 'Autres activités',
    otherIntro: 'Activités complémentaires de l’entreprise.',
    cta: 'Demander sur WhatsApp',
    items: {
      structures: {
        title: 'Montage de structures photovoltaïques',
        short: 'Structures photovoltaïques',
        description:
          'Montage mécanique de structures métalliques pour centrales photovoltaïques : assemblage de profilés, de pannes et d’éléments de support conformément aux plans du projet et aux instructions du fabricant.',
        whatsapp:
          'Bonjour, je souhaiterais échanger avec D.H. PRESTATION, S.L. au sujet du montage de structures photovoltaïques pour un projet. Pourrions-nous parler du périmètre et des exigences ?',
      },
      trackers: {
        title: 'Montage mécanique de trackers solaires',
        short: 'Trackers solaires',
        description:
          'Montage mécanique de trackers solaires : mise en place des tubes de torsion, des supports et des composants du système selon le manuel de montage du fabricant, en coordination avec la direction de chantier.',
        whatsapp:
          'Bonjour, je souhaiterais échanger avec D.H. PRESTATION, S.L. au sujet du montage mécanique de trackers solaires pour un projet. Pourrions-nous parler du périmètre et des exigences ?',
      },
      modules: {
        title: 'Installation et pose de modules photovoltaïques',
        short: 'Modules photovoltaïques',
        description:
          'Pose de modules photovoltaïques sur structure fixe ou tracker, avec une manutention soignée du matériel et une fixation conforme aux spécifications du fabricant et du projet.',
        whatsapp:
          'Bonjour, je souhaiterais échanger avec D.H. PRESTATION, S.L. au sujet de la pose de modules photovoltaïques pour un projet. Pourrions-nous parler du périmètre et des exigences ?',
      },
      electrical: {
        title: 'Installations électriques',
        short: 'Installations électriques',
        description:
          'Réalisation d’installations électriques sur des projets photovoltaïques, industriels et de construction, dans le périmètre et selon la documentation technique définis par le client pour chaque intervention.',
        whatsapp:
          'Bonjour, je souhaiterais échanger avec D.H. PRESTATION, S.L. au sujet de ses services d’installations électriques pour un projet. Pourrions-nous parler du périmètre et des exigences ?',
      },
      subcontracting: {
        title: 'Sous-traitance pour la construction et les projets énergétiques',
        short: 'Sous-traitance',
        description:
          'Des équipes organisées pour renforcer la capacité d’exécution des entreprises de construction, des EPC et des installateurs, selon un périmètre, un calendrier et des conditions convenus à l’avance.',
        whatsapp:
          'Bonjour, je recherche une capacité de sous-traitance pour un projet énergétique ou de construction et souhaiterais échanger avec D.H. PRESTATION, S.L. sur le périmètre et les exigences.',
      },
      construction: {
        title: 'Construction et promotion immobilière',
        short: 'Construction',
        description:
          'Activité de construction et de promotion immobilière, complémentaire à nos services d’exécution pour le compte de tiers.',
        whatsapp:
          'Bonjour, je souhaiterais des informations sur l’activité de construction et de promotion immobilière de D.H. PRESTATION, S.L.',
      },
      machinery: {
        title: 'Commerce de machines, d’outils et d’équipements',
        short: 'Machines et équipements',
        description:
          'Commerce de gros et de détail de machines, d’outils et d’équipements. Contactez-nous pour connaître les disponibilités et les conditions.',
        whatsapp:
          'Bonjour, je souhaiterais interroger D.H. PRESTATION, S.L. au sujet de machines, d’outils ou d’équipements. Pourrions-nous en parler ?',
      },
    },
  },

  company: {
    eyebrow: 'Entreprise',
    title: 'Un partenaire d’exécution sur chantier.',
    paragraphs: [
      'D.H. PRESTATION, S.L. est une entreprise établie à La Puebla del Río (Séville, Espagne) qui réalise des travaux de montage, d’installation et de construction pour des entreprises principales, des EPC et des développeurs.',
      'Notre approche est concrète : des équipes organisées, une communication directe et une coordination continue avec le responsable du projet, afin que chaque lot de travaux soit exécuté selon le périmètre, la qualité et les délais convenus.',
    ],
    teamSize: 'professionnels, environ',
    siteManager: 'Coordonnés par notre propre chef de chantier',
    qualitiesTitle: 'Notre façon de travailler',
    qualities: [
      {
        title: 'Communication directe',
        text: 'Un interlocuteur identifié et des réponses rapides par téléphone, e-mail ou WhatsApp.',
      },
      {
        title: 'Équipes organisées',
        text: 'Des équipes organisées par tâche et par front de travail, avec des responsabilités définies.',
      },
      {
        title: 'Coordination avec l’entreprise principale',
        text: 'Planification commune et suivi avec la direction de chantier tout au long de l’exécution.',
      },
      {
        title: 'Adaptation au projet',
        text: 'Des moyens et une organisation ajustés aux exigences et à la phase de chaque chantier.',
      },
      {
        title: 'Qualité et délais convenus',
        text: 'Un travail orienté vers la qualité d’exécution et le respect du planning convenu.',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Capacités',
    title: 'Notre collaboration avec l’entreprise principale.',
    intro:
      'Une méthode de travail simple et transparente, conçue pour s’intégrer à l’organisation de chantier des EPC, des entreprises de construction et des installateurs.',
    steps: [
      {
        title: 'Premier échange',
        text: 'Une première discussion sur le projet, sa localisation, le type de travaux et le calendrier prévu.',
      },
      {
        title: 'Périmètre et exigences',
        text: 'Définition du lot de travaux, de la documentation technique, des exigences de sécurité et des conditions de collaboration.',
      },
      {
        title: 'Planification des moyens',
        text: 'Organisation des équipes, des moyens et des phases de travail en cohérence avec le planning général du chantier.',
      },
      {
        title: 'Exécution',
        text: 'Réalisation du lot de travaux convenu, dans le respect des procédures du chantier et des instructions de la direction.',
      },
      {
        title: 'Suivi et communication',
        text: 'Une communication continue avec l’équipe responsable du projet sur l’avancement, les aléas et les prochaines étapes.',
      },
    ],
    note: 'Méthode de travail indicative : chaque collaboration est adaptée aux exigences du projet et du client.',
    audienceTitle: 'Conçu pour',
    audience: [
      'Entreprises EPC',
      'Développeurs de centrales photovoltaïques',
      'Entreprises du secteur des énergies renouvelables',
      'Installateurs solaires',
      'Entreprises de construction et entreprises générales',
      'Chefs de projet industriels et services achats',
    ],
  },

  commitments: {
    eyebrow: 'Engagements',
    title: 'Qualité, sécurité et collaboration.',
    intro: 'Les principes que nous appliquons à chaque intervention.',
    items: [
      {
        title: 'Professionnalisme',
        text: 'Une attitude sérieuse et responsable envers le client, nos équipes et les autres entreprises présentes sur le chantier.',
      },
      {
        title: 'Qualité d’exécution',
        text: 'Un travail soigné, conforme aux plans, aux spécifications et aux critères de qualité du projet.',
      },
      {
        title: 'Respect des délais',
        text: 'Un engagement envers le planning convenu et une alerte rapide en cas d’aléa.',
      },
      {
        title: 'Sécurité au travail',
        text: 'Une attention portée à la prévention des risques professionnels et aux procédures applicables sur chaque chantier.',
      },
      {
        title: 'Flexibilité',
        text: 'Une capacité d’adaptation aux changements de planning et aux besoins réels du projet.',
      },
      {
        title: 'Communication et collaboration',
        text: 'Une information claire et une coordination fluide avec l’entreprise principale et la direction de chantier.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Parlons de votre projet.',
    lead: 'Décrivez-nous votre besoin : type de travaux, localisation et délais. WhatsApp est le moyen le plus rapide ; vous pouvez aussi nous appeler ou nous écrire par e-mail.',
    whatsappCta: 'Écrire sur WhatsApp',
    whatsappNote:
      'WhatsApp s’ouvrira avec un message proposé, que vous pourrez relire et modifier avant de l’envoyer.',
    whatsappMessage:
      'Bonjour, je souhaiterais connaître la capacité de D.H. PRESTATION, S.L. à collaborer sur un projet. Pourrions-nous échanger sur le périmètre et les exigences ?',
    shortcutsTitle: 'Ou posez directement une question sur un service',
    detailsTitle: 'Coordonnées',
    phone: 'Téléphone',
    whatsapp: 'WhatsApp',
    email: 'E-mail',
    emailGeneral: 'Informations générales',
    emailManagement: 'Direction',
    address: 'Siège social',
    nif: 'N° d’identification fiscale (NIF)',
  },

  footer: {
    description:
      'Montage photovoltaïque, installations électriques et sous-traitance pour les projets solaires et de construction.',
    servicesTitle: 'Services',
    contactTitle: 'Contact',
    languageTitle: 'Langue',
    legalTitle: 'Informations légales',
    privacy: 'Politique de confidentialité',
    legalNotice: 'Mentions légales',
    rights: 'Tous droits réservés.',
    illustrativeImages:
      'Les images de ce site sont fournies à titre d’illustration et ne représentent pas des projets réalisés par l’entreprise.',
  },

  images: {
    hero: 'Centrale solaire photovoltaïque avec des rangées de trackers au coucher du soleil',
    structures: 'Structures photovoltaïques métalliques en cours de montage, encore sans modules',
    trackers: 'Rangée de trackers solaires avec modules inclinés et tube de torsion visible',
    modules: 'Rangée de trackers partiellement équipée de modules, avec des palettes de modules',
    electrical: 'Poste de transformation et coffrets électriques dans une centrale photovoltaïque',
    subcontracting:
      'Vue aérienne d’une centrale photovoltaïque en construction avec des bungalows de chantier',
    construction: 'Ossature en béton d’un bâtiment en construction avec une grue à tour',
    machinery:
      'Tourets de câble, profilés en acier et palettes de matériel sur une aire extérieure',
    company: 'Piste d’accès à une centrale photovoltaïque avec des bungalows de chantier le matin',
  },

  legal: {
    draftNotice:
      'Projet en attente de validation juridique. Ce texte doit être revu et approuvé avant publication. La version espagnole fait foi.',
    backHome: 'Retour à l’accueil',
    notice: (c) => ({
      title: 'Mentions légales',
      metaDescription: `Mentions légales et informations sur l’éditeur du site de ${c.legalName}.`,
      updatedLabel: 'Dernière mise à jour',
      sections: [
        {
          heading: 'Éditeur du site',
          paragraphs: [
            'Conformément à l’article 10 de la loi espagnole 34/2002 du 11 juillet sur les services de la société de l’information et le commerce électronique (LSSI-CE), l’éditeur de ce site est :',
          ],
          list: [
            `Raison sociale : ${c.legalName}`,
            `N° d’identification fiscale (NIF) : ${c.nif}`,
            `Siège social : ${formatAddress(c.address)}`,
            `E-mail : ${c.emails.general}`,
            `Téléphone : ${formatPhone(c.phones[0])}`,
            c.registry
              ? `Immatriculation : ${c.registry.registry}, tome ${c.registry.tomo}, folio ${c.registry.folio}, feuille ${c.registry.hoja}`
              : 'Immatriculation : à compléter',
          ],
        },
        {
          heading: 'Objet',
          paragraphs: [
            'Ce site a un caractère informatif et présente l’activité et les services de l’entreprise. Il ne permet ni la contractualisation en ligne ni la collecte de données par formulaire.',
          ],
        },
        {
          heading: 'Conditions d’utilisation',
          paragraphs: [
            'L’accès à ce site est gratuit. L’utilisateur s’engage à faire un usage approprié de son contenu, conformément à la loi, à la bonne foi et aux présentes mentions légales.',
          ],
        },
        {
          heading: 'Propriété intellectuelle et industrielle',
          paragraphs: [
            `Les textes, le logo et la conception de ce site appartiennent à ${c.legalName} ou sont utilisés avec l’autorisation requise. Toute reproduction sans autorisation préalable est interdite.`,
            'Les images du site sont fournies à titre d’illustration et ne représentent pas des projets réalisés par l’entreprise.',
          ],
        },
        {
          heading: 'Liens vers des services tiers',
          paragraphs: [
            'Le site contient des liens qui ouvrent des services tiers, comme WhatsApp, ou les applications de téléphone et de messagerie de votre appareil. Ces services sont régis par leurs propres conditions et politiques.',
          ],
        },
        {
          heading: 'Responsabilité',
          paragraphs: [
            'L’entreprise s’efforce de publier des informations exactes et à jour, mais ne garantit pas l’absence d’erreurs et décline toute responsabilité quant à leur utilisation. Les informations du site ne constituent pas une offre contractuelle.',
          ],
        },
        {
          heading: 'Droit applicable',
          paragraphs: ['Les présentes mentions légales sont régies par le droit espagnol.'],
        },
      ],
    }),
    privacy: (c) => ({
      title: 'Politique de confidentialité',
      metaDescription: `Comment ${c.legalName} traite les données personnelles.`,
      updatedLabel: 'Dernière mise à jour',
      sections: [
        {
          heading: 'Responsable du traitement',
          paragraphs: [],
          list: [
            `Responsable : ${c.legalName}`,
            `N° d’identification fiscale (NIF) : ${c.nif}`,
            `Adresse : ${formatAddress(c.address)}`,
            `E-mail : ${c.emails.general}`,
          ],
        },
        {
          heading: 'Données traitées',
          paragraphs: [
            'Ce site ne comporte aucun formulaire, n’utilise pas de cookies et n’intègre aucun outil d’analyse ou de publicité. Son code ne collecte pas de données personnelles de manière automatique.',
            'Nous traitons uniquement les données que vous nous communiquez volontairement lorsque vous nous contactez par téléphone, e-mail ou WhatsApp : par exemple votre nom, votre entreprise, vos coordonnées et le contenu de votre demande.',
          ],
        },
        {
          heading: 'Finalité et base juridique',
          paragraphs: [
            'Ces données servent à répondre à votre demande, à préparer des propositions et, le cas échéant, à gérer la relation commerciale. La base juridique est l’exécution de mesures précontractuelles ou d’un contrat (art. 6.1.b RGPD) et notre intérêt légitime à répondre aux demandes reçues (art. 6.1.f RGPD).',
          ],
        },
        {
          heading: 'Durée de conservation',
          paragraphs: [
            'Les données sont conservées le temps nécessaire au traitement de votre demande et, si une relation commerciale s’engage, pendant sa durée et les délais prévus par la loi.',
          ],
        },
        {
          heading: 'Destinataires',
          paragraphs: [
            'Nous ne communiquons pas vos données à des tiers, sauf obligation légale. Les prestataires de services techniques, comme la messagerie électronique ou l’hébergement, peuvent y accéder en qualité de sous-traitants.',
          ],
        },
        {
          heading: 'WhatsApp',
          paragraphs: [
            'Les boutons WhatsApp ouvrent l’application ou le site web de WhatsApp, un service fourni par WhatsApp Ireland Limited. Le message proposé n’est envoyé qu’après votre confirmation et vous pouvez le modifier auparavant. L’utilisation de WhatsApp est régie par sa propre politique de confidentialité et peut impliquer des transferts internationaux de données.',
          ],
        },
        {
          heading: 'Hébergement et cookies',
          paragraphs: [
            'L’hébergeur du site peut enregistrer des données techniques de connexion, comme l’adresse IP, à des fins de sécurité et de fonctionnement.',
            'Ce site n’utilise ni cookies ni technologies similaires. S’ils étaient introduits à l’avenir, nous vous en informerions et solliciterions votre consentement lorsque la loi l’exige.',
          ],
        },
        {
          heading: 'Vos droits',
          paragraphs: [
            `Vous pouvez exercer vos droits d’accès, de rectification, d’effacement, d’opposition, de limitation du traitement et de portabilité en écrivant à ${c.emails.general}. Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de l’autorité espagnole de protection des données (www.aepd.es).`,
          ],
        },
      ],
    }),
  },

  notFound: {
    title: 'Page introuvable',
    text: 'La page que vous recherchez n’existe pas ou a été déplacée.',
    cta: 'Retour à l’accueil',
  },
};

export default fr;

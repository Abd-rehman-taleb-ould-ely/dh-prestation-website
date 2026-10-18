import type { Dictionary } from '../types';
import { formatAddress, formatPhone } from '../../lib/contact';

const es: Dictionary = {
  htmlLang: 'es-ES',
  ogLocale: 'es_ES',
  languageName: 'Español',

  meta: {
    title: 'D.H. PRESTATION, S.L. | Montaje fotovoltaico, seguidores solares y subcontratación',
    description:
      'Montaje de estructuras fotovoltaicas y seguidores solares, instalación de módulos, instalaciones eléctricas y subcontratación para EPC, promotores y constructoras. Sevilla, España.',
    ogImageAlt: 'Logotipo de D.H. PRESTATION, S.L. sobre una planta solar fotovoltaica',
  },

  anchors: {
    services: 'servicios',
    company: 'empresa',
    capabilities: 'capacidades',
    commitments: 'compromisos',
    contact: 'contacto',
  },

  a11y: {
    skipToContent: 'Saltar al contenido principal',
    homeLink: 'Inicio: D.H. PRESTATION, S.L.',
    primaryNav: 'Navegación principal',
    footerNav: 'Navegación del pie de página',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    languageSwitcher: 'Seleccionar idioma',
    currentLanguage: 'idioma actual',
    opensWhatsApp: 'abre WhatsApp en una nueva pestaña',
    whatsappFloat: 'Contactar por WhatsApp',
    backToTop: 'Volver arriba',
  },

  nav: {
    services: 'Servicios',
    company: 'Empresa',
    capabilities: 'Capacidades',
    contact: 'Contacto',
    whatsapp: 'WhatsApp',
  },

  hero: {
    eyebrow: 'Montaje fotovoltaico · Instalaciones eléctricas · Subcontratación',
    title: 'Soluciones de ejecución para proyectos solares y de construcción.',
    lead: 'Equipos especializados, coordinación en obra y soluciones de subcontratación para proyectos fotovoltaicos, eléctricos y de construcción.',
    primaryCta: 'Hablemos de tu proyecto',
    secondaryCta: 'Descubrir servicios',
    audienceLabel: 'Para',
    audience: [
      'Contratistas EPC',
      'Promotores de energía renovable',
      'Empresas instaladoras',
      'Constructoras e industria',
    ],
    indexLabel: 'Servicios principales',
  },

  services: {
    eyebrow: 'Servicios',
    title: 'Ejecución en obra por paquetes de trabajo.',
    intro:
      'Nos integramos en el proyecto del contratista principal para ejecutar trabajos de montaje e instalación con equipos organizados y una coordinación directa en obra. El alcance de cada colaboración se define con el cliente antes del inicio.',
    otherTitle: 'Otras actividades',
    otherIntro: 'Actividades complementarias de la empresa.',
    items: {
      structures: {
        title: 'Montaje de estructuras fotovoltaicas',
        short: 'Estructuras fotovoltaicas',
        description:
          'Montaje mecánico de estructuras metálicas para plantas fotovoltaicas: ensamblaje de perfiles, correas y elementos de soporte conforme a los planos del proyecto y a las instrucciones del fabricante.',
        whatsapp:
          'Hola, me interesa el montaje de estructuras fotovoltaicas con D.H. PRESTATION, S.L. para un proyecto. ¿Podemos hablar sobre el alcance y los requisitos?',
      },
      trackers: {
        title: 'Montaje mecánico de seguidores solares (trackers)',
        short: 'Seguidores solares',
        description:
          'Montaje mecánico de seguidores solares: colocación de tubos de torsión, soportes y componentes del sistema según el manual de montaje del fabricante, en coordinación con la dirección de obra.',
        whatsapp:
          'Hola, me interesa el montaje mecánico de seguidores solares (trackers) con D.H. PRESTATION, S.L. para un proyecto. ¿Podemos hablar sobre el alcance y los requisitos?',
      },
      modules: {
        title: 'Instalación y montaje de módulos fotovoltaicos',
        short: 'Módulos fotovoltaicos',
        description:
          'Instalación de módulos fotovoltaicos sobre estructura fija o seguidor, con una manipulación cuidadosa del material y fijación conforme a las especificaciones del fabricante y del proyecto.',
        whatsapp:
          'Hola, me interesa la instalación de módulos fotovoltaicos con D.H. PRESTATION, S.L. para un proyecto. ¿Podemos hablar sobre el alcance y los requisitos?',
      },
      electrical: {
        title: 'Instalaciones eléctricas',
        short: 'Instalaciones eléctricas',
        description:
          'Ejecución de instalaciones eléctricas en proyectos fotovoltaicos, industriales y de construcción, dentro del alcance y la documentación técnica que defina el cliente para cada trabajo.',
        whatsapp:
          'Hola, me interesan los servicios de instalaciones eléctricas de D.H. PRESTATION, S.L. para un proyecto. ¿Podemos hablar sobre el alcance y los requisitos?',
      },
      subcontracting: {
        title: 'Subcontratación para construcción y proyectos energéticos',
        short: 'Subcontratación',
        description:
          'Equipos organizados para reforzar la capacidad de ejecución de constructoras, empresas EPC e instaladoras, con un alcance, unos plazos y unas condiciones acordados previamente.',
        whatsapp:
          'Hola, estoy buscando capacidad de subcontratación para un proyecto energético o de construcción y me gustaría hablar con D.H. PRESTATION, S.L. sobre el alcance y los requisitos.',
      },
      construction: {
        title: 'Construcción y promoción inmobiliaria',
        short: 'Construcción',
        description:
          'Actividad de construcción y promoción inmobiliaria, complementaria a nuestros servicios de ejecución para terceros.',
        whatsapp:
          'Hola, me gustaría información sobre la actividad de construcción y promoción inmobiliaria de D.H. PRESTATION, S.L.',
      },
      machinery: {
        title: 'Comercio de maquinaria, herramientas y equipos',
        short: 'Maquinaria y equipos',
        description:
          'Comercio al por mayor y al por menor de maquinaria, herramientas y equipos. Consúltanos disponibilidad y condiciones.',
        whatsapp:
          'Hola, me gustaría consultar a D.H. PRESTATION, S.L. sobre maquinaria, herramientas o equipos. ¿Podemos hablar sobre lo que necesito?',
      },
    },
  },

  company: {
    eyebrow: 'Empresa',
    title: 'Un socio de ejecución en obra.',
    paragraphs: [
      'D.H. PRESTATION, S.L. es una empresa con domicilio en La Puebla del Río (Sevilla) dedicada a la ejecución de trabajos de montaje, instalación y construcción para contratistas principales, empresas EPC y promotores.',
      'Nuestro enfoque es práctico: equipos organizados, comunicación directa y coordinación continua con el responsable del proyecto, para que cada paquete de trabajo se ejecute según el alcance, la calidad y los plazos acordados.',
    ],
    teamSize: 'profesionales, aproximadamente',
    siteManager: 'Coordinados por un jefe de obra propio',
    qualitiesTitle: 'Cómo trabajamos',
    qualities: [
      {
        title: 'Comunicación directa',
        text: 'Un interlocutor claro y respuesta ágil por teléfono, correo electrónico o WhatsApp.',
      },
      {
        title: 'Equipos organizados',
        text: 'Personal organizado por tareas y frentes de trabajo, con responsabilidades definidas.',
      },
      {
        title: 'Coordinación con el contratista principal',
        text: 'Planificación conjunta y seguimiento con la dirección de obra durante toda la ejecución.',
      },
      {
        title: 'Adaptación al proyecto',
        text: 'Ajustamos recursos y organización a los requisitos y a la fase de cada obra.',
      },
      {
        title: 'Calidad y plazos acordados',
        text: 'Trabajo orientado a la calidad de ejecución y al cumplimiento del calendario pactado.',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Capacidades',
    title: 'Cómo colaboramos con el contratista principal.',
    intro:
      'Una forma de trabajo sencilla y transparente, pensada para integrarse en la organización de obra de empresas EPC, constructoras e instaladoras.',
    steps: [
      {
        title: 'Primer contacto',
        text: 'Conversación inicial sobre el proyecto, la ubicación, el tipo de trabajo y el calendario previsto.',
      },
      {
        title: 'Alcance y requisitos',
        text: 'Definición del paquete de trabajo, la documentación técnica, los requisitos de seguridad y las condiciones de colaboración.',
      },
      {
        title: 'Planificación de recursos',
        text: 'Organización de equipos, medios y fases de trabajo en coordinación con la planificación general de la obra.',
      },
      {
        title: 'Ejecución',
        text: 'Ejecución del paquete de trabajo acordado, siguiendo los procedimientos de la obra y las indicaciones de la dirección.',
      },
      {
        title: 'Seguimiento y comunicación',
        text: 'Comunicación continua con el equipo responsable del proyecto sobre avance, incidencias y próximos pasos.',
      },
    ],
    note: 'Enfoque de trabajo orientativo: cada colaboración se adapta a los requisitos del proyecto y del cliente.',
    audienceTitle: 'Pensado para',
    audience: [
      'Contratistas EPC',
      'Promotores de plantas fotovoltaicas',
      'Contratistas de energías renovables',
      'Empresas instaladoras solares',
      'Constructoras y contratistas generales',
      'Jefes de proyecto industrial y compras',
    ],
  },

  commitments: {
    eyebrow: 'Compromisos',
    title: 'Calidad, seguridad y colaboración.',
    intro: 'Los principios con los que afrontamos cada trabajo.',
    items: [
      {
        title: 'Profesionalidad',
        text: 'Trato serio y responsable con el cliente, con nuestros equipos y con el resto de empresas presentes en la obra.',
      },
      {
        title: 'Calidad de ejecución',
        text: 'Trabajo cuidadoso conforme a planos, especificaciones y criterios de calidad del proyecto.',
      },
      {
        title: 'Cumplimiento de plazos',
        text: 'Compromiso con el calendario acordado y aviso temprano ante cualquier incidencia.',
      },
      {
        title: 'Seguridad en el trabajo',
        text: 'Atención a la prevención de riesgos laborales y a los procedimientos aplicables en cada obra.',
      },
      {
        title: 'Flexibilidad',
        text: 'Adaptación a cambios de planificación y a las necesidades reales del proyecto.',
      },
      {
        title: 'Comunicación y colaboración',
        text: 'Información clara y coordinación fluida con el contratista principal y la dirección de obra.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos de tu proyecto.',
    lead: 'Cuéntanos qué necesitas: tipo de trabajo, ubicación y plazos. La vía más rápida es WhatsApp; también puedes llamarnos o escribirnos por correo electrónico.',
    whatsappCta: 'Escribir por WhatsApp',
    whatsappNote:
      'Se abrirá WhatsApp con un mensaje inicial que podrás revisar y editar antes de enviarlo.',
    whatsappMessage:
      'Hola, estoy interesado en conocer la capacidad de D.H. PRESTATION, S.L. para colaborar en un proyecto. ¿Podemos hablar sobre el alcance y los requisitos?',
    shortcutsTitle: 'O consulta directamente sobre un servicio',
    detailsTitle: 'Datos de contacto',
    phone: 'Teléfono',
    whatsapp: 'WhatsApp',
    email: 'Correo electrónico',
    emailGeneral: 'Información general',
    emailManagement: 'Gerencia',
    address: 'Domicilio social',
    nif: 'NIF',
  },

  footer: {
    description:
      'Montaje fotovoltaico, instalaciones eléctricas y subcontratación para proyectos solares y de construcción.',
    servicesTitle: 'Servicios',
    contactTitle: 'Contacto',
    languageTitle: 'Idioma',
    legalTitle: 'Información legal',
    privacy: 'Política de privacidad',
    legalNotice: 'Aviso legal',
    rights: 'Todos los derechos reservados.',
    illustrativeImages:
      'Las imágenes de este sitio son ilustrativas y no corresponden a proyectos ejecutados por la empresa.',
  },

  images: {
    hero: 'Planta solar fotovoltaica con filas de seguidores solares al atardecer',
    structures: 'Estructuras metálicas fotovoltaicas en montaje, todavía sin módulos',
    trackers: 'Fila de seguidores solares con módulos inclinados y tubo de torsión visible',
    modules: 'Fila de seguidores con módulos fotovoltaicos instalados en parte y palés de módulos',
    electrical: 'Centro de transformación y cajas eléctricas en una planta fotovoltaica',
    subcontracting: 'Vista aérea de una planta fotovoltaica en construcción con casetas de obra',
    construction: 'Estructura de hormigón de un edificio en construcción con grúa torre',
    machinery: 'Bobinas de cable, perfiles de acero y palés de material en un almacén exterior',
    company: 'Camino de acceso a una planta fotovoltaica con casetas de obra por la mañana',
  },

  legal: {
    draftNotice:
      'Borrador pendiente de revisión legal. Este texto debe ser revisado y aprobado antes de su publicación.',
    backHome: 'Volver al inicio',
    notice: (c) => ({
      title: 'Aviso legal',
      metaDescription: `Aviso legal e información del titular del sitio web de ${c.legalName}.`,
      updatedLabel: 'Última actualización',
      sections: [
        {
          heading: 'Datos identificativos',
          paragraphs: [
            'En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los datos del titular de este sitio web:',
          ],
          list: [
            `Denominación social: ${c.legalName}`,
            `NIF: ${c.nif}`,
            `Domicilio social: ${formatAddress(c.address)}`,
            `Correo electrónico: ${c.emails.general}`,
            `Teléfono: ${formatPhone(c.phones[0])}`,
            c.registry
              ? `Datos registrales: ${c.registry.registry}, tomo ${c.registry.tomo}, folio ${c.registry.folio}, hoja ${c.registry.hoja}`
              : 'Datos registrales: pendientes de completar',
          ],
        },
        {
          heading: 'Objeto',
          paragraphs: [
            'Este sitio web tiene carácter informativo y presenta la actividad y los servicios de la empresa. No permite la contratación en línea ni la recogida de datos mediante formularios.',
          ],
        },
        {
          heading: 'Condiciones de uso',
          paragraphs: [
            'El acceso a este sitio web es gratuito. Quien lo utiliza se compromete a hacer un uso adecuado de sus contenidos, de acuerdo con la ley, la buena fe y el presente aviso legal.',
          ],
        },
        {
          heading: 'Propiedad intelectual e industrial',
          paragraphs: [
            `Los textos, el logotipo y el diseño de este sitio web pertenecen a ${c.legalName} o se utilizan con la debida autorización. Queda prohibida su reproducción sin autorización previa.`,
            'Las imágenes del sitio son ilustrativas y no representan proyectos ejecutados por la empresa.',
          ],
        },
        {
          heading: 'Enlaces a servicios de terceros',
          paragraphs: [
            'El sitio incluye enlaces que abren servicios de terceros, como WhatsApp, el teléfono o el correo electrónico del dispositivo. Dichos servicios se rigen por sus propias condiciones y políticas.',
          ],
        },
        {
          heading: 'Responsabilidad',
          paragraphs: [
            'La empresa procura que la información publicada sea correcta y esté actualizada, pero no garantiza la ausencia de errores ni se responsabiliza del uso que se haga de ella. La información del sitio no constituye una oferta contractual.',
          ],
        },
        {
          heading: 'Legislación aplicable',
          paragraphs: ['Este aviso legal se rige por la legislación española.'],
        },
      ],
    }),
    privacy: (c) => ({
      title: 'Política de privacidad',
      metaDescription: `Información sobre el tratamiento de datos personales por parte de ${c.legalName}.`,
      updatedLabel: 'Última actualización',
      sections: [
        {
          heading: 'Responsable del tratamiento',
          paragraphs: [],
          list: [
            `Responsable: ${c.legalName}`,
            `NIF: ${c.nif}`,
            `Domicilio: ${formatAddress(c.address)}`,
            `Correo electrónico: ${c.emails.general}`,
          ],
        },
        {
          heading: 'Qué datos tratamos',
          paragraphs: [
            'Este sitio web no incluye formularios, no utiliza cookies y no incorpora herramientas de analítica ni de publicidad. Su código no recoge datos personales de forma automática.',
            'Solo tratamos los datos que nos facilitas voluntariamente al contactar con nosotros por teléfono, correo electrónico o WhatsApp, como tu nombre, tu empresa, tus datos de contacto y el contenido de tu consulta.',
          ],
        },
        {
          heading: 'Finalidad y base jurídica',
          paragraphs: [
            'Utilizamos esos datos para atender tu consulta, preparar propuestas y gestionar, en su caso, la relación comercial. La base jurídica es la aplicación de medidas precontractuales o la ejecución de un contrato (art. 6.1.b RGPD) y nuestro interés legítimo en responder a las consultas recibidas (art. 6.1.f RGPD).',
          ],
        },
        {
          heading: 'Conservación',
          paragraphs: [
            'Conservamos los datos durante el tiempo necesario para atender la consulta y, si se inicia una relación comercial, mientras esta se mantenga y durante los plazos exigidos por la ley.',
          ],
        },
        {
          heading: 'Destinatarios',
          paragraphs: [
            'No cedemos datos a terceros, salvo obligación legal. Los proveedores que nos prestan servicios técnicos, como el correo electrónico o el alojamiento web, pueden acceder a datos en calidad de encargados del tratamiento.',
          ],
        },
        {
          heading: 'WhatsApp',
          paragraphs: [
            'Los botones de WhatsApp abren la aplicación o la web de WhatsApp, un servicio prestado por WhatsApp Ireland Limited. El mensaje propuesto no se envía hasta que tú lo confirmas y puedes modificarlo antes. El uso de WhatsApp se rige por su propia política de privacidad y puede implicar transferencias internacionales de datos.',
          ],
        },
        {
          heading: 'Alojamiento y cookies',
          paragraphs: [
            'El proveedor de alojamiento del sitio puede registrar datos técnicos de acceso, como la dirección IP, por motivos de seguridad y funcionamiento.',
            'Este sitio web no utiliza cookies ni tecnologías similares. Si se incorporaran en el futuro, se informaría de ello y se solicitaría el consentimiento cuando fuera necesario.',
          ],
        },
        {
          heading: 'Tus derechos',
          paragraphs: [
            `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${c.emails.general}. Si consideras que tus derechos no se han respetado, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`,
          ],
        },
      ],
    }),
  },

  notFound: {
    title: 'Página no encontrada',
    text: 'La página que buscas no existe o ha cambiado de dirección.',
    cta: 'Volver al inicio',
  },
};

export default es;

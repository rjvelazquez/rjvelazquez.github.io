import { additionalCases } from './additional-cases.js';
import { captureAudit } from './capture-audit.js';

export const profile = {
  name: 'Roberto Velazquez',
  shortName: 'RV',
  title: 'Full-Stack & Mobile Developer',
  secondaryTitle: 'Product Builder · Automation · Technical Leadership',
  location: 'Cojedes, Venezuela · trabajo remoto internacional',
  email: 'rjvelazquez96@gmail.com',
  phone: '+58 412-9354940',
  phoneHref: '+584129354940',
  whatsapp: '584129354940',
  linkedin: 'https://www.linkedin.com/in/roberto-velazquez-55a718124/',
  github: 'https://github.com/rjvelazquez',
  agency: 'https://pixeocreativestudio.web.app/',
  portfolio: 'https://rjvelazquez.web.app/',
  summary:
    'Desarrollo productos web y móviles que conectan operación, negocio y tecnología. Mi experiencia combina interfaces, APIs, datos, cloud, automatización, soporte técnico y liderazgo de proyectos para clientes en Venezuela, Puerto Rico y otros mercados.',
  stats: [
    { value: '95', label: 'repositorios revisados' },
    { value: '15+', label: 'años en tecnología' },
    { value: 'Web · Mobile · IA', label: 'entrega multidisciplinaria' }
  ],
  experience: [
    {
      company: 'Pixeo Creative Studio',
      role: 'CEO & Líder de Desarrollo',
      period: 'Actualidad',
      location: 'Remoto',
      summary:
        'Dirección de proyectos digitales, levantamiento de requerimientos, arquitectura de soluciones y entrega de productos web, móviles y de automatización para clientes.'
    },
    {
      company: 'loVirtual · antes SUFPR Asistente Virtual',
      role: 'Desarrollo web y móvil',
      period: '2023 - presente',
      location: 'Puerto Rico · remoto',
      summary:
        'Desarrollo y mantenimiento de aplicaciones, sitios Joomla, Flutter, APIs con Node.js/Python, MySQL, AWS y soporte de entornos remotos.'
    },
    {
      company: 'VIG Mortgage Bank',
      role: 'Desarrollo web y móvil',
      period: '2023 - presente',
      location: 'Puerto Rico · remoto',
      summary:
        'Evolución del ecosistema digital: web, aplicaciones Flutter, pre-calificación, documentos, cotización, APIs e integraciones de firma electrónica.'
    },
    {
      company: 'Profesional independiente',
      role: 'Full-Stack Developer',
      period: '2019 - presente',
      location: 'Venezuela · remoto',
      summary:
        'Diseño y desarrollo de productos para comercio, deporte, salud, educación, entretenimiento y servicios profesionales.'
    },
    {
      company: 'IT Solutions',
      role: 'IT Solutions Specialist',
      period: '2020 - 2022',
      location: 'Colombia · remoto',
      summary:
        'VMware, desktop imaging, Active Directory, soporte técnico y resolución de incidencias de infraestructura.'
    },
    {
      company: 'Soporte técnico y programación',
      role: 'Técnico informático / Software Developer',
      period: '2011 - presente',
      location: 'Venezuela',
      summary:
        'Trayectoria en Help Desk, administración de sistemas, mantenimiento, automatización y desarrollo de software.'
    }
  ],
  education: [
    {
      institution: 'Universidad Nacional Abierta',
      degree: 'Ingeniería en Sistemas',
      period: '2016 - 2021'
    },
    {
      institution: 'Universidad Deportiva del Sur',
      degree: 'Licenciatura en Entrenamiento Deportivo',
      period: '2014 - 2018'
    }
  ],
  courses: [
    'Curso Profesional de Desarrollo Web',
    'Taller Crea tu primera app con React',
    'Introducción al Desarrollo Web I'
  ],
  languages: ['Español · nativo', 'Inglés · básico', 'Árabe · básico'],
  skillGroups: [
    {
      title: 'Producto & Frontend',
      items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Flutter', 'HTML', 'CSS', 'Material UI', 'Tailwind']
    },
    {
      title: 'Backend & Datos',
      items: ['Node.js', 'NestJS', 'PHP', 'Laravel', 'Python', 'REST APIs', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis']
    },
    {
      title: 'Cloud & Operación',
      items: ['Firebase', 'AWS', 'Google Cloud', 'Docker', 'Git', 'VMware', 'Active Directory', 'ServiceNow']
    },
    {
      title: 'IA & Automatización',
      items: ['Gemini', 'Genkit', 'MediaPipe', 'Agentes IA', 'WhatsApp', 'Email automation', 'Computer Vision', 'Workflows']
    }
  ]
};

const baselineCases = [
  {
    id: 'vamonos',
    name: 'Vámonos VE',
    kicker: 'Mobility · Delivery · FinTech',
    summary: 'Super app para taxi, mototaxi, delivery, comercios locales y billetera digital con tasa BCV.',
    role: 'Producto, arquitectura y desarrollo full stack/móvil',
    stack: ['Flutter', 'React Admin', 'NestJS', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
    url: 'https://vamonos-ve.com/',
    image: '/assets/img/projects/vamonos.webp',
    status: 'Producción',
    featured: true,
    categories: ['mobile', 'backend', 'fintech', 'production']
  },
  {
    id: 'fast-sport-timing',
    name: 'Fast Sport Timing',
    kicker: 'SportTech · RFID',
    summary: 'Gestión de eventos, inscripciones, cronometraje digital y publicación de resultados deportivos.',
    role: 'Desarrollo de producto y evolución full stack',
    stack: ['Next.js', 'React', 'Firebase', 'Functions', 'RFID', 'Playwright', 'Sentry'],
    url: 'https://fastsporttiming.com/',
    image: '/assets/img/projects/fast-sport-timing.webp',
    status: 'Producción',
    featured: true,
    categories: ['web', 'backend', 'sporttech', 'production']
  },
  {
    id: 'multi-platform-pr',
    name: 'Multi Platform PR',
    kicker: 'HealthTech · Puerto Rico',
    summary: 'Sistema de gestión clínica para centralizar pacientes, planes médicos, documentos y procesos operativos.',
    role: 'Desarrollo full stack e integración de procesos',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Microsoft 365', 'AWS', 'Automatización documental'],
    url: 'https://multiplatformpr.com/',
    image: '',
    visual: 'health',
    status: 'Producción',
    featured: true,
    categories: ['web', 'backend', 'healthtech', 'production']
  },
  {
    id: 'vale-pintos',
    name: 'Vale Pintos',
    kicker: 'Music · Community · Content',
    summary: 'Sitio oficial de artista con lanzamientos, música, vídeos, eventos, comunidad VIP y automatización de contenido.',
    role: 'Desarrollo de plataforma digital',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind', 'MongoDB', 'SEO', 'APIs sociales'],
    url: 'https://valepintos.net/',
    image: '/assets/img/projects/vale-pintos.webp',
    status: 'Producción',
    featured: true,
    categories: ['web', 'backend', 'entertainment', 'production']
  },
  {
    id: 'brytiago',
    name: 'Brytiago',
    kicker: 'Music · E-commerce · Content',
    summary: 'Sitio oficial del artista con música, vídeos, biografía, contacto y tienda de mercancía exclusiva.',
    role: 'Desarrollo y evolución de plataforma digital',
    stack: ['Shopify', 'Liquid', 'JavaScript', 'E-commerce', 'SEO', 'Integraciones musicales'],
    url: 'https://brytiago.net/',
    image: '/assets/img/projects/brytiago.png',
    status: 'Producción · sin repositorio asociado',
    featured: true,
    categories: ['web', 'commerce', 'entertainment', 'production']
  },
  {
    id: 'vig-mortgage',
    name: 'VIG Mortgage Bank',
    kicker: 'Mortgage · Web & Mobile',
    summary: 'Ecosistema digital con web multilingüe, apps móviles, pre-calificación, cotización, documentos y firma.',
    role: 'Desarrollo web y móvil · 2023 - presente',
    stack: ['Joomla', 'Next.js', 'Flutter', 'Node.js', 'AWS', 'SignNow', 'REST APIs'],
    url: 'https://vigpr.com/',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.vigmortgage.apploans' },
      { label: 'App Store', url: 'https://apps.apple.com/us/app/vig-mortgage-loans/id1631419802' }
    ],
    image: '/assets/img/portfolio/site-vig-mortgage-pr.svg',
    status: 'Producción',
    featured: true,
    categories: ['web', 'mobile', 'backend', 'fintech', 'production']
  },
  {
    id: 'pixeo',
    name: 'Pixeo Creative Studio',
    kicker: 'Agency · Product Leadership',
    summary: 'Agencia desde la que lidero proyectos de desarrollo, automatización, marketing y soluciones digitales.',
    role: 'CEO & Líder de Desarrollo',
    stack: ['Product discovery', 'Full stack', 'Cloud', 'IA', 'Automatización', 'Marketing digital'],
    url: 'https://pixeocreativestudio.com/',
    image: '/assets/img/projects/pixeo.webp',
    status: 'Producción',
    featured: true,
    categories: ['web', 'leadership', 'automation', 'production']
  },
  {
    id: 'rifa-gana-con-martin',
    name: 'Rifa Gana con Martín',
    kicker: 'Commerce · Operations',
    summary: 'Plataforma de sorteos con compra, disponibilidad, comprobantes, pagos, notificaciones y panel administrativo.',
    role: 'Desarrollo de producto y operación',
    stack: ['React', 'Firebase', 'Firestore', 'Functions', 'Storage', 'Email', 'WhatsApp'],
    url: 'https://rifaganaconmartin.com/',
    image: '/assets/img/portfolio/rgcm.webp',
    status: 'Producción',
    featured: true,
    categories: ['web', 'backend', 'commerce', 'production']
  },
  {
    id: 'smart-money',
    name: 'Smart Money Vzla',
    kicker: 'FinTech · Web & Mobile',
    summary: 'Ecosistema para tasas, envío y recepción de divisas, métodos de pago y consulta multimoneda.',
    role: 'Desarrollo web, móvil e integración de datos',
    stack: ['React', 'Flutter', 'Firebase', 'Node.js', 'APIs de tasas'],
    url: 'https://smart-money-vzla.web.app/',
    image: '/assets/img/projects/smart-money.webp',
    status: 'Producción',
    featured: true,
    categories: ['web', 'mobile', 'fintech', 'production']
  },
  {
    id: 'hapkido-cojedes',
    name: 'Hapkido Cojedes',
    kicker: 'SportTech · Community',
    summary: 'Presencia institucional, patrocinios, calendario, galería y sistemas de gestión/competición para la asociación.',
    role: 'Desarrollo web y productos deportivos',
    stack: ['React', 'Firebase', 'PHP', 'Computer Vision', 'MediaPipe', 'WebRTC'],
    url: 'https://hapkidocojedes.web.app/',
    image: '/assets/img/projects/hapkido-cojedes.webp',
    status: 'Producción',
    featured: true,
    categories: ['web', 'ai', 'sporttech', 'production']
  },
  {
    id: 'san-plus',
    name: 'San Plus',
    kicker: 'Savings · Community',
    summary: 'Sistema para administrar sanes: grupos de ahorro rotativo en dinero, bolsos u otros artículos, populares en Venezuela.',
    role: 'Diseño y desarrollo de producto',
    stack: ['Next.js', 'Firebase', 'Genkit', 'Google AI', 'Material UI', 'Tailwind'],
    url: 'https://san-plus.web.app/',
    image: '/assets/img/projects/san-plus.webp',
    status: 'Producción',
    featured: true,
    categories: ['web', 'ai', 'fintech', 'production']
  },
  {
    id: 'liz-lizu',
    name: 'Liz Lizu',
    kicker: 'Catalog · Commerce',
    summary: 'Catálogo administrable de productos importados con búsqueda, filtros y consulta directa por WhatsApp.',
    role: 'Diseño y desarrollo web',
    stack: ['Web app', 'Firebase Hosting', 'Catálogo', 'WhatsApp'],
    url: 'https://liz-lizu-catalog.web.app/',
    image: '/assets/img/projects/liz-lizu.webp',
    status: 'Producción · sin repositorio asociado',
    featured: true,
    categories: ['web', 'commerce', 'production']
  },
  {
    id: 'vivir-en-compania',
    name: 'Vivir en Compañía',
    kicker: 'Community · Local',
    summary: 'Landing para descubrir, conectar y crear comunidad en Santa Cruz del Comercio.',
    role: 'Diseño y desarrollo web',
    stack: ['HTML', 'CSS', 'JavaScript', 'Firebase Hosting'],
    url: 'https://vivir-en-compania.web.app/',
    image: '/assets/img/projects/vivir-en-compania.webp',
    status: 'Producción',
    featured: false,
    categories: ['web', 'community', 'production']
  },
  {
    id: 'sin-tabu',
    name: 'Sin Tabú',
    kicker: 'PWA · Interactive Experience',
    summary: 'Juego web de verdad o reto para parejas y grupos, con creación y administración de cartas.',
    role: 'Diseño y desarrollo PWA',
    stack: ['HTML', 'CSS', 'JavaScript', 'PWA', 'Firebase Hosting'],
    url: 'https://sin-tabu-app-ve.web.app/',
    image: '/assets/img/projects/sin-tabu.webp',
    status: 'Producción',
    featured: false,
    categories: ['web', 'pwa', 'production']
  },
  {
    id: 'iberocams',
    name: 'IberoCams Admin',
    kicker: 'Dashboard · Automation',
    summary: 'Panel administrativo para gestión de usuarios, estadísticas y automatización de correos y publicaciones.',
    role: 'Desarrollo full stack',
    stack: ['Symfony/PHP', 'MySQL', 'JavaScript', 'Email automation'],
    url: '',
    image: '/assets/img/portfolio/iberocams.svg',
    status: 'Proyecto histórico',
    featured: false,
    categories: ['web', 'backend', 'historical']
  },
  {
    id: 'team-warriors',
    name: 'MTB Team Warriors',
    kicker: 'Sports · Community',
    summary: 'Sitio oficial y presencia digital para un equipo de mountain bike.',
    role: 'Diseño y desarrollo web',
    stack: ['WordPress', 'HTML', 'CSS', 'JavaScript'],
    url: '',
    image: '/assets/img/portfolio/teamwarriorsmtb.svg',
    status: 'Proyecto histórico',
    featured: false,
    categories: ['web', 'sporttech', 'historical']
  },
  {
    id: 'sgcc',
    name: 'SGCC',
    kicker: 'CivicTech · Open Source',
    summary: 'Sistema integral para usuarios, comunidades, productos, ventas, reportes y operación de consejos comunales.',
    role: 'Diseño y desarrollo full stack',
    stack: ['PHP', 'JavaScript', 'CSS', 'MySQL'],
    url: 'https://github.com/rjvelazquez/SGCC',
    image: '/assets/img/portfolio/sgcc.svg',
    status: 'Código público',
    featured: false,
    categories: ['web', 'backend', 'open-source']
  },
  {
    id: 'rfid-timing',
    name: 'Sistema de Cronometraje RFID',
    kicker: 'Hardware · SportTech',
    summary: 'Sistema de cronometraje para carreras deportivas mediante chips RFID y aplicación de escritorio.',
    role: 'Diseño técnico y desarrollo',
    stack: ['C#', '.NET', 'Arduino', 'RFID'],
    url: '',
    image: '/assets/img/portfolio/time-system.svg',
    status: 'Prototipo',
    featured: false,
    categories: ['desktop', 'sporttech', 'prototype']
  },
  {
    id: 'residencia-santa-cruz',
    name: 'Residencia Santa Cruz',
    kicker: 'Real Estate · Web',
    summary: 'Sitio oficial para presentar un proyecto arquitectónico y su propuesta residencial.',
    role: 'Diseño y desarrollo web',
    stack: ['WordPress', 'HTML', 'CSS'],
    url: '',
    image: '/assets/img/portfolio/residencia-santa-cruz.svg',
    status: 'Proyecto histórico',
    featured: false,
    categories: ['web', 'historical']
  },
  {
    id: 'winnbags',
    name: 'Winnbags',
    kicker: 'Investment Platform',
    summary: 'Plataforma financiera con panel administrativo, webhooks y automatización de mensajería.',
    role: 'Desarrollo e integraciones',
    stack: ['PHP', 'AdminLTE', 'Webhooks', 'WhatsApp APIs'],
    url: 'https://www.winnbags.com/',
    image: '/assets/img/portfolio/winnbags.svg',
    status: 'Producción',
    featured: false,
    categories: ['web', 'backend', 'fintech', 'production']
  },
  {
    id: 'oea-cbms',
    name: 'OEA-CBMS',
    kicker: 'Institutional Platform · Private',
    summary: 'Portal modular para proyectos, capacitación, eventos, contactos, políticas, amenazas y estados de implementación.',
    role: 'Arquitectura y desarrollo modular',
    stack: ['Joomla 5', 'PHP 8.3', 'SQL', 'ACL', 'Docker'],
    url: '',
    image: '',
    visual: 'institutional',
    status: 'Proyecto privado',
    featured: false,
    categories: ['web', 'backend', 'private']
  },
  {
    id: 'smartfile-organizer',
    name: 'SmartFile Organizer',
    kicker: 'Desktop · Local-first',
    summary: 'Aplicación Windows para auditoría de disco, duplicados y organización segura mediante acciones reversibles.',
    role: 'Diseño de producto e ingeniería desktop',
    stack: ['Python', 'PySide6', 'SQLite', 'USN Journal', 'SHA-256', 'PyInstaller'],
    url: '',
    image: '',
    visual: 'desktop',
    status: 'Proyecto privado',
    featured: false,
    categories: ['desktop', 'security', 'private']
  },
  {
    id: 'topee-topee',
    name: 'Topee Topee',
    kicker: 'SaaS · Daycare',
    summary: 'Sistema para gestión de niños, pagos, recibos, calendario y operación administrativa de centros de cuidado.',
    role: 'Desarrollo full stack',
    stack: ['React', 'Redux', 'AWS Amplify', 'Cognito', 'Node.js', 'Clover'],
    url: '',
    image: '',
    visual: 'education',
    status: 'Proyecto privado',
    featured: false,
    categories: ['web', 'backend', 'education', 'private']
  },
  {
    id: 'pixeoflow-ai',
    name: 'PixeoFlow AI & LeadEngine',
    kicker: 'AI · Automation · CRM',
    summary: 'CRM multiempresa y motor de prospección con agentes IA, WhatsApp, calendario, scraping y handoff humano.',
    role: 'Arquitectura de producto y automatización',
    stack: ['Frappe', 'FastAPI', 'Gemini', 'n8n', 'Playwright', 'WhatsApp Cloud API'],
    url: '',
    image: '',
    visual: 'ai',
    status: 'Proyecto privado',
    featured: false,
    categories: ['ai', 'automation', 'backend', 'private']
  }
];

const repositoryGroups = [
  {
    id: 'portfolio',
    name: 'Portafolio personal',
    summary: 'Portafolio profesional, PWA, SEO, accesibilidad y Firebase Hosting.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    visibility: 'public',
    repos: ['rjvelazquez.github.io']
  },
  {
    id: 'open-source',
    name: 'Código abierto y laboratorios',
    summary: 'Herramientas, sistemas administrativos y demostraciones técnicas publicadas en GitHub.',
    tech: ['PHP', 'JavaScript', 'C#', 'PowerShell', 'Angular', 'Laravel'],
    visibility: 'public',
    repos: [
      'administradordeprocesoswin',
      'hapkido-cojedes-admin',
      { name: 'modulo-php-resultados-wts', status: 'Vacío' },
      { name: 'nodejs', status: 'Laboratorio' },
      'SGCC',
      'Sistema-de-Inventario',
      'TestLaravelAngular',
      { name: 'webhook', status: 'Laboratorio' }
    ]
  },
  {
    id: 'forks',
    name: 'Forks y exploración',
    summary: 'Repositorios de terceros conservados para exploración; no se atribuyen como autoría original.',
    tech: ['Exploración técnica'],
    visibility: 'public',
    repos: [
      { name: 'awesome-deepseek-integration', status: 'Fork' },
      { name: 'NextChat', status: 'Fork' },
      { name: 'Pixeo-2048', status: 'Fork' }
    ]
  },
  {
    id: 'oea-cbms',
    name: 'OEA-CBMS',
    summary: 'Portal institucional modular con proyectos, capacitación, eventos, ACL y herramientas de validación.',
    tech: ['Joomla', 'PHP', 'SQL', 'ACL', 'Docker'],
    visibility: 'private',
    repos: ['oea-cbms', { name: 'oea-cbms-2026', status: 'Iniciativa' }, 'OEA_CBMS_2026']
  },
  {
    id: 'multi-platform-pr',
    name: 'Multi Platform PR · gestión clínica',
    summary: 'Sistema HealthTech para pacientes, planes médicos, documentos, comunicaciones y procesos de clínicas en Puerto Rico.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Microsoft Graph'],
    visibility: 'private',
    repos: ['mhcpfrontend', 'MHPFrontend', 'mhcp-frontend', 'MHPBackend']
  },
  {
    id: 'admin-web',
    name: 'Web y administración general',
    summary: 'Sitios, dashboards, calendarios, utilidades y paneles administrativos.',
    tech: ['React', 'PHP', 'Firebase', 'FullCalendar', 'Bootstrap'],
    visibility: 'private',
    repos: ['advantage', 'PCS-Admin', 'calculadora', 'admin-webcam-site', 'calendario', 'websimple']
  },
  {
    id: 'topee-topee',
    name: 'Topee Topee',
    summary: 'SaaS para operación de daycare, niños, pagos, recibos, calendarios y administración.',
    tech: ['React', 'Redux', 'AWS Amplify', 'Cognito', 'Node.js'],
    visibility: 'private',
    repos: ['topeetopeebackend', 'Frontend-Topee-Topee', 'Frontend-Topee-Topee-Final']
  },
  {
    id: 'rifas',
    name: 'Rifas, sorteos y operación comercial',
    summary: 'Clientes, paneles administrativos, pagos, disponibilidad, comprobantes, notificaciones y apps de sorteos.',
    tech: ['React', 'Flutter', 'Firebase', 'Supabase', 'Node.js'],
    visibility: 'private',
    repos: [
      'rifasquemantequilla',
      'gcbemadm',
      'gana-con-bendicion-en-manos',
      'rqmadm',
      'rifas-gana-con-martin',
      'rgcmadm',
      'Sortiva',
      'Sorteos-360',
      'SorteosVzlaBackend'
    ]
  },
  {
    id: 'fast-sport-timing',
    name: 'Fast Sport Timing / Smart Timing',
    summary: 'Inscripciones, cronometraje, resultados deportivos y evolución de integración RFID.',
    tech: ['Next.js', 'PHP', 'Node.js', 'Firebase', 'MySQL', 'C#', 'RFID'],
    visibility: 'private',
    repos: ['sport-timing', 'smarttimingvzlaresultbackend', 'smarttimingvzla', 'resultados', 'time-system-rfid']
  },
  {
    id: 'smart-money',
    name: 'Smart Money',
    summary: 'Web, aplicaciones móviles y API de datos para tasas, divisas y métodos de pago.',
    tech: ['React', 'Flutter', 'Firebase', 'Node.js'],
    visibility: 'private',
    repos: ['smartmoney', 'Smart-Money-Vzla', 'smartmoney-vzla', 'Api-Dolar', 'Smart-Money-Web', 'smart_money_vzla', 'Smart-Money-App']
  },
  {
    id: 'pixeo-automation',
    name: 'Pixeo · IA, automatización y contenido',
    summary: 'CRM, bots, mensajería, prospección B2B, automatización social y herramientas para la agencia.',
    tech: ['Frappe', 'FastAPI', 'Gemini', 'WhatsApp', 'n8n', 'Playwright'],
    visibility: 'private',
    repos: ['frontendig', 'pixeoflow-ai', 'Pixiebot', 'whatsapp-client-test', 'pixceocreativestudio', 'whatsapp-notificaciones', 'pixeo-leadengine', 'Script-Email-Masivos']
  },
  {
    id: 'vale-pintos',
    name: 'Vale Pintos',
    summary: 'Plataforma musical, aplicación y automatización de contenido social.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'MongoDB'],
    visibility: 'private',
    repos: ['valepintos-website', 'valepintosapp', 'instagram-backend']
  },
  {
    id: 'vig-mortgage',
    name: 'VIG Mortgage',
    summary: 'Web, modernización, pre-calificación, cotización, documentos, PDF y firma electrónica.',
    tech: ['Joomla', 'Next.js', 'PHP', 'Node.js', 'AWS', 'SignNow'],
    visibility: 'private',
    repos: ['vigmortgagedocs', 'Cotizador-VIG', 'vigpr-2.0', 'prequalify', 'SignNowNodeSDKVIG', 'landing-vig-old', 'vigpr-2026-nextjs', { name: 'prequalify_dev', status: 'Vacío' }]
  },
  {
    id: 'hapkido',
    name: 'Hapkido y sistemas de competencia',
    summary: 'Gestión de asociación, marcadores, torneos, revisión de combate y corrección de postura con visión computacional.',
    tech: ['React', 'Firebase', 'MediaPipe', 'WebRTC', 'Docker', 'PDF'],
    visibility: 'private',
    repos: ['HKD-Cojedes', 'hapkido-score-system', 'Hapkido-VAR-System', 'martial-score', 'Hapkido', 'system-competition-hapkido']
  },
  {
    id: 'study-learn',
    name: 'Study & Learn / Sanarte Academy',
    summary: 'Sitio educativo, POS, firma documental y plataforma de cursos/descargas.',
    tech: ['PHP', 'React', 'Docker', 'Twilio', 'Google APIs'],
    visibility: 'private',
    repos: ['pos.studyandlearnpr.com', 'studyandlearnpr.com', 'sanarte-academy', 'sign.studyandlearnpr.com']
  },
  {
    id: 'rueda-corre',
    name: 'Rueda y Corre',
    summary: 'Sitio, inscripciones, API y administración para eventos deportivos.',
    tech: ['PHP', 'MySQL', 'Node.js', 'JWT', 'Bootstrap'],
    visibility: 'private',
    repos: ['ruedaycorre.com', 'ruedaycorreBackend', 'RuedaYCorreadmin', 'rueda-y-corre-admin']
  },
  {
    id: 'san-plus',
    name: 'San Plus',
    summary: 'Gestión de grupos de ahorro rotativo en dinero o artículos.',
    tech: ['Next.js', 'Firebase', 'Genkit', 'Google AI'],
    visibility: 'private',
    repos: ['SanPlus']
  },
  {
    id: 'sin-tabu',
    name: 'Sin Tabú',
    summary: 'Juego PWA interactivo de verdad o reto con editor de contenido.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PWA'],
    visibility: 'private',
    repos: ['sin-tabu']
  },
  {
    id: 'vivir-en-compania',
    name: 'Vivir en Compañía',
    summary: 'Landing comunitaria para Santa Cruz del Comercio.',
    tech: ['HTML', 'Firebase Hosting'],
    visibility: 'private',
    repos: ['Vivir-en-Compania']
  },
  {
    id: 'smartfile',
    name: 'SmartFile Organizer',
    summary: 'Aplicación desktop local-first para análisis y organización segura de archivos.',
    tech: ['Python', 'PySide6', 'SQLite', 'PyInstaller'],
    visibility: 'private',
    repos: ['SmartFile-Organizer']
  },
  {
    id: 'vamonos',
    name: 'Vámonos',
    summary: 'Super app de movilidad, delivery, comercios y pagos locales.',
    tech: ['Flutter', 'React', 'NestJS', 'PostgreSQL', 'MongoDB', 'Redis'],
    visibility: 'private',
    repos: ['vamonos']
  },
  {
    id: 'utilities',
    name: 'Pagos, mensajería y utilidades cloud',
    summary: 'Webhooks, reenvío de SMS, archivos S3, conversión PDF/imágenes y automatización operativa.',
    tech: ['PHP', 'Flutter', 'Node.js', 'AWS S3', 'PDF'],
    visibility: 'private',
    repos: ['winnbags', 'sms_forwarder_pro', 'conversorS3Base64']
  },
  {
    id: 'clover',
    name: 'Clover y pagos',
    summary: 'Servicio de integración y laboratorio UI para pagos Clover.',
    tech: ['Node.js', 'Express', 'SQLite', 'Next.js'],
    visibility: 'private',
    repos: ['cloverapi', 'clover-tester-react']
  },
  {
    id: 'ai-rd',
    name: 'IA y prototipos de investigación',
    summary: 'Bases SaaS y experimentación con trading algorítmico, backtesting y modelos de machine learning.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'CCXT', 'XGBoost'],
    visibility: 'private',
    repos: ['Sentinel-AI', 'Agente-de-IA-Trading', { name: 'Agente-de-IA-para-Trading', status: 'Vacío' }]
  }
];

const repositoryCaseIds = {
  'Hapkido-VAR-System': 'hapkido-var-system', 'Sentinel-AI': 'sentinel-ai',
  'pixeo-leadengine': 'pixeoflow-ai', Pixiebot: 'pixeoflow-ai',
  'PCS-Admin': 'pcs-admin',
  calendario: 'calendario-operativo',
  administradordeprocesoswin: 'administrador-procesos', 'hapkido-cojedes-admin': 'hapkido-cojedes',
  SGCC: 'sgcc', 'websimple': 'hrglobalandco',
  rifasquemantequilla: 'rifas-que-mantequilla', rqmadm: 'rifas-que-mantequilla',
  gcbemadm: 'gana-con-bendicion', 'gana-con-bendicion-en-manos': 'gana-con-bendicion',
  'rifas-gana-con-martin': 'rifa-gana-con-martin', rgcmadm: 'rifa-gana-con-martin',
  Sortiva: 'sortiva', 'Sorteos-360': 'sorteos-vzla', SorteosVzlaBackend: 'sorteos-vzla',
  'pixeoflow-ai': 'pixeoflow-ai', pixceocreativestudio: 'pixeo',
  'whatsapp-notificaciones': 'whatsapp-notification-api',
  'HKD-Cojedes': 'hapkido-cojedes', 'hapkido-score-system': 'hapkido-score-system',
  'martial-score': 'martial-score', Hapkido: 'hapkido-hyung-coach',
  'system-competition-hapkido': 'system-competition-hapkido',
  'pos.studyandlearnpr.com': 'study-learn-pos', 'sign.studyandlearnpr.com': 'study-learn-sign',
  'ruedaycorre.com': 'rueda-y-corre', ruedaycorreBackend: 'rueda-y-corre',
  RuedaYCorreadmin: 'rueda-y-corre', 'rueda-y-corre-admin': 'rueda-y-corre',
  'SmartFile-Organizer': 'smartfile-organizer', winnbags: 'winnbags',
  sms_forwarder_pro: 'sms-forwarder-pro', conversorS3Base64: 's3-mortgagebot',
  cloverapi: 'topee-topee', 'clover-tester-react': 'topee-topee',
};
const knownCaseIds = new Set([...baselineCases, ...additionalCases].map((project) => project.id));

export const repositories = repositoryGroups.flatMap((group) =>
  group.repos.map((repository) => {
    const repo = typeof repository === 'string' ? { name: repository } : repository;
    return {
      name: repo.name,
      groupId: group.id,
      productId: repositoryCaseIds[repo.name] || (knownCaseIds.has(group.id) ? group.id : null),
      product: group.name,
      summary: repo.summary || group.summary,
      tech: repo.tech || group.tech,
      visibility: group.visibility,
      status: repo.status || (group.visibility === 'public' ? 'Público' : 'Privado'),
      url: group.visibility === 'public' ? `https://github.com/rjvelazquez/${repo.name}` : ''
    };
  })
);

export const filters = [
  ['all', 'Todos'],
  ['production', 'Producción'],
  ['web', 'Web'],
  ['mobile', 'Mobile'],
  ['backend', 'Backend'],
  ['ai', 'IA'],
  ['automation', 'Automatización'],
  ['fintech', 'FinTech'],
  ['sporttech', 'SportTech'],
  ['desktop', 'Escritorio'],
  ['prototype', 'Prototipos'],
  ['private', 'Privados']
];


export const cases = [...baselineCases, ...additionalCases].map((project) => {
  const capture = captureAudit.find((entry) => entry.id === project.id);
  const result = { ...project, categories: [...project.categories] };
  if (capture?.verdict === 'valid') {
    Object.assign(result, {
      image: capture.image, imageType: 'live', captureVerifiedAt: capture.verifiedAt,
      imageCaption: `Captura pública verificada · ${capture.verifiedAt.slice(0, 10)}`,
      url: capture.finalUrl.split('?')[0],
    });
    if (['hapkido-score-system', 'gana-con-bendicion'].includes(project.id)) {
      result.status = 'Producción';
      if (!result.categories.includes('production')) result.categories.push('production');
    }
  } else if (capture) {
    result.image = '';
    result.imageType = 'cover';
    result.captureVerifiedAt = capture.verifiedAt;
    result.imageCaption = 'Portada ilustrativa · interfaz pública no disponible';
    result.captureNote = capture.reason;
    if (/Site Not Found|DNS/.test(capture.reason)) {
      result.url = '';
      result.categories = result.categories.filter((category) => category !== 'production');
    }
    if (project.id === 'hapkido-hyung-coach') result.url = 'https://hapkido.vercel.app/';
    if (project.id === 'rifa-gana-con-martin') {
      result.status = 'Sitio pausado';
      result.categories = result.categories.filter((category) => category !== 'production');
    }
  } else {
    result.imageType = result.image?.endsWith('.svg') || !result.image ? 'cover' : 'historical';
    result.imageCaption = result.imageType === 'cover'
      ? 'Portada ilustrativa · sin captura pública verificada'
      : 'Captura histórica · pendiente de actualización';
  }
  return result;
}).sort((a, b) => {
  const priority = ['vamonos', 'hapkido-score-system', 'fast-sport-timing'];
  return (priority.includes(a.id) ? priority.indexOf(a.id) : priority.length)
    - (priority.includes(b.id) ? priority.indexOf(b.id) : priority.length);
});

profile.stats[0].value = String(repositories.length);

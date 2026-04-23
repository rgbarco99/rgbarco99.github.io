/* =====================================================================
   i18n.js — Sistema de internacionalización del portfolio
   Idiomas soportados: es (por defecto), en, fr
   ===================================================================== */

const TRANSLATIONS = {

  /* ──────────────────────────────────────────
     ESPAÑOL
  ────────────────────────────────────────── */
  es: {
    // Nav
    'nav.home':     'Inicio',
    'nav.skills':   'Skills',
    'nav.projects': 'Proyectos',
    'nav.cv':       'Currículum',
    'nav.contact':  'Contacto',

    // Hero
    'hero.greeting':     '👋 Hola, soy',
    'hero.bio':          'Especialista SAP con experiencia en desarrollo Fiori y ABAP. Apasionado por construir soluciones empresariales elegantes, robustas y de alto rendimiento.',
    'hero.btn.projects': 'Ver proyectos',
    'hero.btn.cv':       'Descargar CV',
    'hero.badge':        'Disponible para proyectos',
    'hero.typewriter':   ['Desarrollador SAP Fiori', 'Programador ABAP', 'Consultor SAP', 'Apasionado por la tecnología'],

    // About / Stats
    'about.label':    'Mi especialidad',
    'about.title':    'SAP Fiori & ABAP',
    'about.subtitle': 'Con más de 5 años de experiencia en el ecosistema SAP, he participado en proyectos de transformación digital para empresas de distintos sectores.',
    'stat1.label':    'Años en SAP',
    'stat2.label':    'Proyectos SAP',
    'stat3.label':    'Clientes',

    // Expertise areas
    'exp.fiori.title': 'SAP Fiori',
    'exp.fiori.desc':  'Desarrollo de aplicaciones Fiori con SAPUI5, Freestyle y SAP Build. Creación de tiles, roles y customizaciones avanzadas del Launchpad.',
    'exp.abap.title':  'ABAP',
    'exp.abap.desc':   'Programación ABAP clásico y RESTful Application Programming (RAP). Reports, BADIs, User Exits, OData Services, CDS Views y SmartForms.',

    // Clients
    'clients.label':    'Trayectoria',
    'clients.title':    'Clientes con los que he trabajado',
    'clients.subtitle': 'He tenido la oportunidad de participar en proyectos SAP para empresas de distintos sectores industriales.',

    // Skills
    'skills.label':    'Tecnologías',
    'skills.title':    'Mi stack técnico',
    'skills.subtitle': 'Plataformas, lenguajes y herramientas con los que desarrollo en el día a día.',

    // CV
    'cv.label':    'Currículum',
    'cv.title':    'Descarga mi CV',
    'cv.subtitle': 'Disponible en tres idiomas. Elige el que prefieras y descárgalo directamente.',
    'cv.es.lang':  'Español',
    'cv.es.sub':   'Versión en castellano',
    'cv.es.btn':   'Descargar',
    'cv.en.lang':  'English',
    'cv.en.sub':   'English version',
    'cv.en.btn':   'Download',
    'cv.fr.lang':  'Français',
    'cv.fr.sub':   'Version française',
    'cv.fr.btn':   'Télécharger',

    // Footer
    'footer.brand.desc':    'Especialista SAP Fiori & ABAP apasionado por construir soluciones empresariales robustas. Siempre abierto a nuevos retos.',
    'footer.nav.title':     'Navegación',
    'footer.contact.title': 'Contacto',
    'footer.copyright':     '© 2025 Rubén García. Todos los derechos reservados.',
    'footer.made':          'Hecho con mucho café',

    // Projects page
    'projects.label':       'Portafolio',
    'projects.title':       'Mis Proyectos',
    'projects.subtitle':    'Ideas convertidas en realidad. Explora todo lo que he construido y experimentado.',
    'projects.search':      'Buscar por nombre, tecnología o descripción…',
    'projects.filter.all':  'Todos',
    'projects.filter.web':  '🌐 Web',
    'projects.filter.data': '📊 Data',
    'projects.filter.mob':  '📱 Mobile',
    'projects.filter.ia':   '🤖 IA / ML',
    'projects.filter.tool': '🔧 Herramienta',
    'projects.noresults':   'No se encontraron proyectos con ese criterio.',
    'projects.noresults2':  'Prueba con otro término o selecciona "Todos".',
    'projects.view':        'Ver proyecto',
    'projects.source':      'GitHub',
  },

  /* ──────────────────────────────────────────
     ENGLISH
  ────────────────────────────────────────── */
  en: {
    'nav.home':     'Home',
    'nav.skills':   'Skills',
    'nav.projects': 'Projects',
    'nav.cv':       'Resume',
    'nav.contact':  'Contact',

    'hero.greeting':     '👋 Hi, I\'m',
    'hero.bio':          'SAP specialist with experience in Fiori and ABAP development. Passionate about building elegant, robust and high-performance enterprise solutions.',
    'hero.btn.projects': 'View projects',
    'hero.btn.cv':       'Download CV',
    'hero.badge':        'Available for projects',
    'hero.typewriter':   ['SAP Fiori Developer', 'ABAP Programmer', 'SAP Consultant', 'Passionate about technology'],

    'about.label':    'My specialty',
    'about.title':    'SAP Fiori & ABAP',
    'about.subtitle': 'With over 5 years of experience in the SAP ecosystem, I have participated in digital transformation projects for companies across different industries.',
    'stat1.label':    'Years in SAP',
    'stat2.label':    'SAP Projects',
    'stat3.label':    'Clients',

    'exp.fiori.title': 'SAP Fiori',
    'exp.fiori.desc':  'Fiori app development with SAPUI5, Freestyle and SAP Build. Creation of tiles, roles and advanced Launchpad customizations.',
    'exp.abap.title':  'ABAP',
    'exp.abap.desc':   'Classic and RESTful ABAP programming (RAP). Reports, BADIs, User Exits, OData Services, CDS Views and SmartForms.',

    'clients.label':    'Track record',
    'clients.title':    'Clients I\'ve worked with',
    'clients.subtitle': 'I\'ve had the opportunity to work on SAP projects for companies from various industrial sectors.',

    'skills.label':    'Technologies',
    'skills.title':    'My tech stack',
    'skills.subtitle': 'Platforms, languages, and tools I use in my day-to-day development work.',

    'cv.label':    'Resume',
    'cv.title':    'Download my CV',
    'cv.subtitle': 'Available in three languages. Choose your preferred version.',
    'cv.es.lang':  'Español',
    'cv.es.sub':   'Spanish version',
    'cv.es.btn':   'Descargar',
    'cv.en.lang':  'English',
    'cv.en.sub':   'English version',
    'cv.en.btn':   'Download',
    'cv.fr.lang':  'Français',
    'cv.fr.sub':   'French version',
    'cv.fr.btn':   'Télécharger',

    'footer.brand.desc':    'SAP Fiori & ABAP specialist passionate about building robust enterprise solutions. Always open to new challenges.',
    'footer.nav.title':     'Navigation',
    'footer.contact.title': 'Contact',
    'footer.copyright':     '© 2025 Rubén García. All rights reserved.',
    'footer.made':          'Made with lots of coffee',

    'projects.label':       'Portfolio',
    'projects.title':       'My Projects',
    'projects.subtitle':    'Ideas turned into reality. Explore everything I\'ve built and experimented with.',
    'projects.search':      'Search by name, technology or description…',
    'projects.filter.all':  'All',
    'projects.filter.web':  '🌐 Web',
    'projects.filter.data': '📊 Data',
    'projects.filter.mob':  '📱 Mobile',
    'projects.filter.ia':   '🤖 AI / ML',
    'projects.filter.tool': '🔧 Tool',
    'projects.noresults':   'No projects found with that criteria.',
    'projects.noresults2':  'Try a different term or select "All".',
    'projects.view':        'View project',
    'projects.source':      'GitHub',
  },

  /* ──────────────────────────────────────────
     FRANÇAIS
  ────────────────────────────────────────── */
  fr: {
    'nav.home':     'Accueil',
    'nav.skills':   'Compétences',
    'nav.projects': 'Projets',
    'nav.cv':       'CV',
    'nav.contact':  'Contact',

    'hero.greeting':     '👋 Bonjour, je suis',
    'hero.bio':          'Spécialiste SAP avec une expérience en développement Fiori et ABAP. Passionné par la création de solutions d\'entreprise élégantes, robustes et performantes.',
    'hero.btn.projects': 'Voir les projets',
    'hero.btn.cv':       'Télécharger CV',
    'hero.badge':        'Disponible pour des projets',
    'hero.typewriter':   ['Développeur SAP Fiori', 'Programmeur ABAP', 'Consultant SAP', 'Passionné par la technologie'],

    'about.label':    'Ma spécialité',
    'about.title':    'SAP Fiori & ABAP',
    'about.subtitle': 'Avec plus de 5 ans d\'expérience dans l\'écosystème SAP, j\'ai participé à des projets de transformation numérique dans différents secteurs.',
    'stat1.label':    'Ans en SAP',
    'stat2.label':    'Projets SAP',
    'stat3.label':    'Clients',

    'exp.fiori.title': 'SAP Fiori',
    'exp.fiori.desc':  'Développement d\'applications Fiori avec SAPUI5, Freestyle et SAP Build. Création de tuiles, rôles et personnalisations avancées du Launchpad.',
    'exp.abap.title':  'ABAP',
    'exp.abap.desc':   'Programmation ABAP classique et RESTful (RAP). Reports, BADIs, User Exits, Services OData, CDS Views et SmartForms.',

    'clients.label':    'Parcours',
    'clients.title':    'Clients avec lesquels j\'ai travaillé',
    'clients.subtitle': 'J\'ai eu l\'opportunité de travailler sur des projets SAP pour des entreprises de différents secteurs industriels.',

    'skills.label':    'Technologies',
    'skills.title':    'Ma stack technique',
    'skills.subtitle': 'Plateformes, langages et outils que j\'utilise au quotidien.',

    'cv.label':    'Curriculum Vitæ',
    'cv.title':    'Télécharger mon CV',
    'cv.subtitle': 'Disponible en trois langues. Choisissez votre version préférée.',
    'cv.es.lang':  'Español',
    'cv.es.sub':   'Version espagnole',
    'cv.es.btn':   'Descargar',
    'cv.en.lang':  'English',
    'cv.en.sub':   'Version anglaise',
    'cv.en.btn':   'Download',
    'cv.fr.lang':  'Français',
    'cv.fr.sub':   'Version française',
    'cv.fr.btn':   'Télécharger',

    'footer.brand.desc':    'Spécialiste SAP Fiori & ABAP passionné par la création de solutions d\'entreprise robustes. Toujours ouvert à de nouveaux défis.',
    'footer.nav.title':     'Navigation',
    'footer.contact.title': 'Contact',
    'footer.copyright':     '© 2025 Rubén García. Tous droits réservés.',
    'footer.made':          'Fait avec beaucoup de café',

    'projects.label':       'Portfolio',
    'projects.title':       'Mes Projets',
    'projects.subtitle':    'Des idées transformées en réalité. Explorez tout ce que j\'ai construit et expérimenté.',
    'projects.search':      'Rechercher par nom, technologie ou description…',
    'projects.filter.all':  'Tous',
    'projects.filter.web':  '🌐 Web',
    'projects.filter.data': '📊 Données',
    'projects.filter.mob':  '📱 Mobile',
    'projects.filter.ia':   '🤖 IA / ML',
    'projects.filter.tool': '🔧 Outil',
    'projects.noresults':   'Aucun projet trouvé avec ce critère.',
    'projects.noresults2':  'Essayez un autre terme ou sélectionnez "Tous".',
    'projects.view':        'Voir le projet',
    'projects.source':      'GitHub',
  }
};

/* =====================================================================
   APPLY TRANSLATIONS
   ===================================================================== */
let _currentLang = localStorage.getItem('portfolio-lang') || 'es';

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;
  _currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);

  // 1. textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t[el.dataset.i18n];
    if (val !== undefined && !Array.isArray(val)) el.textContent = val;
  });

  // 2. placeholder attribute
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const val = t[el.dataset.i18nPh];
    if (val) el.setAttribute('placeholder', val);
  });

  // 3. aria-label attribute
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const val = t[el.dataset.i18nAria];
    if (val) el.setAttribute('aria-label', val);
  });

  // 4. Active lang button highlight
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // 5. html lang attr
  document.documentElement.lang = lang;

  // 6. Dispatch event (typewriter listens for this)
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang, t } }));
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  // Wire up flag buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTranslations(btn.dataset.lang));
  });
  // Apply on load
  applyTranslations(_currentLang);
});

/* ── Global API ── */
window.i18n = {
  apply: applyTranslations,
  lang:  () => _currentLang,
  t:     (key) => TRANSLATIONS[_currentLang]?.[key] ?? key,
};

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
    'nav.certs':    'Certificados',
    'nav.cv':       'Currículum',
    'nav.contact':  'Contacto',
    'nav.blog':     'Blog',

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
    'about.subtitle': 'Soy un desarrollador Fiori ABAP que ha trabajado en proyectos de CRM y EWM con más de {years} años de experiencia.',
    'stat1.label':    'Años en SAP',
    'stat2.label':    'Proyectos SAP',
    'stat3.label':    'Clientes',

    // Expertise areas
    'exp.fiori.title': 'SAP Fiori',
    'exp.fiori.desc':  'Desarrollo de aplicaciones Fiori con SAPUI5, Freestyle y SAP Build. Creación de tiles, roles y customizaciones avanzadas del Launchpad.',
    'exp.abap.title':  'ABAP',
    'exp.abap.desc':   'Programación ABAP clásico. Reports, BADIs, User Exits, OData Services, CDS Views y SmartForms.',

    // Clients
    'clients.label':    'Trayectoria',
    'clients.title':    'Clientes con los que he trabajado',
    'clients.subtitle': 'He tenido la oportunidad de participar en proyectos SAP para empresas de distintos sectores industriales.',

    // Certificates
    'certs.label':         'Formación',
    'certs.title.prefix':  'Certificados y',
    'certs.title.word':    'Títulos',
    'certs.subtitle':      'Certificaciones profesionales y formación académica que respaldan mi experiencia.',
    'certs.search':        'Buscar por título, emisor o etiqueta…',
    'certs.filter.all':    'Todos',
    'certs.filter.sap':    '🟦 SAP',
    'certs.filter.cloud':  '☁️ Cloud',
    'certs.filter.idiomas':'🗣️ Idiomas',
    'certs.filter.uni':    '🎓 Universidad',
    'certs.filter.otros':  '📄 Otros',
    'certs.noresults':     'No se encontraron certificados con ese criterio.',
    'certs.noresults2':    'Prueba con otro término o cambia los filtros.',
    'certs.admin':         'Administrar',
    'certs.modal.link':    'Ver certificado oficial',

    // Skills
    'skills.label':    'Tecnologías',
    'skills.title':    'Mi stack técnico',
    'skills.subtitle': 'Plataformas, lenguajes y herramientas con los que desarrollo en el día a día.',

    // CV
    'cv.label':    'Currículum',
    'cv.title':    'Mi CV',
    'cv.subtitle': 'Disponible en tres idiomas. Previsualízalo o descárgalo directamente.',
    'cv.es.lang':  'Español',
    'cv.es.sub':   'Versión en castellano',
    'cv.es.btn':   'Ver CV',
    'cv.en.lang':  'English',
    'cv.en.sub':   'English version',
    'cv.en.btn':   'View CV',
    'cv.fr.lang':  'Français',
    'cv.fr.sub':   'Version française',
    'cv.fr.btn':   'Voir le CV',
    'cv.modal.download': 'Descargar',
    'cv.modal.close':    'Cerrar',

    // Footer
    'footer.brand.desc':    'Especialista SAP Fiori & ABAP apasionado por construir soluciones empresariales robustas. Siempre abierto a nuevos retos.',
    'footer.nav.title':     'Navegación',
    'footer.contact.title': 'Contacto',
    'footer.copyright':     '© 2025 Rubén García. Todos los derechos reservados.',
    'footer.made':          'Hecho con mucho café',

    // Projects page
    'projects.label':        'Portafolio',
    'projects.title':        'Mis Proyectos',
    'projects.title.prefix': 'Mis',
    'projects.title.word':   'Proyectos',
    'projects.subtitle':     'Ideas convertidas en realidad. Explora todo lo que he construido y experimentado.',
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

    // Blog
    'blog.label':            'Blog',
    'blog.title':            'Mis reflexiones',
    'blog.title.prefix':     'Mis',
    'blog.title.word':       'reflexiones',
    'blog.subtitle':         'Un espacio privado donde escribo sobre tecnología, proyectos y todo lo que me inspira.',
    'blog.search':           'Buscar por título o etiqueta…',
    'blog.search.aria':      'Buscar en el blog',
    'blog.filter.all':       'Todos',
    'blog.year.label':       'Año:',
    'blog.year.all':         'Todos',
    'blog.admin':            'Administrar',
    'blog.noresults':        'No se encontraron posts con ese criterio.',
    'blog.noresults2':       'Prueba con otro término o cambia los filtros.',
    'blog.lock.access':      'Acceso requerido',
    'blog.lock.title':       'Contenido protegido',
    'blog.lock.desc':        'Este contenido está protegido. Introduce la contraseña para acceder.',
    'blog.lock.placeholder': 'Contraseña…',
    'blog.lock.btn':         'Acceder',
    'blog.lock.verifying':   'Verificando…',
    'blog.lock.error':       '❌ Contraseña incorrecta. Inténtalo de nuevo.',
    'blog.logout':           'Cerrar sesión',
    'blog.preview.cta':      'Acceder al blog',
    'blog.post1.title':      'Optimizando OData V4 en SAP Fiori',
    'blog.post1.body':       'Después de meses trabajando con OData V4 en proyectos reales, he recopilado los patrones que más me han ayudado a mejorar el rendimiento y la mantenibilidad de las aplicaciones Fiori. Desde el uso correcto de $batch hasta los filtros del lado servidor con CDS annotations.',
    'blog.post2.title':      'RAP vs ABAP clásico: ¿cuándo usar cada uno?',
    'blog.post2.body':       'El framework RESTful Application Programming (RAP) ha cambiado la forma en que desarrollamos en ABAP. En este post analizo los escenarios donde RAP brilla y aquellos donde el ABAP clásico sigue siendo la opción más pragmática.',
    'blog.post3.title':      'Lo que nadie te dice sobre ser consultor SAP',
    'blog.post3.body':       'Reflexiones honestas tras 5 años en el mundo SAP: la curva de aprendizaje real, la importancia del networking, cómo gestionar proyectos con cliente final, y por qué la documentación es más importante de lo que parece.',
  },

  /* ──────────────────────────────────────────
     ENGLISH
  ────────────────────────────────────────── */
  en: {
    'nav.home':     'Home',
    'nav.skills':   'Skills',
    'nav.projects': 'Projects',
    'nav.certs':    'Certificates',
    'nav.cv':       'Resume',
    'nav.contact':  'Contact',
    'nav.blog':     'Blog',

    'hero.greeting':     '👋 Hi, I\'m',
    'hero.bio':          'SAP specialist with experience in Fiori and ABAP development. Passionate about building elegant, robust and high-performance enterprise solutions.',
    'hero.btn.projects': 'View projects',
    'hero.btn.cv':       'Download CV',
    'hero.badge':        'Available for projects',
    'hero.typewriter':   ['SAP Fiori Developer', 'ABAP Programmer', 'SAP Consultant', 'Passionate about technology'],

    'about.label':    'My specialty',
    'about.title':    'SAP Fiori & ABAP',
    'about.subtitle': "I'm a Fiori ABAP developer who has worked on CRM and EWM projects with over {years} years of experience.",
    'stat1.label':    'Years in SAP',
    'stat2.label':    'SAP Projects',
    'stat3.label':    'Clients',

    'exp.fiori.title': 'SAP Fiori',
    'exp.fiori.desc':  'Fiori app development with SAPUI5, Freestyle and SAP Build. Creation of tiles, roles and advanced Launchpad customizations.',
    'exp.abap.title':  'ABAP',
    'exp.abap.desc':   'Classic ABAP programming. Reports, BADIs, User Exits, OData Services, CDS Views and SmartForms.',

    'clients.label':    'Track record',
    'clients.title':    'Clients I\'ve worked with',
    'clients.subtitle': 'I\'ve had the opportunity to work on SAP projects for companies from various industrial sectors.',

    'certs.label':         'Education',
    'certs.title.prefix':  'Certificates &',
    'certs.title.word':    'Degrees',
    'certs.subtitle':      'Professional certifications and academic background that back my experience.',
    'certs.search':        'Search by title, issuer or tag…',
    'certs.filter.all':    'All',
    'certs.filter.sap':    '🟦 SAP',
    'certs.filter.cloud':  '☁️ Cloud',
    'certs.filter.idiomas':'🗣️ Languages',
    'certs.filter.uni':    '🎓 University',
    'certs.filter.otros':  '📄 Other',
    'certs.noresults':     'No certificates found matching that criteria.',
    'certs.noresults2':    'Try a different term or change the filters.',
    'certs.admin':         'Manage',
    'certs.modal.link':    'View official certificate',

    'skills.label':    'Technologies',
    'skills.title':    'My tech stack',
    'skills.subtitle': 'Platforms, languages, and tools I use in my day-to-day development work.',

    'cv.label':    'Resume',
    'cv.title':    'My CV',
    'cv.subtitle': 'Available in three languages. Preview it or download it directly.',
    'cv.es.lang':  'Español',
    'cv.es.sub':   'Spanish version',
    'cv.es.btn':   'View CV',
    'cv.en.lang':  'English',
    'cv.en.sub':   'English version',
    'cv.en.btn':   'View CV',
    'cv.fr.lang':  'Français',
    'cv.fr.sub':   'French version',
    'cv.fr.btn':   'View CV',
    'cv.modal.download': 'Download',
    'cv.modal.close':    'Close',

    'footer.brand.desc':    'SAP Fiori & ABAP specialist passionate about building robust enterprise solutions. Always open to new challenges.',
    'footer.nav.title':     'Navigation',
    'footer.contact.title': 'Contact',
    'footer.copyright':     '© 2025 Rubén García. All rights reserved.',
    'footer.made':          'Made with lots of coffee',

    'projects.label':        'Portfolio',
    'projects.title':        'My Projects',
    'projects.title.prefix': 'My',
    'projects.title.word':   'Projects',
    'projects.subtitle':     'Ideas turned into reality. Explore everything I\'ve built and experimented with.',
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

    // Blog
    'blog.label':            'Blog',
    'blog.title':            'My thoughts',
    'blog.title.prefix':     'My',
    'blog.title.word':       'thoughts',
    'blog.subtitle':         'A private space where I write about technology, projects and everything that inspires me.',
    'blog.search':           'Search by title or tag…',
    'blog.search.aria':      'Search the blog',
    'blog.filter.all':       'All',
    'blog.year.label':       'Year:',
    'blog.year.all':         'All',
    'blog.admin':            'Manage',
    'blog.noresults':        'No posts found for that search.',
    'blog.noresults2':       'Try a different term or change the filters.',
    'blog.lock.access':      'Access required',
    'blog.lock.title':       'Protected content',
    'blog.lock.desc':        'This content is protected. Enter the password to access.',
    'blog.lock.placeholder': 'Password…',
    'blog.lock.btn':         'Access',
    'blog.lock.verifying':   'Verifying…',
    'blog.lock.error':       '❌ Wrong password. Please try again.',
    'blog.logout':           'Sign out',
    'blog.preview.cta':      'Access the blog',
    'blog.post1.title':      'Optimizing OData V4 in SAP Fiori',
    'blog.post1.body':       'After months working with OData V4 in real projects, I have compiled the patterns that have helped me most to improve the performance and maintainability of Fiori applications. From correct $batch usage to server-side filters with CDS annotations.',
    'blog.post2.title':      'RAP vs Classic ABAP: when to use each?',
    'blog.post2.body':       'The RESTful Application Programming (RAP) framework has changed the way we develop in ABAP. In this post I analyze the scenarios where RAP shines and those where classic ABAP is still the most pragmatic option.',
    'blog.post3.title':      'What nobody tells you about being an SAP consultant',
    'blog.post3.body':       'Honest reflections after 5 years in the SAP world: the real learning curve, the importance of networking, how to manage projects with end clients, and why documentation is more important than it seems.',
  },

  /* ──────────────────────────────────────────
     FRANÇAIS
  ────────────────────────────────────────── */
  fr: {
    'nav.home':     'Accueil',
    'nav.skills':   'Compétences',
    'nav.projects': 'Projets',
    'nav.certs':    'Certificats',
    'nav.cv':       'CV',
    'nav.contact':  'Contact',
    'nav.blog':     'Blog',

    'hero.greeting':     '👋 Bonjour, je suis',
    'hero.bio':          'Spécialiste SAP avec une expérience en développement Fiori et ABAP. Passionné par la création de solutions d\'entreprise élégantes, robustes et performantes.',
    'hero.btn.projects': 'Voir les projets',
    'hero.btn.cv':       'Télécharger CV',
    'hero.badge':        'Disponible pour des projets',
    'hero.typewriter':   ['Développeur SAP Fiori', 'Programmeur ABAP', 'Consultant SAP', 'Passionné par la technologie'],

    'about.label':    'Ma spécialité',
    'about.title':    'SAP Fiori & ABAP',
    'about.subtitle': 'Je suis un développeur Fiori ABAP ayant travaillé sur des projets CRM et EWM avec plus de {years} ans d\'expérience.',
    'stat1.label':    'Ans en SAP',
    'stat2.label':    'Projets SAP',
    'stat3.label':    'Clients',

    'exp.fiori.title': 'SAP Fiori',
    'exp.fiori.desc':  'Développement d\'applications Fiori avec SAPUI5, Freestyle et SAP Build. Création de tuiles, rôles et personnalisations avancées du Launchpad.',
    'exp.abap.title':  'ABAP',
    'exp.abap.desc':   'Programmation ABAP classique. Reports, BADIs, User Exits, Services OData, CDS Views et SmartForms.',

    'clients.label':    'Parcours',
    'clients.title':    'Clients avec lesquels j\'ai travaillé',
    'clients.subtitle': 'J\'ai eu l\'opportunité de travailler sur des projets SAP pour des entreprises de différents secteurs industriels.',

    'certs.label':         'Formation',
    'certs.title.prefix':  'Certificats et',
    'certs.title.word':    'Diplômes',
    'certs.subtitle':      'Certifications professionnelles et formation académique qui appuient mon expérience.',
    'certs.search':        'Rechercher par titre, émetteur ou étiquette…',
    'certs.filter.all':    'Tous',
    'certs.filter.sap':    '🟦 SAP',
    'certs.filter.cloud':  '☁️ Cloud',
    'certs.filter.idiomas':'🗣️ Langues',
    'certs.filter.uni':    '🎓 Université',
    'certs.filter.otros':  '📄 Autres',
    'certs.noresults':     'Aucun certificat trouvé avec ce critère.',
    'certs.noresults2':    'Essayez un autre terme ou changez les filtres.',
    'certs.admin':         'Administrer',
    'certs.modal.link':    'Voir le certificat officiel',

    'skills.label':    'Technologies',
    'skills.title':    'Ma stack technique',
    'skills.subtitle': 'Plateformes, langages et outils que j\'utilise au quotidien.',

    'cv.label':    'Curriculum Vitæ',
    'cv.title':    'Mon CV',
    'cv.subtitle': 'Disponible en trois langues. Prévisualisez-le ou téléchargez-le directement.',
    'cv.es.lang':  'Español',
    'cv.es.sub':   'Version espagnole',
    'cv.es.btn':   'Voir le CV',
    'cv.en.lang':  'English',
    'cv.en.sub':   'Version anglaise',
    'cv.en.btn':   'Voir le CV',
    'cv.fr.lang':  'Français',
    'cv.fr.sub':   'Version française',
    'cv.fr.btn':   'Voir le CV',
    'cv.modal.download': 'Télécharger',
    'cv.modal.close':    'Fermer',

    'footer.brand.desc':    'Spécialiste SAP Fiori & ABAP passionné par la création de solutions d\'entreprise robustes. Toujours ouvert à de nouveaux défis.',
    'footer.nav.title':     'Navigation',
    'footer.contact.title': 'Contact',
    'footer.copyright':     '© 2025 Rubén García. Tous droits réservés.',
    'footer.made':          'Fait avec beaucoup de café',

    'projects.label':        'Portfolio',
    'projects.title':        'Mes Projets',
    'projects.title.prefix': 'Mes',
    'projects.title.word':   'Projets',
    'projects.subtitle':     'Des idées transformées en réalité. Explorez tout ce que j\'ai construit et expérimenté.',
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

    // Blog
    'blog.label':            'Blog',
    'blog.title':            'Mes réflexions',
    'blog.title.prefix':     'Mes',
    'blog.title.word':       'réflexions',
    'blog.subtitle':         'Un espace privé où j\'écris sur la technologie, les projets et tout ce qui m\'inspire.',
    'blog.search':           'Rechercher par titre ou étiquette…',
    'blog.search.aria':      'Rechercher dans le blog',
    'blog.filter.all':       'Tous',
    'blog.year.label':       'Année :',
    'blog.year.all':         'Tous',
    'blog.admin':            'Gérer',
    'blog.noresults':        'Aucun article trouvé pour cette recherche.',
    'blog.noresults2':       'Essayez un autre terme ou changez les filtres.',
    'blog.lock.access':      'Accès requis',
    'blog.lock.title':       'Contenu protégé',
    'blog.lock.desc':        'Ce contenu est protégé. Entrez le mot de passe pour y accéder.',
    'blog.lock.placeholder': 'Mot de passe…',
    'blog.lock.btn':         'Accéder',
    'blog.lock.verifying':   'Vérification…',
    'blog.lock.error':       '❌ Mot de passe incorrect. Veuillez réessayer.',
    'blog.logout':           'Se déconnecter',
    'blog.preview.cta':      'Accéder au blog',
    'blog.post1.title':      'Optimiser OData V4 dans SAP Fiori',
    'blog.post1.body':       'Après des mois de travail avec OData V4 dans des projets réels, j\'ai compilé les modèles qui m\'ont le plus aidé à améliorer les performances et la maintenabilité des applications Fiori.',
    'blog.post2.title':      'RAP vs ABAP classique : quand utiliser chacun ?',
    'blog.post2.body':       'Le framework RESTful Application Programming (RAP) a changé la façon dont nous développons en ABAP. Dans ce post, j\'analyse les scénarios où RAP brille et ceux où l\'ABAP classique reste l\'option la plus pragmatique.',
    'blog.post3.title':      'Ce que personne ne vous dit sur le métier de consultant SAP',
    'blog.post3.body':       'Réflexions honnêtes après 5 ans dans le monde SAP : la vraie courbe d\'apprentissage, l\'importance du réseau, comment gérer des projets avec des clients finaux, et pourquoi la documentation est plus importante qu\'il n\'y paraît.',
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

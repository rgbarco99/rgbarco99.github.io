/* =====================================================================
   data.js — Constantes centralizadas del portfolio
   Edita aquí para actualizar skills, clientes y posts del blog.
   ===================================================================== */

/* ─── SKILLS ──────────────────────────────────────────────────────── */
const SKILLS = [
  { icon: '🎨', label: 'SAP Fiori / UI5' },
  { icon: '⚙️', label: 'ABAP / RAP' },
  { icon: '📡', label: 'OData Services' },
  { icon: '🗂️', label: 'CDS Views' },
  { icon: '🏗️', label: 'SAP Build' },
  { icon: '🔧', label: 'SmartForms / Adobe Forms' },
  { icon: '🧩', label: 'BADIs / User Exits' },
  { icon: '🌐', label: 'JavaScript / TypeScript' },
  { icon: '⚡', label: 'Node.js' },
  { icon: '🐙', label: 'Git / GitHub' },
  { icon: '🐋', label: 'Docker' },
  { icon: '🗄️', label: 'SQL / HANA' },
];

/* ─── CLIENTS ─────────────────────────────────────────────────────── */
const CLIENTS = [
  { logo: '🏭', name: 'Industrias XYZ',   sector: 'Manufactura' },
  { logo: '🏦', name: 'Banco Nacional',   sector: 'Banca & Finanzas' },
  { logo: '🛒', name: 'RetailGroup',      sector: 'Retail' },
  { logo: '⚡', name: 'EnergíaPlus',      sector: 'Energía' },
  { logo: '🚚', name: 'LogiTrans',        sector: 'Logística' },
  { logo: '🏥', name: 'HealthCorp',       sector: 'Salud' },
  { logo: '🏗️', name: 'Constructora Sur', sector: 'Construcción' },
  { logo: '✈️', name: 'AeroServices',     sector: 'Aviación' },
];

/* ─── BLOG POSTS ──────────────────────────────────────────────────── */
/*
  ⚠️  IMPORTANTE: Este contenido solo se muestra tras validar la contraseña.
      No es visible en el código fuente sin JavaScript, pero recuerda que
      este portfolio es estático. Para máxima privacidad, usa un backend.
*/
const BLOG_POSTS = [
  {
    id: 1,
    date: '2025-04-28',
    emoji: '🚀',
    titleKey: 'blog.post1.title',
    bodyKey:  'blog.post1.body',
    tags: ['SAP', 'Fiori', 'OData'],
  },
  {
    id: 2,
    date: '2025-03-15',
    emoji: '🧩',
    titleKey: 'blog.post2.title',
    bodyKey:  'blog.post2.body',
    tags: ['ABAP', 'RAP', 'CDS'],
  },
  {
    id: 3,
    date: '2025-02-02',
    emoji: '💡',
    titleKey: 'blog.post3.title',
    bodyKey:  'blog.post3.body',
    tags: ['Reflexión', 'Carrera'],
  },
];

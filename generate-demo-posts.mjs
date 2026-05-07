/* =====================================================================
   generate-demo-posts.mjs
   Ejecutar: node generate-demo-posts.mjs
   Genera los 3 posts de demo cifrados con la contraseña portfolio2025
   y los imprime como el contenido de BLOG_POSTS para data.js
   ===================================================================== */

import { webcrypto } from 'node:crypto';
const { subtle } = webcrypto;
const getRandomValues = (arr) => webcrypto.getRandomValues(arr);

const PASSWORD = 'portfolio2025';

const toB64 = buf => Buffer.from(buf).toString('base64');

async function deriveKey(password, salt) {
  const raw = await subtle.importKey(
    'raw', Buffer.from(password), 'PBKDF2', false, ['deriveKey']
  );
  return subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' },
    raw,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
}

async function encrypt(plaintext, password) {
  const salt = getRandomValues(new Uint8Array(16));
  const iv   = getRandomValues(new Uint8Array(12));
  const key  = await deriveKey(password, salt);
  const buf  = await subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    Buffer.from(plaintext)
  );
  return { encryptedBody: toB64(buf), iv: toB64(iv), salt: toB64(salt) };
}

/* ── Posts de demo ──────────────────────────────────────────────────── */
const DEMO_POSTS = [
  {
    id: 'post-001',
    title: 'Optimizando OData V4 en SAP Fiori',
    date: '2025-04-28',
    tags: ['SAP', 'Fiori', 'OData'],
    emoji: '🚀',
    images: [],
    body:
`Después de meses trabajando con OData V4 en proyectos reales, he recopilado los patrones que más me han ayudado a mejorar el rendimiento y la mantenibilidad de las aplicaciones Fiori.

## El problema con los bindings por defecto

El mayor error que veo en proyectos Fiori es confiar en el binding automático de OData V4 sin entender qué queries se están lanzando. Un simple ListBinding con \`$expand\` mal configurado puede triplicar el tiempo de carga.

## Patterns que funcionan

**1. Server-side filtering siempre**
Evita cargar listas completas para filtrar en el cliente. Usa \`$filter\` en el binding y apóyate en CDS annotations como \`@Search.defaultSearchElement\`.

**2. $batch para múltiples reads**
Cuando la vista necesita datos de varias entidades, agrúpalos en un \`$batch\`. El framework lo soporta de forma transparente con \`sap.ui.model.odata.v4.ODataModel\`.

**3. earlyRequests**
Habilita \`earlyRequests: true\` en el modelo para que las queries arranquen antes de que el controlador esté listo.

## Ejemplo

\`\`\`js
const oModel = new ODataModel({
  serviceUrl: '/sap/opu/odata4/...',
  synchronizationMode: 'None',
  operationMode: 'Server',
  earlyRequests: true
});
\`\`\`

Con estos tres cambios en un proyecto real redujimos el tiempo de carga inicial de 4.2s a 1.1s. No está mal para ajustes de configuración.`
  },
  {
    id: 'post-002',
    title: 'RAP vs ABAP clásico: ¿cuándo usar cada uno?',
    date: '2025-03-15',
    tags: ['ABAP', 'RAP', 'CDS'],
    emoji: '🧩',
    images: [],
    body:
`El RESTful Application Programming model (RAP) llegó para quedarse, pero eso no significa que el ABAP clásico esté muerto. Tras trabajar con ambos en producción, aquí va mi opinión honesta.

## Cuándo usar RAP

- **APIs OData expuestas externamente**: RAP genera automáticamente el binding de OData V4 con todo lo que conlleva.
- **Proyectos nuevos en S/4HANA**: Si partes de cero y el cliente tiene S/4HANA 2020+, RAP es el camino.
- **Draft handling**: El soporte de borradores en RAP es elegante y evita mucho código custom.

## Cuándo seguir con ABAP clásico

- **Proyectos legacy con business logic en Function Modules**: No vale la pena reescribir FMs robustos que llevan años funcionando.
- **Reports complejos con ALV**: El clásico sigue siendo rey aquí.
- **Sin S/4HANA**: RAP depende fuertemente de las CDS Views y el stack ABAP moderno.

## El verdadero coste de migrar

El mayor error es subestimar el tiempo de reaprendizaje. RAP tiene una curva empinada: behavior definitions, behavior implementations, Entity Manipulation Language (EML)...

Mi recomendación: proyecto piloto pequeño primero, aprende el pattern con algo sin riesgo y luego escala.`
  },
  {
    id: 'post-003',
    title: 'Lo que nadie te dice sobre ser consultor SAP',
    date: '2025-02-02',
    tags: ['Reflexión', 'Carrera', 'SAP'],
    emoji: '💡',
    images: [],
    body:
`Cinco años en el mundo SAP dan para mucho. Reflexiones sin filtro para quien esté pensando en meterse en este mundillo.

## La curva de aprendizaje real

Olvídate de los 6 meses que dice el curso. La realidad es que hasta los 18 meses no te sientes cómodo moviendo proyectos solo. Y eso solo si tienes mentores decentes y proyectos variados.

El ecosistema SAP es inmenso: FICO, MM, SD, Fiori, ABAP, BTP... nadie sabe de todo. **Especialízate pronto.**

## El networking importa más de lo que crees

SAP es un mundo pequeño. El consultor que conociste en una formación en 2022 puede ser tu referencia para un proyecto en 2025. Cuida esas relaciones.

La comunidad SAP en España es activa: SAP Inside Tracks, grupos de LinkedIn, ASUG... Participa.

## Gestionar al cliente final

Nadie te enseña esto en ningún curso:
- El cliente siempre quiere más de lo que el scope dice
- El cambio de alcance es la fuente de todos los conflictos
- Documenta **todo**, incluso las conversaciones de Teams

## Por qué la documentación importa más de lo que parece

En 18 meses tú ya no estarás en ese proyecto. El código que escribiste sin documentar lo va a mantener otro. Trátalo como si fuera código open source: escribe para el desconocido del futuro.

\`\`\`abap
* Mal: hace algo con el importe
DATA lv_amount TYPE decimal.

* Bien: importe bruto en moneda del documento (campo BKPF-WAERS)
DATA lv_gross_amount TYPE bkpf-wrbtr.
\`\`\`

Si te quedas con una sola cosa: **documenta siempre**, especialmente lo que parece obvio.`
  }
];

(async () => {
  const result = [];
  for (const post of DEMO_POSTS) {
    const { body, ...meta } = post;
    const enc = await encrypt(body, PASSWORD);
    result.push({ ...meta, ...enc });
  }

  const lines = result.map(p => `  {
    id: '${p.id}',
    title: ${JSON.stringify(p.title)},
    date: '${p.date}',
    tags: ${JSON.stringify(p.tags)},
    emoji: '${p.emoji}',
    images: ${JSON.stringify(p.images)},
    encryptedBody: '${p.encryptedBody}',
    iv:   '${p.iv}',
    salt: '${p.salt}'
  }`).join(',\n');

  console.log(`/* ===================================================================
   data.js — Datos del portfolio (generado por generate-demo-posts.mjs)
   =================================================================== */

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

/* ── BLOG POSTS (cuerpo cifrado con AES-256-GCM + PBKDF2) ──────────
   Título, fecha, tags e imágenes van en claro para renderizar tarjetas.
   El cuerpo solo se descifra al abrir el post con la contraseña correcta.
   Generado con: node generate-demo-posts.mjs
   ─────────────────────────────────────────────────────────────────── */
const BLOG_POSTS = [
${lines}
];`);
})();

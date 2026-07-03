/* =====================================================================
   bump-version.mjs
   Ejecutar antes de cada deploy: node bump-version.mjs
   Usa el hash corto del commit actual como cache-buster en todos los HTML.
   ===================================================================== */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const FILES = ['index.html', 'blog.html', 'blog-post.html', 'blog-admin.html', 'projects.html', 'certificados.html', 'certs-admin.html'];

let version;
try {
  version = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
} catch {
  version = Date.now().toString(36);
}

let changed = 0;
FILES.forEach(file => {
  const original = readFileSync(file, 'utf8');
  const updated  = original.replace(/(<script src="js\/[^"?]+)(?:\?v=[^"]*)?(")/g, `$1?v=${version}$2`);
  if (updated !== original) {
    writeFileSync(file, updated);
    console.log(`  ✓ ${file}`);
    changed++;
  }
});

console.log(`\nVersión: ${version}  (${changed} fichero${changed !== 1 ? 's' : ''} actualizado${changed !== 1 ? 's' : ''})`);

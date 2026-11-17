/* =====================================================================
   markdown.js — Renderizador Markdown mínimo compartido
   Usado por blog-post.html (lectura) y blog-admin.html (vista previa),
   para que la vista previa sea idéntica al post publicado.

   Soporta: ## / ###, **negrita**, *cursiva*, `código`, ```bloques```,
            [enlaces](url), listas con "- " y separadores "---".
   ===================================================================== */

function renderMarkdown(md) {
  const safeUrl = url => {
    const u = url.trim();
    if (/^(javascript|data|vbscript):/i.test(u)) return '#';
    return u.replace(/"/g, '&quot;');
  };

  const codeBlocks = [];
  let html = (md || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    /* Los bloques de código se apartan para que no se les aplique el resto de reglas */
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      codeBlocks.push(`<pre><code class="lang-${lang}">${code.trimEnd()}</code></pre>`);
      return `\u0000CODE${codeBlocks.length - 1}\u0000`;
    })
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm,  '<h2>$1</h2>')
    .replace(/`([^`\n]+)`/g, (_, c) => `<code>${c.replace(/\*/g, '&#42;')}</code>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${safeUrl(u)}" target="_blank" rel="noopener noreferrer">${t}</a>`)
    .replace(/^---$/gm, '<hr>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .split(/\n{2,}/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^\u0000CODE\d+\u0000$/.test(block)) return block;
      if (/^<li>/.test(block)) return `<ul>${block}</ul>`;
      if (/^<(h[123]|pre|ul|hr)/.test(block)) return block;
      if (block.includes('<li>')) return `<ul>${block}</ul>`;
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');

  return html.replace(/\u0000CODE(\d+)\u0000/g, (_, i) => codeBlocks[+i]);
}

window.renderMarkdown = renderMarkdown;

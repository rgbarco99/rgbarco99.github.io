/* =====================================================================
   projects-view.js — Tarjetas y ficha de detalle de proyectos
   Lo usan projects.html (público) y projects-admin.html (vista previa),
   para que la vista previa sea idéntica a lo publicado.

   Modelo de un proyecto (js/projects.json):
     id, title, date, category, kind ('download' | 'web'), emoji,
     summary, description (Markdown), tech[], repo ('usuario/repo'),
     asset (nombre del fichero en la release), platform, url (kind web),
     notice, images[{ src, thumb }], visibility ('visible' | 'hidden')
   ===================================================================== */

(function () {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const t = (key, fallback) => {
    const v = window.i18n?.t?.(key);
    return v && v !== key ? v : fallback;
  };

  const CATEGORIES = {
    web:         { key: 'projects.filter.web',  label: '🌐 Web',          emoji: '🌐' },
    data:        { key: 'projects.filter.data', label: '📊 Data',         emoji: '📊' },
    mobile:      { key: 'projects.filter.mob',  label: '📱 Mobile',       emoji: '📱' },
    ia:          { key: 'projects.filter.ia',   label: '🤖 IA / ML',      emoji: '🤖' },
    herramienta: { key: 'projects.filter.tool', label: '🔧 Herramienta',  emoji: '🔧' },
  };
  const categoryLabel = c => CATEGORIES[c] ? t(CATEGORIES[c].key, CATEGORIES[c].label) : (c || '');
  const emojiOf = p => p.emoji || CATEGORIES[p.category]?.emoji || '📦';

  /* ── URLs ───────────────────────────────────────────────────────── */
  const REPO_RE = /^[\w.-]+\/[\w.-]+$/;
  const validRepo = r => REPO_RE.test(r || '');
  const httpUrl   = u => /^https?:\/\//i.test(u || '') ? u : null;
  const imageUrl  = u => (/^data:image\//i.test(u || '') || /^assets\//.test(u || '') || httpUrl(u)) ? u : null;

  const repoUrl     = p => validRepo(p.repo) ? `https://github.com/${p.repo}` : null;
  const releasesUrl = p => validRepo(p.repo) ? `https://github.com/${p.repo}/releases` : null;
  /** Enlace estable a la última versión: no hay que tocar la web al publicar otra release */
  const downloadUrl = p => (p.kind === 'download' && validRepo(p.repo) && p.asset)
    ? `https://github.com/${p.repo}/releases/latest/download/${encodeURIComponent(p.asset)}` : null;
  const webUrl      = p => p.kind === 'web' ? httpUrl(p.url) || (/^[\w./-]+$/.test(p.url || '') ? p.url : null) : null;

  const images = p => (p.images || []).filter(i => imageUrl(i?.src));
  const cover  = p => { const i = images(p)[0]; return i ? imageUrl(i.thumb) || i.src : null; };

  /* ── Release (API pública de GitHub, sin token; caché 10 min) ───── */
  const RELEASE_TTL = 10 * 60 * 1000;

  async function fetchReleases(repo) {
    const key = '_releases_' + repo;
    try {
      const c = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (c && Date.now() - c.at < RELEASE_TTL) return c.list;
    } catch {}
    const r = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=30`,
      { headers: { Accept: 'application/vnd.github+json' } });
    if (!r.ok) throw new Error(r.status === 404 ? 'Repositorio o releases no encontrados' : `GitHub respondió ${r.status}`);
    const list = (await r.json())
      .filter(x => !x.draft && !x.prerelease)
      .map(x => ({ tag: x.tag_name, date: x.published_at, assets: (x.assets || []).map(a => ({ name: a.name, size: a.size })) }));
    try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), list })); } catch {}
    return list;
  }

  /** Última release: { tag, date, size, hasAsset, assets[] } o null si no hay ninguna */
  async function latestRelease(p) {
    if (!validRepo(p.repo)) return null;
    const rel = (await fetchReleases(p.repo))[0];
    if (!rel) return null;
    const a = rel.assets.find(x => x.name === p.asset);
    return { tag: rel.tag, date: rel.date, size: a ? a.size : null, hasAsset: !!a, assets: rel.assets.map(x => x.name) };
  }

  const lang = () => document.documentElement.lang || 'es';
  const fmtSize = b => b == null ? '' : `${(b / 1048576).toLocaleString(lang(), { maximumFractionDigits: 1 })} MB`;
  const fmtDate = d => d ? new Date(d.length === 10 ? d + 'T12:00:00' : d)
    .toLocaleDateString(lang(), { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  /* ── Iconos ─────────────────────────────────────────────────────── */
  const ICON = {
    download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    external: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>',
    github:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>',
    arrow:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  };

  /* ── Tarjeta ────────────────────────────────────────────────────── */
  function cardHtml(p, i = 0) {
    const delay = ['', ' reveal-delay-1', ' reveal-delay-2'][i % 3];
    const img   = cover(p);
    const dl    = downloadUrl(p);
    const web   = webUrl(p);
    const repo  = repoUrl(p);
    const tags  = [categoryLabel(p.category), ...(p.tech || []).slice(0, 3)]
      .filter(Boolean).map(x => `<span class="project-tag">${esc(x)}</span>`).join('');

    let primary = `<span class="project-link">${esc(t('projects.details', 'Ver detalles'))} ${ICON.arrow}</span>`;
    if (dl)  primary = `<a href="${esc(dl)}" class="project-link project-link-primary" data-stop>${ICON.download} ${esc(t('projects.download', 'Descargar'))}</a>`;
    if (web) primary = `<a href="${esc(web)}" target="_blank" rel="noopener" class="project-link project-link-primary" data-stop>${esc(t('projects.open', 'Abrir'))} ${ICON.external}</a>`;

    return `
      <article class="project-card reveal${delay}" data-project-id="${esc(p.id)}" role="button" tabindex="0"
        aria-label="${esc(p.title)}">
        <div class="project-img-wrap">
          ${img ? `<img src="${esc(img)}" alt="${esc(p.title)}" loading="lazy" />`
                : `<div class="project-cover-placeholder" aria-hidden="true">${esc(emojiOf(p))}</div>`}
          <div class="project-overlay" aria-hidden="true">
            <span class="project-overlay-btn">${esc(t('projects.details', 'Ver detalles'))} →</span>
          </div>
        </div>
        <div class="project-body">
          <div class="project-tags">${tags}</div>
          <h2 class="project-title">${esc(p.title)}</h2>
          <p class="project-desc">${esc(p.summary)}</p>
          <div class="project-footer">
            ${primary}
            ${repo ? `<a href="${esc(repo)}" target="_blank" rel="noopener" class="project-link" data-stop aria-label="${esc(t('projects.sourceCode', 'Código fuente'))}">${ICON.github} <span>GitHub</span></a>` : ''}
          </div>
        </div>
      </article>`;
  }

  /** Conecta clics/teclado de las tarjetas de un contenedor con la ficha */
  function bindCards(container, findProject) {
    container.querySelectorAll('.project-card').forEach(card => {
      const open = () => { const p = findProject(card.dataset.projectId); if (p) openModal(p); };
      card.addEventListener('click', e => { if (!e.target.closest('[data-stop]')) open(); });
      card.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target === card) open(); });
    });
  }

  /* ── Ficha de detalle ───────────────────────────────────────────── */
  let modal = null, current = null, imgIndex = 0, opts = {};

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.className = 'cert-modal-overlay';
    modal.id = 'project-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="cert-modal project-modal" role="dialog" aria-modal="true" aria-labelledby="pm-title">
        <button type="button" class="cert-modal-close" id="pm-close" aria-label="Cerrar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <div class="project-gallery" id="pm-gallery"></div>
        <div class="cert-modal-body">
          <div class="cert-modal-tags" id="pm-tags"></div>
          <h2 class="cert-modal-title" id="pm-title"></h2>
          <p class="cert-modal-meta" id="pm-meta"></p>
          <div class="project-actions" id="pm-actions"></div>
          <p class="project-notice" id="pm-notice"></p>
          <div class="blog-md project-modal-desc" id="pm-desc"></div>
          <div id="pm-tech-wrap">
            <p class="project-tech-title" id="pm-tech-title"></p>
            <div class="project-tech" id="pm-tech"></div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('#pm-close').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft')  showImage(imgIndex - 1);
      if (e.key === 'ArrowRight') showImage(imgIndex + 1);
    });
    return modal;
  }

  function renderGallery() {
    const g    = modal.querySelector('#pm-gallery');
    const list = images(current);
    if (!list.length) {
      g.innerHTML = `<div class="project-gallery-placeholder" aria-hidden="true">${esc(emojiOf(current))}</div>`;
      return;
    }
    const img = list[imgIndex];
    const multi = list.length > 1;
    g.innerHTML = `
      <div class="project-gallery-main">
        <a href="${esc(img.src)}" target="_blank" rel="noopener" aria-label="Ver imagen a tamaño completo">
          <img src="${esc(img.src)}" alt="${esc(current.title)} — ${imgIndex + 1}/${list.length}" />
        </a>
        ${multi ? `<button type="button" class="project-gallery-nav prev" aria-label="Anterior">‹</button>
                   <button type="button" class="project-gallery-nav next" aria-label="Siguiente">›</button>
                   <span class="project-gallery-count">${imgIndex + 1} / ${list.length}</span>` : ''}
      </div>
      ${multi ? `<div class="project-gallery-thumbs">${list.map((x, i) =>
        `<button type="button" data-i="${i}" class="${i === imgIndex ? 'active' : ''}" aria-label="Imagen ${i + 1}">
           <img src="${esc(imageUrl(x.thumb) || x.src)}" alt="" loading="lazy" /></button>`).join('')}</div>` : ''}`;
    g.querySelector('.prev')?.addEventListener('click', () => showImage(imgIndex - 1));
    g.querySelector('.next')?.addEventListener('click', () => showImage(imgIndex + 1));
    g.querySelectorAll('.project-gallery-thumbs button').forEach(b =>
      b.addEventListener('click', () => showImage(+b.dataset.i)));
  }

  function showImage(i) {
    const n = images(current).length;
    if (n < 2) return;
    imgIndex = (i + n) % n;
    renderGallery();
  }

  function renderMeta(rel) {
    const parts = [];
    if (current.platform) parts.push(current.platform);
    if (rel) {
      parts.push(rel.tag);
      if (rel.size) parts.push(fmtSize(rel.size));
      parts.push(`${t('projects.updated', 'Actualizado')} ${fmtDate(rel.date)}`);
    } else if (current.date) {
      parts.push(fmtDate(current.date));
    }
    modal.querySelector('#pm-meta').textContent = parts.join(' · ');
  }

  function renderActions() {
    const p = current, out = [];
    const dl = downloadUrl(p), web = webUrl(p), repo = repoUrl(p), rels = releasesUrl(p);
    if (dl)  out.push(`<a class="cert-modal-link" href="${esc(dl)}">${ICON.download} ${esc(t('projects.download', 'Descargar'))}${p.asset ? ` <span style="opacity:.8;font-weight:500">${esc(p.asset)}</span>` : ''}</a>`);
    if (web) out.push(`<a class="cert-modal-link" href="${esc(web)}" target="_blank" rel="noopener">${esc(t('projects.open', 'Abrir'))} ${ICON.external}</a>`);
    if (repo) out.push(`<a class="project-action-secondary" href="${esc(repo)}" target="_blank" rel="noopener">${ICON.github} ${esc(t('projects.sourceCode', 'Código fuente'))}</a>`);
    if (dl && rels) out.push(`<a class="project-action-secondary" href="${esc(rels)}" target="_blank" rel="noopener">${esc(t('projects.allVersions', 'Todas las versiones'))}</a>`);
    modal.querySelector('#pm-actions').innerHTML = out.join('');
  }

  function openModal(p, options = {}) {
    ensureModal();
    current = p; imgIndex = 0; opts = options;
    renderGallery();
    modal.querySelector('#pm-tags').innerHTML = [categoryLabel(p.category)]
      .filter(Boolean).map(x => `<span class="blog-tag">${esc(x)}</span>`).join('');
    modal.querySelector('#pm-title').textContent = p.title || '';
    renderMeta(null);
    renderActions();
    const notice = modal.querySelector('#pm-notice');
    notice.textContent = p.notice || '';
    notice.style.display = p.notice ? '' : 'none';
    modal.querySelector('#pm-desc').innerHTML = window.renderMarkdown ? window.renderMarkdown(p.description || '') : esc(p.description);
    modal.querySelector('#pm-desc').querySelectorAll('a').forEach(a => a.rel = 'noopener noreferrer');
    const tech = p.tech || [];
    modal.querySelector('#pm-tech-wrap').style.display = tech.length ? '' : 'none';
    modal.querySelector('#pm-tech-title').textContent = t('projects.tech', 'Tecnologías');
    modal.querySelector('#pm-tech').innerHTML = tech.map(x => `<span class="project-tag">${esc(x)}</span>`).join('');

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.project-modal').scrollTop = 0;
    if (options.updateHash !== false && p.id) history.replaceState(null, '', '#' + encodeURIComponent(p.id));

    if (p.kind === 'download') {
      const forId = p.id;
      latestRelease(p).then(rel => { if (current?.id === forId) renderMeta(rel); }).catch(() => {});
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (opts.updateHash !== false && location.hash) history.replaceState(null, '', location.pathname + location.search);
    current = null;
  }

  window.projectsView = {
    esc, CATEGORIES, categoryLabel, emojiOf, validRepo, imageUrl, images,
    repoUrl, releasesUrl, downloadUrl, webUrl, cover,
    fetchReleases, latestRelease, fmtSize, fmtDate,
    cardHtml, bindCards, openModal, closeModal,
  };
})();

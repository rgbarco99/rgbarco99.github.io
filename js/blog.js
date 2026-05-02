/* =====================================================================
   blog.js — Sección de blog protegida con contraseña
   La contraseña se almacena como hash SHA-256 (nunca en texto plano).
   El contenido NO se inyecta en el DOM hasta que la contraseña es correcta.
   ===================================================================== */

/* ─────────────────────────────────────────────────────────────────────
   CONFIGURACIÓN — cambia solo el hash, no la lógica
   Para generar un nuevo hash abre la consola del navegador y ejecuta:

     async function hash(pw) {
       const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
       return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
     }
     hash('tu_nueva_contraseña').then(console.log);

   Contraseña actual: portfolio2025
   ───────────────────────────────────────────────────────────────────── */
const BLOG_PASSWORD_HASH = '7367c98b14b9b37fcf0dd9bd6eb45e8671bed22fe70f085013ecae052eea27a4';
// ↑  SHA-256 of "portfolio2025" — cámbialo por el tuyo propio

/* Session key (solo en sessionStorage → se borra al cerrar pestaña) */
const SESSION_KEY = '_blog_auth';

/* ─── Hash helper ──────────────────────────────────────────────────── */
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ─── DOM refs ─────────────────────────────────────────────────────── */
const blogLock    = document.getElementById('blog-lock');
const blogContent = document.getElementById('blog-content');
const blogForm    = document.getElementById('blog-lock-form');
const blogInput   = document.getElementById('blog-password');
const blogError   = document.getElementById('blog-error');
const blogEyeBtn  = document.getElementById('blog-eye-btn');
const eyeOpen     = document.getElementById('eye-open');
const eyeClosed   = document.getElementById('eye-closed');
const blogLogout  = document.getElementById('blog-logout');
const blogPosts   = document.getElementById('blog-posts');

/* ─── Toggle password visibility ──────────────────────────────────── */
if (blogEyeBtn) {
  blogEyeBtn.addEventListener('click', () => {
    const isText = blogInput.type === 'text';
    blogInput.type = isText ? 'password' : 'text';
    eyeOpen.style.display   = isText ? 'block' : 'none';
    eyeClosed.style.display = isText ? 'none'  : 'block';
  });
}

/* ─── Render posts ─────────────────────────────────────────────────── */
function renderBlogPosts() {
  if (!blogPosts || typeof BLOG_POSTS === 'undefined') return;
  const t = window.i18n ? window.i18n.t : (k) => k;

  blogPosts.innerHTML = BLOG_POSTS.map(post => {
    const date = new Date(post.date).toLocaleDateString(
      document.documentElement.lang || 'es',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
    const tagsHtml = post.tags.map(tag =>
      `<span class="blog-tag">${tag}</span>`
    ).join('');

    return `
      <article class="blog-post-card reveal" id="blog-post-${post.id}">
        <div class="blog-post-header">
          <span class="blog-post-emoji">${post.emoji}</span>
          <div class="blog-post-meta">
            <time class="blog-post-date" datetime="${post.date}">${date}</time>
            <div class="blog-post-tags">${tagsHtml}</div>
          </div>
        </div>
        <h3 class="blog-post-title">${t(post.titleKey)}</h3>
        <p class="blog-post-body">${t(post.bodyKey)}</p>
      </article>`;
  }).join('');

  /* Re-observe new elements for scroll reveal */
  if (typeof revealObserver !== 'undefined') {
    blogPosts.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
}

/* ─── Unlock ───────────────────────────────────────────────────────── */
function unlockBlog() {
  if (blogLock)    blogLock.style.display    = 'none';
  if (blogContent) blogContent.style.display = 'block';
  renderBlogPosts();
}

/* ─── Lock ─────────────────────────────────────────────────────────── */
function lockBlog() {
  sessionStorage.removeItem(SESSION_KEY);
  if (blogContent) blogContent.style.display = 'none';
  if (blogLock)    blogLock.style.display    = 'block';
  if (blogInput)   blogInput.value = '';
  if (blogError)   blogError.textContent = '';
}

/* ─── Form submit ──────────────────────────────────────────────────── */
if (blogForm) {
  blogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pw = blogInput.value.trim();
    if (!pw) return;

    const submitBtn = document.getElementById('blog-submit');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const hash = await sha256(pw);
      if (hash === BLOG_PASSWORD_HASH) {
        sessionStorage.setItem(SESSION_KEY, 'ok');
        if (blogError) blogError.textContent = '';
        unlockBlog();
      } else {
        /* Wrong password — shake animation */
        const card = document.querySelector('.blog-lock-card');
        if (card) {
          card.classList.remove('shake');
          void card.offsetWidth; // reflow
          card.classList.add('shake');
        }
        const t = window.i18n ? window.i18n.t : k => k;
        if (blogError) blogError.textContent = t('blog.lock.error');
        blogInput.value = '';
        blogInput.focus();
      }
    } catch (err) {
      console.error('Hash error:', err);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

/* ─── Logout ───────────────────────────────────────────────────────── */
if (blogLogout) {
  blogLogout.addEventListener('click', lockBlog);
}

/* ─── Auto-unlock if session is active ────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem(SESSION_KEY) === 'ok') {
    unlockBlog();
  }
});

/* ─── Re-render on language change ────────────────────────────────── */
document.addEventListener('langchange', () => {
  if (sessionStorage.getItem(SESSION_KEY) === 'ok') {
    renderBlogPosts();
  }
});

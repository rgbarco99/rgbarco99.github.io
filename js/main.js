/* =============================================
   PORTFOLIO — main.js
   ============================================= */

/* --------------------------------------------------
   1. THEME TOGGLE (dark / light)
   -------------------------------------------------- */
const THEME_KEY = 'portfolio-theme';
const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

/* Load saved theme */
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
applyTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* --------------------------------------------------
   2. NAV — scroll effect + hamburger
   -------------------------------------------------- */
const nav = document.querySelector('.nav');
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

/* --------------------------------------------------
   3. ACTIVE NAV LINK
   -------------------------------------------------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* --------------------------------------------------
   4. TYPEWRITER (i18n-aware)
   -------------------------------------------------- */
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  let phrases = [];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;
  let typeTimer = null;

  function getPhrasesFromI18n() {
    if (window.i18n) {
      const arr = window.i18n.t('hero.typewriter');
      if (Array.isArray(arr)) return arr;
    }
    return ['SAP Fiori Developer', 'ABAP Programmer', 'SAP Consultant'];
  }

  function type() {
    const current = phrases[phraseIdx] || '';
    typewriterEl.textContent = isDeleting
      ? current.slice(0, charIdx - 1)
      : current.slice(0, charIdx + 1);

    isDeleting ? charIdx-- : charIdx++;

    let delay = isDeleting ? 45 : 90;
    if (!isDeleting && charIdx === current.length) { delay = 2000; isDeleting = true; }
    else if (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 350; }

    typeTimer = setTimeout(type, delay);
  }

  function startTypewriter() {
    clearTimeout(typeTimer);
    phrases = getPhrasesFromI18n();
    phraseIdx = 0; charIdx = 0; isDeleting = false;
    typewriterEl.textContent = '';
    typeTimer = setTimeout(type, 600);
  }

  /* Start after i18n is ready */
  document.addEventListener('DOMContentLoaded', startTypewriter);
  document.addEventListener('langchange', startTypewriter);
}

/* --------------------------------------------------
   5. SCROLL REVEAL (IntersectionObserver)
   -------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
});

/* --------------------------------------------------
   6. PARTICLE SYSTEM (canvas hero background)
   -------------------------------------------------- */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 80;
  const MAX_DIST = 140;

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 1.8 + 0.6;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '124,111,255' : '0,229,255';
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,111,255,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------
   6b. EXPERIENCE YEARS — computed from start date, no yearly edits needed
   -------------------------------------------------- */
const EXPERIENCE_START = new Date(2022, 3, 1); // abril 2022

function getExperienceYears() {
  const now = new Date();
  let years = now.getFullYear() - EXPERIENCE_START.getFullYear();
  const beforeAnniversary = now.getMonth() < EXPERIENCE_START.getMonth() ||
    (now.getMonth() === EXPERIENCE_START.getMonth() && now.getDate() < EXPERIENCE_START.getDate());
  if (beforeAnniversary) years--;
  return years;
}

const experienceYearsEl = document.getElementById('stat-experience-years');
if (experienceYearsEl) experienceYearsEl.dataset.target = getExperienceYears();

const clientsCountEl = document.getElementById('stat-clients-count');
if (clientsCountEl && typeof CLIENTS !== 'undefined') clientsCountEl.dataset.target = CLIENTS.length;

document.addEventListener('langchange', () => {
  const years = getExperienceYears();
  document.querySelectorAll('[data-i18n="about.subtitle"]').forEach(el => {
    el.textContent = el.textContent.replace('{years}', years);
  });
});

/* --------------------------------------------------
   7. ANIMATED STAT COUNTERS
   -------------------------------------------------- */
const counterEls = document.querySelectorAll('.counter');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.counted) return;
      e.target.dataset.counted = 'true';
      const target = +e.target.dataset.target;
      const suffix = e.target.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        e.target.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObserver.observe(el));
}

/* --------------------------------------------------
   8. RENDER SKILLS from SKILLS constant
   -------------------------------------------------- */
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid || typeof SKILLS === 'undefined') return;
  const delays = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];
  grid.innerHTML = SKILLS.map((s, i) =>
    `<span class="skill-chip reveal ${delays[i % 4]}">
       <span class="skill-icon">${s.icon}</span> ${s.label}
     </span>`
  ).join('');
  grid.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
  });
}

/* --------------------------------------------------
   9. RENDER CLIENTS from CLIENTS constant
   -------------------------------------------------- */
function renderClients() {
  const grid = document.getElementById('clients-grid');
  if (!grid || typeof CLIENTS === 'undefined') return;
  const delays = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];
  grid.innerHTML = CLIENTS.map((c, i) =>
    `<div class="client-chip reveal ${delays[i % 4]}">
       <span class="client-logo">${c.logo}</span>
       <div>
         <div class="client-name">${c.name}</div>
         <div class="client-sector">${c.sector}</div>
       </div>
     </div>`
  ).join('');
  grid.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderClients();
  initRecommendations();
});

/* --------------------------------------------------
   11. SMOOTH SCROLL
   -------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* --------------------------------------------------
   12. CV PREVIEW MODAL
   -------------------------------------------------- */
const CV_TITLES = { es: 'CV — Español', en: 'CV — English', fr: 'CV — Français' };
const cvModal = document.getElementById('cv-modal');
const cvModalIframe = document.getElementById('cv-modal-iframe');
const cvModalDownload = document.getElementById('cv-modal-download');
const cvModalTitle = document.getElementById('cv-modal-title');
const cvModalClose = document.getElementById('cv-modal-close');
const cvCards = document.querySelectorAll('.cv-card[data-cv-lang]');

function openCvModal(card) {
  if (!cvModal) return;
  const lang = card.dataset.cvLang;
  const href = card.getAttribute('href');
  cvModalIframe.src = href;
  cvModalDownload.href = href;
  cvModalDownload.setAttribute('download', href.split('/').pop());
  cvModalTitle.textContent = CV_TITLES[lang] || 'CV';
  cvModal.classList.add('open');
  cvModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCvModal() {
  if (!cvModal) return;
  cvModal.classList.remove('open');
  cvModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  cvModalIframe.src = '';
}

cvCards.forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    openCvModal(card);
  });
});
cvModalClose?.addEventListener('click', closeCvModal);
cvModal?.addEventListener('click', e => { if (e.target === cvModal) closeCvModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && cvModal?.classList.contains('open')) closeCvModal();
});

/* --------------------------------------------------
   13. RECOMMENDATIONS — carousel + detail modal
   -------------------------------------------------- */
const RECS_DATA_URL    = 'js/recommendations.json';
const RECS_VERSION_URL = 'js/recommendations-version.json';
const RECS_LOCAL_KEY   = '_recs_local_items';
const RECS_DELETED_KEY = '_recs_deleted_items';
const RECS_ADMIN_AUTH  = '_admin_auth';
const RECS_ADMIN_PW    = '_admin_pw';

let _staticRecs = [];
let recsAutoplayTimer = null;
let recsUserInteracted = false;

async function loadStaticRecommendations() {
  try {
    const ver = await fetch(RECS_VERSION_URL, { cache: 'no-store' }).then(r => r.json());
    _staticRecs = await fetch(`${RECS_DATA_URL}?t=${ver.t}`).then(r => r.json());
  } catch { _staticRecs = []; }
}

function getLocalRecommendations() {
  try { return JSON.parse(localStorage.getItem(RECS_LOCAL_KEY) || '[]'); } catch { return []; }
}
function getDeletedRecommendationIds() {
  try { return new Set(JSON.parse(localStorage.getItem(RECS_DELETED_KEY) || '[]')); } catch { return new Set(); }
}
function isRecsAdminSession() { return sessionStorage.getItem(RECS_ADMIN_AUTH) === 'ok'; }

function getAllRecommendations() {
  const deletedIds = getDeletedRecommendationIds();
  const isAdmin = isRecsAdminSession();
  const staticRecs = _staticRecs.filter(r => !deletedIds.has(String(r.id)));
  const localRecs  = getLocalRecommendations();
  const ids = new Set();
  const merged = [];
  for (const r of [...localRecs, ...staticRecs]) {
    const key = String(r.id);
    if (!ids.has(key)) { ids.add(key); merged.push(r); }
  }
  return merged
    .filter(r => isAdmin || r.visibility !== 'hidden')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function fmtRecDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T12:00:00').toLocaleDateString(
    document.documentElement.lang || 'es',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );
}

function initialsFromName(name) {
  return (name || '').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
}

function recCardMarkup(r, i, delays) {
  const photo = r.photo
    ? `<div class="rec-card-photo"><img src="${r.photo}" alt="${r.name}" loading="lazy" /></div>`
    : `<div class="rec-card-photo"><div class="rec-avatar-placeholder">${initialsFromName(r.name)}</div></div>`;
  const role = r.role ? `<div class="rec-card-role">${r.role}</div>` : '';
  const excerpt = (r.excerpt || r.text || '').replace(/\s+/g, ' ').trim();
  return `
    <article class="rec-card reveal ${delays[i % 4]}" data-rec-id="${r.id}" role="button" tabindex="0" aria-label="Ver recomendación de ${r.name}">
      ${photo}
      <div class="rec-card-name">${r.name}</div>
      ${role}
      <p class="rec-card-excerpt">${excerpt}</p>
      <div class="rec-card-footer">
        <span class="rec-card-date">${fmtRecDate(r.date)}</span>
        <span class="rec-card-link-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </span>
      </div>
    </article>`;
}

function renderRecommendationCards(list) {
  const carousel = document.getElementById('recs-carousel');
  const wrap     = document.getElementById('recs-carousel-wrap');
  const dotsEl   = document.getElementById('recs-dots');
  const emptyEl  = document.getElementById('recs-empty');
  if (!carousel) return;

  if (!list.length) {
    carousel.innerHTML = '';
    dotsEl.innerHTML = '';
    wrap.style.display = 'none';
    emptyEl.style.display = 'block';
    return;
  }
  wrap.style.display = '';
  emptyEl.style.display = 'none';

  const delays = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];
  carousel.innerHTML = list.map((r, i) => recCardMarkup(r, i, delays)).join('');

  carousel.querySelectorAll('.rec-card').forEach(card => {
    const openFn = () => {
      const rec = list.find(r => String(r.id) === card.dataset.recId);
      if (rec) openRecModal(rec);
    };
    card.addEventListener('click', openFn);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openFn(); });
  });

  carousel.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
  });

  if (list.length > 1 && list.length <= 12) {
    dotsEl.innerHTML = list.map((_, i) =>
      `<button class="recs-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ir a la recomendación ${i + 1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('.recs-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const card = carousel.children[+dot.dataset.index];
        if (card) carousel.scrollTo({ left: card.offsetLeft - carousel.offsetLeft, behavior: 'smooth' });
      });
    });
  } else {
    dotsEl.innerHTML = '';
  }

  updateRecsCarouselState();
}

function updateRecsCarouselState() {
  const carousel = document.getElementById('recs-carousel');
  const prevBtn   = document.getElementById('recs-prev');
  const nextBtn   = document.getElementById('recs-next');
  const dotsEl    = document.getElementById('recs-dots');
  if (!carousel) return;

  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  if (prevBtn) prevBtn.disabled = carousel.scrollLeft <= 4;
  if (nextBtn) nextBtn.disabled = carousel.scrollLeft >= maxScroll - 4;

  if (dotsEl && dotsEl.children.length) {
    const cards = [...carousel.children];
    let closest = 0, minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - carousel.offsetLeft - carousel.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    [...dotsEl.children].forEach((dot, i) => dot.classList.toggle('active', i === closest));
  }
}

function scrollRecsCarousel(dir) {
  const carousel = document.getElementById('recs-carousel');
  if (!carousel) return;
  const card = carousel.querySelector('.rec-card');
  const step = card ? card.getBoundingClientRect().width + 20 : 220;
  carousel.scrollBy({ left: dir * step, behavior: 'smooth' });
}

function openRecModal(r) {
  const modal = document.getElementById('rec-modal');
  if (!modal) return;
  const photoEl  = document.getElementById('rec-modal-photo');
  const personEl = document.getElementById('rec-modal-person');
  photoEl.innerHTML = r.photo
    ? `<img src="${r.photo}" alt="${r.name}" />`
    : `<div class="rec-modal-avatar-placeholder">${initialsFromName(r.name)}</div>`;
  document.getElementById('rec-modal-name').textContent = r.name;
  document.getElementById('rec-modal-role').textContent = r.role || '';
  document.getElementById('rec-modal-date').textContent = fmtRecDate(r.date);
  document.getElementById('rec-modal-text').textContent = r.text || '';
  if (r.linkedin) {
    personEl.setAttribute('href', r.linkedin);
    personEl.setAttribute('target', '_blank');
    personEl.setAttribute('rel', 'noopener');
  } else {
    personEl.removeAttribute('href');
    personEl.removeAttribute('target');
    personEl.removeAttribute('rel');
  }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeRecModal() {
  const modal = document.getElementById('rec-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function stopRecsAutoplay() {
  clearInterval(recsAutoplayTimer);
  recsAutoplayTimer = null;
}

function startRecsAutoplay() {
  const carousel = document.getElementById('recs-carousel');
  if (!carousel || recsUserInteracted || recsAutoplayTimer) return;
  if (carousel.scrollWidth <= carousel.clientWidth + 10) return;
  if (carousel.children.length <= 1) return;
  recsAutoplayTimer = setInterval(() => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (carousel.scrollLeft >= maxScroll - 4) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      scrollRecsCarousel(1);
    }
  }, 4500);
}

function setupRecsAutoplayPausing() {
  const carousel = document.getElementById('recs-carousel');
  const wrap = document.getElementById('recs-carousel-wrap');
  if (!carousel || !wrap) return;

  const stopForever = () => { recsUserInteracted = true; stopRecsAutoplay(); };
  ['pointerdown', 'touchstart', 'wheel'].forEach(evt =>
    carousel.addEventListener(evt, stopForever, { once: true, passive: true })
  );
  document.getElementById('recs-prev')?.addEventListener('click', stopForever, { once: true });
  document.getElementById('recs-next')?.addEventListener('click', stopForever, { once: true });

  wrap.addEventListener('mouseenter', stopRecsAutoplay);
  wrap.addEventListener('mouseleave', () => { if (!recsUserInteracted) startRecsAutoplay(); });
  wrap.addEventListener('focusin', stopRecsAutoplay);
  wrap.addEventListener('focusout', () => { if (!recsUserInteracted) startRecsAutoplay(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopRecsAutoplay();
    else if (!recsUserInteracted) startRecsAutoplay();
  });
}

function setupRecsAdminBar() {
  const logoutBtn = document.getElementById('recs-admin-logout-btn');
  if (!logoutBtn) return;
  if (isRecsAdminSession()) logoutBtn.style.display = 'inline-flex';
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem(RECS_ADMIN_AUTH);
    sessionStorage.removeItem(RECS_ADMIN_PW);
    location.reload();
  });
}

async function initRecommendations() {
  const carousel = document.getElementById('recs-carousel');
  if (!carousel) return; // only runs on index.html

  setupRecsAdminBar();
  await loadStaticRecommendations();
  renderRecommendationCards(getAllRecommendations());

  document.getElementById('recs-prev')?.addEventListener('click', () => scrollRecsCarousel(-1));
  document.getElementById('recs-next')?.addEventListener('click', () => scrollRecsCarousel(1));
  carousel.addEventListener('scroll', updateRecsCarouselState, { passive: true });
  window.addEventListener('resize', updateRecsCarouselState);

  document.getElementById('rec-modal-close')?.addEventListener('click', closeRecModal);
  document.getElementById('rec-modal')?.addEventListener('click', e => {
    if (e.target.id === 'rec-modal') closeRecModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('rec-modal')?.classList.contains('open')) closeRecModal();
  });

  setupRecsAutoplayPausing();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) startRecsAutoplay();
}

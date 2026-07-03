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
});

/* --------------------------------------------------
   10. PROJECTS — search + filter
   -------------------------------------------------- */
const searchInput = document.getElementById('project-search');
const filterPills = document.querySelectorAll('.filter-pill');
const projectCards = document.querySelectorAll('.project-card');
const noResults = document.getElementById('no-results');
const resultsCount = document.getElementById('results-count');

if (searchInput && projectCards.length) {
  let activeFilter = 'all';

  function filterProjects() {
    const query = searchInput.value.toLowerCase().trim();
    let visible = 0;
    projectCards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const desc = card.dataset.desc.toLowerCase();
      const tags = card.dataset.tags.toLowerCase();
      const category = card.dataset.category;
      const matchesSearch = !query || title.includes(query) || desc.includes(query) || tags.includes(query);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      if (matchesSearch && matchesFilter) {
        card.style.display = '';
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'fadeIn 0.35s ease forwards';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    if (resultsCount) resultsCount.innerHTML = `Mostrando <span>${visible}</span> proyecto${visible !== 1 ? 's' : ''}`;
  }

  searchInput.addEventListener('input', filterProjects);
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      filterProjects();
    });
  });

  const styleEl = document.createElement('style');
  styleEl.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }';
  document.head.appendChild(styleEl);
  filterProjects();
}

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

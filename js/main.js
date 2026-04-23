/* =============================================
   PORTFOLIO — main.js
   ============================================= */

/* --------------------------------------------------
   1. NAV — scroll effect + hamburger
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
  // Close on link click
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

/* --------------------------------------------------
   2. ACTIVE NAV LINK — highlight current page
   -------------------------------------------------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* --------------------------------------------------
   3. TYPEWRITER EFFECT
   -------------------------------------------------- */
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const phrases = [
    'Desarrollador Full Stack',
    'Ingeniero de Software',
    'Amante del código limpio',
    'Siempre aprendiendo'
  ];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    typewriterEl.textContent = isDeleting
      ? current.slice(0, charIdx - 1)
      : current.slice(0, charIdx + 1);

    isDeleting ? charIdx-- : charIdx++;

    let delay = isDeleting ? 45 : 90;
    if (!isDeleting && charIdx === current.length) { delay = 2000; isDeleting = true; }
    else if (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 350; }

    setTimeout(type, delay);
  }
  setTimeout(type, 800);
}

/* --------------------------------------------------
   4. SCROLL REVEAL (IntersectionObserver)
   -------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* --------------------------------------------------
   5. PARTICLE SYSTEM (canvas hero background)
   -------------------------------------------------- */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [], animId;
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
    animId = requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------
   6. ANIMATED STAT COUNTERS
   -------------------------------------------------- */
const counterEls = document.querySelectorAll('.counter');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.counted) return;
      e.target.dataset.counted = 'true';
      const target = +e.target.dataset.target;
      const suffix = e.target.dataset.suffix || '';
      const prefix = e.target.dataset.prefix || '';
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(ease * target);
        e.target.textContent = prefix + value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObserver.observe(el));
}

/* --------------------------------------------------
   7. PROJECTS — search + filter
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
        card.offsetHeight; // reflow
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

  // Inject fadeIn keyframe dynamically
  const styleEl = document.createElement('style');
  styleEl.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }';
  document.head.appendChild(styleEl);

  filterProjects(); // initial
}

/* --------------------------------------------------
   8. SMOOTH SCROLL for anchor links
   -------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

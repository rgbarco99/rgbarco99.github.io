/* =====================================================================
   blog.js — Blog preview handler for index.html
   The full blog lives on blog.html (separate page).
   This file only handles the "Ver blog" CTA in the index.html teaser.
   ===================================================================== */

/* If the user is already authenticated (sessionStorage), update the CTA
   in the index.html preview section to read "Ir al blog" instead. */
document.addEventListener('DOMContentLoaded', () => {
  const blogCta = document.getElementById('blog-preview-cta-btn');
  if (blogCta && sessionStorage.getItem('_blog_auth') === 'ok') {
    const label = blogCta.querySelector('[data-i18n="blog.preview.cta"]');
    if (label) label.textContent = 'Ir al blog';
  }
});

(() => {
  'use strict';

  function initializeHomepage() {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (!menuToggle || !nav) return;

    menuToggle.setAttribute('aria-controls', nav.id);

    function setMenuOpen(open) {
      nav.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    }

    setMenuOpen(false);

    menuToggle.addEventListener('click', () => {
      setMenuOpen(!nav.classList.contains('open'));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    window.matchMedia('(max-width: 900px)').addEventListener('change', (event) => {
      if (event.matches && nav.contains(document.activeElement)) menuToggle.focus();
      setMenuOpen(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHomepage, { once: true });
  } else {
    initializeHomepage();
  }
})();

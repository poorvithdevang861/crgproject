/* Header: mobile menu, active page highlight, "Explore" dropdown, scroll style */
import { NAV_ALIASES } from '../config.js';

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
}

function initActiveNav() {
  let page = location.pathname.split('/').pop() || 'index.html';
  page = NAV_ALIASES[page] || page;

  document.querySelectorAll('.nav a:not(.mobile-only)').forEach((link) => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
}

function initDropdowns() {
  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const button = dropdown.querySelector('.nav-dropdown-toggle');
    if (!button) return;

    if (dropdown.querySelector('a.active')) button.classList.add('active');

    const setOpen = (open) => {
      dropdown.classList.toggle('open', open);
      button.setAttribute('aria-expanded', open);
    };

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      setOpen(!dropdown.classList.contains('open'));
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) setOpen(false);
    });

    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        button.focus();
      }
    });
  });
}

function initHeaderScroll() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  const update = () => topbar.classList.toggle('scrolled', window.scrollY > 40);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

export function initNavigation() {
  initMobileMenu();
  // Active links must be marked before dropdowns check for them
  initActiveNav();
  initDropdowns();
  initHeaderScroll();
}

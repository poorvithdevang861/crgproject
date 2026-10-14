/* Fade sections in as they scroll into view */

const REVEAL_SELECTORS = [
  '.section-head',
  '.services-grid > *',
  '.projects-grid > *',
  '.cta-grid > *',
  '.two-col > *',
  '.resource-grid > *',
  '.process-grid > *',
  '.service-block',
  '.ba-grid > *',
  '.guide-list > *',
  '.issue-grid > *',
  '.compare-wrap > *',
  '.timeline > *',
  '.cta-hero .container',
  '.partner-panel',
  '.industry'
].join(', ');

export function initScrollReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('in-view');
      observer.unobserve(el);

      // Remove the reveal classes once finished so hover transitions behave normally
      el.addEventListener('transitionend', function done(event) {
        if (event.target !== el || event.propertyName !== 'transform') return;
        el.classList.remove('reveal', 'in-view');
        el.style.removeProperty('--delay');
        el.removeEventListener('transitionend', done);
      });
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(REVEAL_SELECTORS).forEach((el) => {
    // Content already on screen at load stays put to avoid a flicker
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const index = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--delay', `${Math.min(index, 4) * 0.1}s`);
    el.classList.add('reveal');
    observer.observe(el);
  });
}

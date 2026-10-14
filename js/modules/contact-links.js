/* Sticky WhatsApp button and social profile links */
import { SITE_CONFIG } from '../config.js';

const WHATSAPP_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.13c-.24.69-1.42 1.32-1.96 1.37-.5.05-.98.24-3.31-.69-2.8-1.1-4.58-3.97-4.72-4.15-.14-.18-1.13-1.5-1.13-2.87 0-1.37.72-2.04.97-2.32.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.62.48.24.55.8 1.92.87 2.06.07.14.12.3.02.48-.1.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.18-.28.37-.23.62-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.32.07.12.07.67-.17 1.36Z"/></svg>';

function initWhatsAppButton() {
  if (!SITE_CONFIG.whatsappNumber) return;

  const link = document.createElement('a');
  link.className = 'whatsapp-float';
  link.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', 'Chat with CRG on WhatsApp');
  link.innerHTML = `${WHATSAPP_ICON}<span>WhatsApp us</span>`;
  document.body.appendChild(link);
}

function initSocialLinks() {
  const urls = { instagram: SITE_CONFIG.instagramUrl, facebook: SITE_CONFIG.facebookUrl };
  document.querySelectorAll('[data-social]').forEach((link) => {
    const url = urls[link.getAttribute('data-social')];
    if (url) link.href = url;
  });
}

export function initContactLinks() {
  initWhatsAppButton();
  initSocialLinks();
}

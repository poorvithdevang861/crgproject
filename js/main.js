/* ==========================================================================
   Civic Restoration Group — Site scripts (entry point)

   Business details:            config.js
   Header and menus:            modules/navigation.js
   Scroll reveal animations:    modules/scroll-reveal.js
   Inspection request pop-up:   modules/inspection-dialog.js
   Enquiry forms:               modules/forms.js
   WhatsApp and social links:   modules/contact-links.js
   Before / after slider:       modules/compare-slider.js
   ========================================================================== */

import { initNavigation } from './modules/navigation.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initInspectionDialog } from './modules/inspection-dialog.js';
import { initForms } from './modules/forms.js';
import { initContactLinks } from './modules/contact-links.js';
import { initCompareSliders } from './modules/compare-slider.js';

initNavigation();
initScrollReveal();
// The pop-up adds its own form, so it must exist before forms are wired up
initInspectionDialog();
initForms();
initContactLinks();
initCompareSliders();

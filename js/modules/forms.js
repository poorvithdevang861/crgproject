/* Enquiry forms
   Forms with [data-ajax-form] post to Web3Forms in the background and show
   a success message in place. Without JS they post normally and redirect. */
import { SITE_CONFIG } from '../config.js';

function initAjaxForms() {
  if (!window.fetch || !window.FormData) return;

  document.querySelectorAll('form[data-ajax-form]').forEach((form) => {
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('[type="submit"]');

    const showStatus = (message, isError) => {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle('is-error', !!isError);
      status.hidden = false;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const label = submit.textContent;
      submit.disabled = true;
      submit.textContent = 'Sending…';
      if (status) status.hidden = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Submission failed');
        form.innerHTML = `
          <div class="form-success" role="status">
            <h3>Thanks, we’ve got your request.</h3>
            <p>A member of the CRG team will call you shortly to arrange a time.</p>
          </div>`;
      } catch (error) {
        submit.disabled = false;
        submit.textContent = label;
        showStatus(`Sorry, something went wrong. Please try again or call us on ${SITE_CONFIG.phoneDisplay}.`, true);
      }
    });
  });
}

/* Pre-select the service on the contact form (contact.html?service=...) */
function initServicePrefill() {
  const select = document.querySelector('form select[name="service"]');
  const wanted = new URLSearchParams(location.search).get('service');
  if (!select || !wanted) return;

  [...select.options].forEach((option) => {
    if (option.value.toLowerCase() === wanted.toLowerCase()) select.value = option.value;
  });
}

export function initForms() {
  initAjaxForms();
  initServicePrefill();
}

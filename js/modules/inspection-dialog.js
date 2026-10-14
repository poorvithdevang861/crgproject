/* Inspection request pop-up
   Any element with [data-inspection-dialog] opens it; an optional data-issue
   pre-selects that issue. Without JS the link simply goes to the contact page. */
import { SITE_CONFIG, INSPECTION_ISSUES, DEFAULT_EXAMPLE, QLD_AREAS } from '../config.js';

const SAVED_DETAILS_KEY = 'crg-inspection-details';

function buildDialog() {
  const chips = INSPECTION_ISSUES.map((issue) =>
    `<label class="chip"><input type="radio" name="roof_issue" value="${issue.label}" required><span>${issue.label}</span></label>`
  ).join('');
  const areas = QLD_AREAS.map((area) => `<option value="${area}">`).join('');

  const dialog = document.createElement('dialog');
  dialog.className = 'inspection-dialog';
  dialog.id = 'inspection-dialog';
  dialog.setAttribute('aria-labelledby', 'inspection-dialog-title');
  dialog.innerHTML = `
    <div class="dialog-inner">
      <button class="dialog-close" type="button" aria-label="Close" data-dialog-close>×</button>
      <p class="eyebrow">Free Roof Inspection</p>
      <h2 id="inspection-dialog-title">Book in 30 seconds</h2>
      <p>Tap your issue, add your details and we’ll call you to book a time.</p>
      <form class="form" action="https://api.web3forms.com/submit" method="POST" data-ajax-form>
        <input type="hidden" name="access_key" value="${SITE_CONFIG.web3formsKey}">
        <input type="hidden" name="subject" value="New inspection request (website pop-up)">
        <input type="hidden" name="from_name" value="Civic Restoration Group Website">
        <input type="hidden" name="page" value="">
        <input type="checkbox" name="botcheck" style="display:none">
        <fieldset class="chip-group"><legend>What’s happening with your roof?</legend>${chips}</fieldset>
        <div class="form-row">
          <label>Name<input type="text" name="name" autocomplete="name" placeholder="e.g. Sarah Jones" required></label>
          <label>Phone<input type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="e.g. 0412 345 678" required></label>
        </div>
        <label>Suburb<input type="text" name="suburb" list="qld-areas" autocomplete="address-level2" placeholder="e.g. Toowoomba" required></label>
        <datalist id="qld-areas">${areas}</datalist>
        <label><span>Anything else? <span class="optional">(optional)</span></span><textarea name="message" rows="2" placeholder="${DEFAULT_EXAMPLE}"></textarea></label>
        <p class="form-status" role="alert" hidden></p>
        <button class="btn btn-amber" type="submit">Request My Free Inspection</button>
      </form>
    </div>`;
  document.body.appendChild(dialog);
  return dialog;
}

/* Name, phone and suburb are kept in this browser so repeat visitors don't retype them */
function rememberDetails(form) {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(SAVED_DETAILS_KEY)) || {}; } catch (e) {}

  ['name', 'phone', 'suburb'].forEach((name) => {
    const input = form.elements[name];
    if (!input) return;
    if (!input.value && saved[name]) input.value = saved[name];
    input.addEventListener('input', () => {
      saved[name] = input.value;
      try { localStorage.setItem(SAVED_DETAILS_KEY, JSON.stringify(saved)); } catch (e) {}
    });
  });
}

export function initInspectionDialog() {
  // contact.html already has the full form on the page
  if (/contact\.html$/.test(location.pathname)) return;

  const dialog = document.getElementById('inspection-dialog') || buildDialog();
  if (typeof dialog.showModal !== 'function') return;
  const form = dialog.querySelector('form');
  rememberDetails(form);

  const showExampleFor = (label) => {
    const issue = INSPECTION_ISSUES.find((item) => item.label === label);
    form.elements.message.placeholder = issue ? issue.example : DEFAULT_EXAMPLE;
  };

  form.addEventListener('change', (event) => {
    if (event.target.name === 'roof_issue') showExampleFor(event.target.value);
  });

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-inspection-dialog]');
    if (!trigger) return;
    event.preventDefault();
    // After a successful send the form only holds the thank-you message
    if (!form.elements.page) return dialog.showModal();

    const issue = trigger.getAttribute('data-issue');
    if (issue) {
      const choice = form.querySelector(`input[name="roof_issue"][value="${issue}"]`);
      if (choice) choice.checked = true;
      showExampleFor(issue);
    }
    form.elements.page.value = location.pathname;

    dialog.showModal();
    const nextEmpty = [...form.querySelectorAll('input[required]:not([type="radio"])')].find((input) => !input.value);
    (nextEmpty || form.querySelector('[type="submit"]')).focus();
  });

  dialog.querySelectorAll('[data-dialog-close]').forEach((button) => {
    button.addEventListener('click', () => dialog.close());
  });

  // Close when clicking the dimmed backdrop
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

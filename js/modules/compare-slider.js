/* Before / after comparison slider */

export function initCompareSliders() {
  document.querySelectorAll('[data-compare]').forEach((compare) => {
    const range = compare.querySelector('input[type="range"]');
    if (!range) return;
    range.addEventListener('input', () => {
      compare.style.setProperty('--pos', `${range.value}%`);
    });
  });
}

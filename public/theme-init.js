// Apply appearance before the app renders, so a saved dark preference doesn't flash light.
(() => {
  let choice = 'system';
  try {
    const value = localStorage.getItem('commonplace:theme');
    if (['light', 'dark', 'system'].includes(value)) choice = value;
  } catch {}
  const resolved =
    choice === 'system'
      ? matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : choice;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themeChoice = choice;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', resolved === 'dark' ? '#111214' : '#f7f8fa');
})();

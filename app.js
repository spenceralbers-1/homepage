const ready = () => {
  document.body.classList.add('is-ready');
  if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    const source = new EventSource('/events');
    source.addEventListener('reload', () => {
      window.location.reload();
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

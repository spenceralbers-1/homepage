const ready = () => {
  if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    const source = new EventSource('/events');
    source.addEventListener('reload', () => {
      window.location.reload();
    });
  }
  const lastUpdated = document.getElementById('last-updated');
  if (lastUpdated) {
    const updated = new Date(document.lastModified);
    const formatter = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    lastUpdated.textContent = formatter.format(updated);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

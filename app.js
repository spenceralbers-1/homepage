const safeStorage = {
  get() {
    try {
      return localStorage.getItem('theme');
    } catch (error) {
      return null;
    }
  },
  set(value) {
    try {
      localStorage.setItem('theme', value);
    } catch (error) {
      return;
    }
  },
  remove() {
    try {
      localStorage.removeItem('theme');
    } catch (error) {
      return;
    }
  },
};

const setTheme = (mode) => {
  const root = document.documentElement;
  if (mode) {
    root.setAttribute('data-theme', mode);
    safeStorage.set(mode);
  } else {
    root.removeAttribute('data-theme');
    safeStorage.remove();
  }
};

const getTheme = () => {
  const stored = safeStorage.get();
  if (stored) {
    return stored;
  }
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
  return 'dark';
};

const updateToggleLabel = (button, mode) => {
  button.textContent = `Mode: ${mode}`;
};

const ready = () => {
  document.body.classList.add('is-ready');
  const toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) {
    return;
  }

  const mode = getTheme();
  setTheme(mode);
  updateToggleLabel(toggle, mode);

  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light'
      ? 'dark'
      : 'light';
    setTheme(next);
    updateToggleLabel(toggle, next);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

// === Theme toggle with persistence ===
(function initTheme() {
    const saved = localStorage.getItem('theme');
    const root = document.documentElement;
    if (saved === 'light' || saved === 'dark') {
      root.dataset.theme = saved;
    } else {
      // default: dark
      root.dataset.theme = root.dataset.theme || 'dark';
    }
    updateThemeButtonLabel();
  })();
  
  function updateThemeButtonLabel() {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;
    const isDark = (document.documentElement.dataset.theme === 'dark');
    btn.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
    btn.setAttribute('aria-pressed', String(isDark));
  }
  
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const curr = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
      const next = curr === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme', next);
      updateThemeButtonLabel();
    });
  }
  

// === Experience accordion ===
document.querySelectorAll('.xp-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const detail = btn.nextElementSibling;
    if (detail) detail.hidden = expanded;
  });
});

// === Skill filter pills ===
document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('#skills .pill');
  const cards = document.querySelectorAll('#skillDeck .card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const scope = pill.dataset.scope;

      pills.forEach(p => {
        const active = p === pill;
        p.classList.toggle('is-active', active);
        p.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      cards.forEach(card => {
        card.hidden = scope !== 'all' && card.dataset.scope !== scope;
      });
    });
  });

  // default = All
  const all = document.querySelector('#skills .pill[data-scope="all"]');
  if (all) all.click();
});

// === Project search ===
const searchBox = document.getElementById('q');
if (searchBox) {
  searchBox.addEventListener('input', () => {
    const term = searchBox.value.toLowerCase();
    document.querySelectorAll('#projGrid .proj').forEach(proj => {
      proj.hidden = !proj.textContent.toLowerCase().includes(term);
    });
  });
}

// === Contact form validation ===
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameErr = document.getElementById('nameErr');
    const emailErr = document.getElementById('emailErr');
    const messageErr = document.getElementById('messageErr');
    const status = document.getElementById('formStatus');

    let ok = true;
    nameErr.hidden = emailErr.hidden = messageErr.hidden = true;

    if (!name.value || name.value.trim().length < 2) { nameErr.hidden = false; ok = false; }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)) { emailErr.hidden = false; ok = false; }
    if (!message.value || message.value.trim().length < 10) { messageErr.hidden = false; ok = false; }

    if (ok) {
      status.textContent = 'Thanks! This demo validates on the client only.';
      form.reset();
    } else {
      status.textContent = '';
    }
  });
}

// === Footer year ===
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ============================================
   FREE WALKING TOUR IQUITOS — main.js
   ============================================ */

/* ============================================
   1. NAVBAR — scroll effect
   ============================================ */
const nav = document.querySelector("nav");

let lastScroll = 0;

window.addEventListener("scroll", () => {

  const currentScroll = window.scrollY;

  // efecto visual navbar
  if (currentScroll > 60) {
    nav.style.background = "rgba(10, 28, 10, 0.97)";
    nav.style.backdropFilter = "blur(12px)";
    nav.style.boxShadow = "0 2px 24px rgba(0,0,0,0.4)";
  } else {
    nav.style.background = "var(--verde-oscuro)";
    nav.style.backdropFilter = "none";
    nav.style.boxShadow = "none";
  }

  // ocultar al bajar
  if (currentScroll > lastScroll && currentScroll > 120) {
    nav.style.transform = "translateY(-100%)";
  }

  lastScroll = currentScroll;

});

// mostrar navbar si el mouse se acerca arriba
document.addEventListener("mousemove", (e) => {

  if (e.clientY < 90) {
    nav.style.transform = "translateY(0)";
  }

});

/* ============================================
   2. SMOOTH SCROLL — links internos
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ============================================
   3. ACTIVE NAV LINK — resalta sección visible
   ============================================ */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ============================================
   4. SCROLL REVEAL — animación al hacer scroll
   ============================================ */
const revealEls = document.querySelectorAll(
  '.feature, .lugar-card, .gal-item, .contact-detail, .exp-badge'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger por índice dentro del grupo
      const siblings = [...entry.target.parentElement.children];
      const delay    = siblings.indexOf(entry.target) * 80;
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => {
  el.style.opacity  = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .revealed { opacity: 1 !important; transform: translateY(0) !important; }
    .nav-links a.active { color: var(--dorado); }
  </style>
`);

/* ============================================
   5. FORMULARIO — validación y envío
   ============================================ */
const form = document.querySelector('.contact-form');

if (form) {
  const inputs   = form.querySelectorAll('input, select, textarea');
  const btnSubmit = form.querySelector('.btn-submit');

  // Validación en tiempo real
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
  });

  // Submit
  btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    let valid = true;

    inputs.forEach(input => {
      if (!validateField(input)) valid = false;
    });

    if (valid) showSuccess();
  });

  function validateField(field) {
    if (!field.value.trim()) {
      setError(field, 'Este campo es obligatorio.');
      return false;
    }
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      setError(field, 'Ingresa un email válido.');
      return false;
    }
    clearError(field);
    return true;
  }

  function setError(field, msg) {
    clearError(field);
    field.style.borderColor = '#e05555';
    const err = document.createElement('span');
    err.className   = 'field-error';
    err.textContent = msg;
    err.style.cssText = 'display:block;font-size:0.75rem;color:#e05555;margin-top:5px;';
    field.parentElement.appendChild(err);
  }

  function clearError(field) {
    field.style.borderColor = '';
    const err = field.parentElement.querySelector('.field-error');
    if (err) err.remove();
  }

  function showSuccess() {
    btnSubmit.textContent = '✅ ¡Reserva confirmada!';
    btnSubmit.style.background = '#2d7a2d';
    btnSubmit.style.color = '#fff';
    btnSubmit.disabled = true;
    inputs.forEach(f => f.disabled = true);

    setTimeout(() => {
      btnSubmit.textContent = 'Reservar ahora — ¡Es gratis!';
      btnSubmit.style.background = '';
      btnSubmit.style.color = '';
      btnSubmit.disabled = false;
      inputs.forEach(f => { f.disabled = false; f.value = ''; });
    }, 4000);
  }
}

/* ============================================
   6. CONTADOR ANIMADO — badge "500+"
   ============================================ */
function animateCounter(el, target, duration = 1800) {
  let start   = 0;
  const step  = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = start + '+';
    }
  }, 16);
}

const badge = document.querySelector('.exp-badge .big');
if (badge) {
  const badgeObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounter(badge, 500);
      badgeObserver.disconnect();
    }
  }, { threshold: 0.6 });
  badgeObserver.observe(badge);
}

/* ============================================
   7. WHATSAPP — tooltip al hover
   ============================================ */
const waBtn = document.querySelector('.whatsapp-btn');
if (waBtn) {
  const tooltip = document.createElement('span');
  tooltip.textContent = '¡Escríbenos!';
  tooltip.style.cssText = `
    position:absolute; right:70px; top:50%; transform:translateY(-50%);
    background:#1a1a1a; color:#fff; font-size:0.78rem; font-family:'DM Sans',sans-serif;
    padding:6px 12px; border-radius:8px; white-space:nowrap;
    pointer-events:none; opacity:0; transition:opacity 0.2s;
  `;
  waBtn.style.position = 'relative';
  waBtn.appendChild(tooltip);
  waBtn.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
  waBtn.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
}

/* ============================================
   8. SCROLL TO TOP — botón que aparece al bajar
   ============================================ */
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '&#8679;';
scrollTopBtn.title = 'Volver arriba';
scrollTopBtn.style.cssText = `
  position:fixed; bottom:100px; right:30px; width:42px; height:42px;
  background:var(--verde); color:var(--dorado); border:1px solid rgba(232,160,32,0.3);
  border-radius:50%; font-size:1.4rem; cursor:pointer; z-index:199;
  display:flex; align-items:center; justify-content:center;
  opacity:0; transform:translateY(10px);
  transition:opacity 0.3s, transform 0.3s;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.style.opacity  = '1';
    scrollTopBtn.style.transform = 'translateY(0)';
  } else {
    scrollTopBtn.style.opacity  = '0';
    scrollTopBtn.style.transform = 'translateY(10px)';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

});
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

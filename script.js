/* =========================================================
   GLOBAL TECH INSTITUTE — script.js
   Production-ready interactivity
   ========================================================= */

// ---------- Mobile Navigation ----------
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// ---------- Mega Menu (mobile accordion) ----------
document.querySelectorAll('.nav-links > li').forEach((li) => {
  const link = li.querySelector('.nav-link');
  const mega = li.querySelector('.mega-menu');
  if (link && mega) {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        mega.classList.toggle('open');
      }
    });
  }
});

// ---------- Navbar scroll effect ----------
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---------- Scroll Reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- Animated Counters ----------
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

// ---------- Course Catalog Filtering ----------
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

if (filterBtns.length && courseCards.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      courseCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

// ---------- Login Form Validation ----------
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let valid = true;

    // Email validation
    const emailErr = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, emailErr, 'Email address is required.');
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      showError(email, emailErr, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(email, emailErr);
    }

    // Password validation
    const passErr = document.getElementById('passwordError');
    if (!password.value) {
      showError(password, passErr, 'Password is required.');
      valid = false;
    } else if (password.value.length < 8) {
      showError(password, passErr, 'Password must be at least 8 characters.');
      valid = false;
    } else {
      clearError(password, passErr);
    }

    if (valid) {
      const btn = loginForm.querySelector('.login-btn');
      btn.textContent = 'Signing in...';
      btn.disabled = true;

      // Simulated authentication
      setTimeout(() => {
        btn.textContent = 'Sign In';
        btn.disabled = false;
        showToast('Login successful! Welcome back to Global Tech Institute. 🎓');
        loginForm.reset();
      }, 1200);
    }
  });
}

function showError(input, errEl, message) {
  input.classList.add('error');
  errEl.textContent = message;
  errEl.classList.add('show');
}

function clearError(input, errEl) {
  input.classList.remove('error');
  errEl.textContent = '';
  errEl.classList.remove('show');
}

// ---------- Newsletter Signup ----------
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const msg = document.getElementById('newsletterMsg');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(input.value.trim())) {
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#f87171';
      return;
    }

    msg.textContent = '🎉 Thank you for subscribing! Check your inbox to confirm.';
    msg.style.color = '#22c55e';
    input.value = '';
  });
}

// ---------- Toast Notification ----------
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
      background: rgba(17, 24, 49, 0.95); color: #fff; padding: 16px 28px;
      border-radius: 12px; border: 1px solid rgba(255,255,255,0.15);
      backdrop-filter: blur(16px); box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      font-size: 0.95rem; z-index: 9999; transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
      max-width: 90vw; text-align: center;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 3000);
}

// ---------- Smooth scroll for anchor links ----------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ---------- Current year in footer ----------
document.querySelectorAll('.year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
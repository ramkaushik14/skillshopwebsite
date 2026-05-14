/* ============================================================
   THE SKILL SHOP — main.js
============================================================ */

(function () {
  'use strict';

  /* ---------- Nav: scroll shadow ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ---------- Hamburger toggle ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections    = document.querySelectorAll('section[id], div[id]');
  const navAnchors  = document.querySelectorAll('.nav-links a');
  if (navAnchors.length && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            if (href && (href === '#' + entry.target.id || href === 'index.html#' + entry.target.id)) {
              a.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => sectionObserver.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Animated counter ---------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const counterEls = document.querySelectorAll('[data-target]');
  if (counterEls.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* ---------- Courses page: tab switching ---------- */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanes  = document.querySelectorAll('.tab-pane');
  if (tabBtns.length && tabPanes.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const pane = document.getElementById('tab-' + target);
        if (pane) pane.classList.add('active');
      });
    });
  }

  /* ---------- Contact form ---------- */
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (form && successMsg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(res => {
          if (res.ok) {
            form.reset();
            successMsg.style.display = 'block';
            setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
          } else {
            alert('There was a problem sending your message. Please email us directly at info@theskillshop.in');
          }
        })
        .catch(() => {
          alert('There was a problem sending your message. Please email us directly at info@theskillshop.in');
        });
    });
  }

})();

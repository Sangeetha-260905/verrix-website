/* =========================================================
   VERRIX — script.js
   1. Mobile hamburger menu
   2. Active navigation highlighting
   3. Scroll-to-top button
   4. Scroll-reveal animation
   5. Contact form validation
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Mobile hamburger menu ---------- */
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      var isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    /* Close menu automatically once a link is tapped (mobile UX) */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. Active navigation highlighting ---------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- 3. Scroll-to-top button ---------- */
  var scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 420) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 4. Scroll-reveal animation ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- 5. Contact form validation ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    var validators = {
      'full-name': function (value) {
        return value.trim().length >= 2 ? '' : 'Please enter your full name.';
      },
      'email': function (value) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value.trim()) ? '' : 'Please enter a valid email address.';
      },
      'phone': function (value) {
        var pattern = /^[0-9+\-\s()]{7,16}$/;
        return pattern.test(value.trim()) ? '' : 'Please enter a valid phone number.';
      },
      'message': function (value) {
        return value.trim().length >= 10 ? '' : 'Message should be at least 10 characters.';
      }
    };

    function validateField(field) {
      var group = field.closest('.form-group');
      var errorMsg = validators[field.id] ? validators[field.id](field.value) : '';
      var errorEl = group.querySelector('.error-msg');

      if (errorMsg) {
        group.classList.add('invalid');
        if (errorEl) errorEl.textContent = errorMsg;
        return false;
      } else {
        group.classList.remove('invalid');
        return true;
      }
    }

    /* Validate on blur for responsive feedback */
    Object.keys(validators).forEach(function (id) {
      var field = document.getElementById(id);
      if (field) {
        field.addEventListener('blur', function () { validateField(field); });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      Object.keys(validators).forEach(function (id) {
        var field = document.getElementById(id);
        if (field && !validateField(field)) {
          isValid = false;
        }
      });

      if (isValid) {
        status.textContent = 'Thanks for reaching out — our team will get back to you within one business day.';
        status.classList.add('show');
        form.reset();
      } else {
        status.classList.remove('show');
        var firstInvalid = form.querySelector('.form-group.invalid input, .form-group.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

});

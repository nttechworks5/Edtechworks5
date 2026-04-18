/* =============================================
   FREAMS EdTech — script.js
   Features:
   - Smooth scrolling for anchor links
   - Hamburger nav toggle
   - Active nav link highlighting
   - Card 3D tilt on mouse move (desktop only)
   - Intersection Observer fade-in on scroll
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Hamburger Menu Toggle ---- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animate hamburger bars
      hamburger.classList.toggle('active');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---- 2. Active Nav Link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
    // Home page edge-case
    if ((currentPage === '' || currentPage === 'index.html') && href === 'index.html') {
      link.classList.add('active');
    }
  });

  /* ---- 3. Smooth Scroll for anchor # links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- 4. Scroll Fade-In Animation ---- */
  const fadeEls = document.querySelectorAll('.card, .section-title, .section-sub, .gallery-item, .process-row');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  }

  // Add .visible styles dynamically
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  /* ---- 5. Card 3D Tilt on Mouse (desktop only) ---- */
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice()) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `
          translateY(-10px)
          rotateX(${-y * 12}deg)
          rotateY(${x * 12}deg)
        `;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---- 6. Nav Shrink on Scroll ---- */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.height = '58px';
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,.35)';
      } else {
        nav.style.height = '68px';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,.25)';
      }
    }, { passive: true });
  }

});

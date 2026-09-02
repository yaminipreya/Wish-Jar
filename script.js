// My Little Jar — landing page interactions

document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.classList.toggle('is-active', isOpen);
    });

    // Close mobile menu after choosing a link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('is-active');
      });
    });
  }

  // Highlight the current section in the nav while scrolling
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const setActiveLink = () => {
    let currentId = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const targetId = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', targetId === currentId);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // "Create my jar" buttons — placeholder action, wire up to real flow later
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById('how-it-works');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Little wiggle on the hero tag when a visitor hovers the jar
  const jarWrap = document.querySelector('.hero-jar-wrap');
  const jarTag = document.getElementById('jarTag');
  if (jarWrap && jarTag) {
    jarWrap.addEventListener('mouseenter', () => {
      jarTag.style.transform = 'rotate(2deg) translateY(-3px)';
    });
    jarWrap.addEventListener('mouseleave', () => {
      jarTag.style.transform = '';
    });
  }
});

/* ============================================
   SHARP PROPERTIES — NAVIGATION
   ============================================ */

const Navigation = {
  header: null,
  hamburger: null,
  mobileNav: null,
  navLinks: [],

  init() {
    this.header = document.querySelector('.header');
    this.hamburger = document.querySelector('.hamburger');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.navLinks = document.querySelectorAll('.nav-link');

    if (this.header) this.initScroll();
    if (this.hamburger) this.initMobileMenu();
    this.setActiveLink();
    this.closeOnResize();
  },

  initScroll() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            this.header.classList.add('scrolled');
          } else {
            this.header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    if (window.scrollY > 50) {
      this.header.classList.add('scrolled');
    }
  },

  initMobileMenu() {
    this.hamburger.addEventListener('click', () => this.toggleMenu());

    document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    document.querySelectorAll('.mobile-nav .btn').forEach(btn => {
      btn.addEventListener('click', () => this.closeMenu());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileNav.classList.contains('active')) {
        this.closeMenu();
      }
    });
  },

  toggleMenu() {
    const isOpen = this.mobileNav.classList.contains('active');
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  },

  openMenu() {
    this.hamburger.classList.add('active');
    this.mobileNav.classList.add('active');
    document.body.classList.add('menu-open');
  },

  closeMenu() {
    this.hamburger.classList.remove('active');
    this.mobileNav.classList.remove('active');
    document.body.classList.remove('menu-open');
  },

  closeOnResize() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        this.closeMenu();
      }
    });
  },

  setActiveLink() {
    const currentPath = window.location.pathname;
    const page = currentPath.split('/').pop() || 'index.html';

    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '/' && (page === '' || page === 'index.html' || page === '/')) {
        link.classList.add('active');
      } else if (href === page || href === '/' + page) {
        link.classList.add('active');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Navigation.init());

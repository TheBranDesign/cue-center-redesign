/* ─────────────────────────────────────────────────────────
   CUE CENTER – Enhanced Script
   Hero slider · Scroll reveals · Search overlay · Modals
   ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // ── 1. HERO SLIDER ──────────────────────────────────────
  const slides       = Array.from(document.querySelectorAll('.hero-slide'));
  const dots         = Array.from(document.querySelectorAll('.slider-dots .dot'));
  const prevBtn      = document.getElementById('hero-prev');
  const nextBtn      = document.getElementById('hero-next');
  const sliderEl     = document.getElementById('hero-slider');
  const progressFill = document.getElementById('hero-progress');
  const AUTOPLAY_MS  = 6500;
  let activeIndex    = 0;
  let autoTimer      = null;
  let startX         = 0;

  function showSlide(index) {
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === activeIndex));
    dots.forEach((d, i)   => d.classList.toggle('is-active', i === activeIndex));
    if (progressFill) {
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progressFill.style.transition = `width ${AUTOPLAY_MS}ms linear`;
          progressFill.style.width = '100%';
        });
      });
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(() => showSlide(activeIndex + 1), AUTOPLAY_MS);
    showSlide(activeIndex); // restart progress bar
  }

  function stopAutoPlay() {
    clearInterval(autoTimer);
    autoTimer = null;
    if (progressFill) { progressFill.style.transition = 'none'; progressFill.style.width = '0%'; }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(activeIndex - 1); startAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(activeIndex + 1); startAutoPlay(); });
  dots.forEach(dot => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.target || 0)); startAutoPlay(); }));

  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAutoPlay);
    sliderEl.addEventListener('mouseleave', startAutoPlay);
    // Touch swipe
    sliderEl.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    sliderEl.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { showSlide(dx < 0 ? activeIndex + 1 : activeIndex - 1); startAutoPlay(); }
    }, { passive: true });
    startAutoPlay();
  }

  // Keyboard slider navigation
  document.addEventListener('keydown', e => {
    if (document.activeElement.closest('.hero-slider')) {
      if (e.key === 'ArrowRight') { showSlide(activeIndex + 1); startAutoPlay(); }
      if (e.key === 'ArrowLeft')  { showSlide(activeIndex - 1); startAutoPlay(); }
    }
  });

  // ── 2. STICKY HEADER SCROLL SHADOW ──────────────────────
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── 3. SEARCH OVERLAY ───────────────────────────────────
  const searchOpenBtn  = document.getElementById('search-open-btn');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchOverlay  = document.getElementById('search-overlay');
  const searchInput    = document.getElementById('header-search-input');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.removeAttribute('hidden');
    if (searchInput) { searchInput.focus(); }
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.setAttribute('hidden', '');
  }

  if (searchOpenBtn) searchOpenBtn.addEventListener('click', openSearch);
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

  // ── 4. MOBILE DRAWER ─────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileDrawer   = document.getElementById('mobile-drawer');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.removeAttribute('hidden');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.setAttribute('hidden', '');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', e => { if (e.target === mobileDrawer) closeDrawer(); });
  }

  // ── 5. FLOATING CONTACT MODAL ───────────────────────────
  const contactFab      = document.getElementById('contact-fab');
  const contactModal    = document.getElementById('contact-modal');
  const contactCloseBtn = document.getElementById('contact-close-btn');
  const contactForm     = document.getElementById('contact-modal-form');

  function toggleModal() {
    if (!contactModal) return;
    if (contactModal.hasAttribute('hidden')) {
      contactModal.removeAttribute('hidden');
    } else {
      contactModal.setAttribute('hidden', '');
    }
  }

  if (contactFab) contactFab.addEventListener('click', toggleModal);
  if (contactCloseBtn) contactCloseBtn.addEventListener('click', () => contactModal && contactModal.setAttribute('hidden', ''));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && contactModal && !contactModal.hasAttribute('hidden')) {
      contactModal.setAttribute('hidden', '');
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('contact-name')?.value.trim() || '';
      const email   = document.getElementById('contact-email')?.value.trim() || '';
      const message = document.getElementById('contact-message')?.value.trim() || '';
      const subject = encodeURIComponent(`CUE Center Inquiry from ${name}`);
      const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:cuecenter@aol.com?subject=${subject}&body=${body}`;
    });
  }

  // ── 6. INTERSECTION OBSERVER – SCROLL REVEALS ───────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    // Stagger delay for sequential children
    document.querySelectorAll('.program-sectors-grid, .case-sectors-grid, .action-strip-grid, .sponsors-grid').forEach(grid => {
      Array.from(grid.querySelectorAll('.reveal-stagger')).forEach((el, i) => {
        el.style.setProperty('--stagger-delay', `${i * 0.07}s`);
      });
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-stagger').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Immediately show everything for reduced-motion users
    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-stagger').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // ── 7. MICRO-INTERACTION: Sponsor tile parallax tilt ───
  document.querySelectorAll('.sponsor-tile').forEach(tile => {
    tile.addEventListener('mousemove', e => {
      if (prefersReducedMotion) return;
      const rect = tile.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
      tile.style.transform = `translateY(-3px) perspective(400px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    tile.addEventListener('mouseleave', () => {
      tile.style.transform = '';
    });
  });

});

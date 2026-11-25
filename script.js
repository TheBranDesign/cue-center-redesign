document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Slider
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.slider-dots .dot'));
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  const sliderEl = document.getElementById('hero-slider');
  let activeIndex = 0;
  let autoTimer = null;

  function showSlide(index) {
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === activeIndex));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === activeIndex));
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(() => showSlide(activeIndex + 1), 6500);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(activeIndex - 1); startAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(activeIndex + 1); startAutoPlay(); });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = Number(dot.dataset.target || 0);
      showSlide(target);
      startAutoPlay();
    });
  });

  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAutoPlay);
    sliderEl.addEventListener('mouseleave', startAutoPlay);
    startAutoPlay();
  }

  // 2. Header Search Overlay
  const searchOpenBtn = document.getElementById('search-open-btn');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('header-search-input');

  if (searchOpenBtn && searchOverlay) {
    searchOpenBtn.addEventListener('click', () => {
      const isHidden = searchOverlay.hasAttribute('hidden');
      if (isHidden) {
        searchOverlay.removeAttribute('hidden');
        if (searchInput) searchInput.focus();
      } else {
        searchOverlay.setAttribute('hidden', '');
      }
    });
  }

  if (searchCloseBtn && searchOverlay) {
    searchCloseBtn.addEventListener('click', () => {
      searchOverlay.setAttribute('hidden', '');
    });
  }

  // 3. Mobile Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.removeAttribute('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    });
  }

  if (mobileCloseBtn && mobileDrawer) {
    mobileCloseBtn.addEventListener('click', () => {
      mobileDrawer.setAttribute('hidden', '');
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // 4. Floating Contact Modal
  const contactFab = document.getElementById('contact-fab');
  const contactModal = document.getElementById('contact-modal');
  const contactCloseBtn = document.getElementById('contact-close-btn');
  const contactForm = document.getElementById('contact-modal-form');

  if (contactFab && contactModal) {
    contactFab.addEventListener('click', () => {
      const isHidden = contactModal.hasAttribute('hidden');
      if (isHidden) {
        contactModal.removeAttribute('hidden');
      } else {
        contactModal.setAttribute('hidden', '');
      }
    });
  }

  if (contactCloseBtn && contactModal) {
    contactCloseBtn.addEventListener('click', () => {
      contactModal.setAttribute('hidden', '');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      const subject = encodeURIComponent(`CUE Center Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:cuecenter@aol.com?subject=${subject}&body=${body}`;
    });
  }
});

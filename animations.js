
    /* ===== HAMBURGER ===== */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
 
    /* ===== VIDEO CARDS hover ===== */
    document.querySelectorAll('.proyecto-card').forEach(card => {
      const video = card.querySelector('video');
      card.addEventListener('mouseenter', () => {
        if (video) video.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => {
        if (video) { video.pause(); video.currentTime = 0; }
      });
    });
 
    /* ===== VIDEO MODAL ===== */
    const modalOverlay = document.getElementById('modalOverlay');
    const modalVideo   = document.getElementById('modalVideo');
    const modalClose   = document.getElementById('modalClose');
 
    document.querySelectorAll('.proyecto-card').forEach(card => {
      card.addEventListener('click', () => {
        const src = card.dataset.src;
        modalVideo.src = src;
        modalVideo.load();
        modalVideo.play().catch(() => {});
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
 
    function closeModal() {
      modalOverlay.classList.remove('open');
      modalVideo.pause();
      modalVideo.src = '';
      document.body.style.overflow = '';
    }
 
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
 
    /* ===== SCROLL ANIMATIONS ===== */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(() => el.classList.add('visible'), Number(delay));
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
 
    document.querySelectorAll('.proyecto-card, .servicio-card').forEach((el, i) => {
      el.dataset.delay = i * 120;
      observer.observe(el);
    });
 
    /* ===== NAV scroll color ===== */
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      nav.style.background = window.scrollY > 60
        ? 'rgba(7,13,26,0.95)'
        : 'rgba(7,13,26,0.75)';
    });
 
    /* ===== PAGE FADE IN ===== */
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity .5s ease';
      document.body.style.opacity = '1';
    });

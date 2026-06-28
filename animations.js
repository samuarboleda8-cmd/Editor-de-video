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
      if (!video) return;
 
      video.addEventListener('loadedmetadata', () => {
        video.currentTime = 1;
      }, { once: true });
 
      card.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 1;
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
 
    /* ===== NAV scroll ===== */
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      const scrolled = window.scrollY;
 
      nav.style.background = scrolled > 40
        ? 'rgba(8,15,32,0.80)'
        : 'rgba(12,20,40,0.55)';
 
      const heroContent = document.getElementById('heroContent');
      const heroSection = document.getElementById('inicio');
      const heroH = heroSection.offsetHeight;
      const fadeStart = heroH * 0.55;
      const fadeEnd = heroH * 0.95;
      let progress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
      progress = Math.max(0, Math.min(progress, 1));
      if (heroContent) {
        heroContent.style.opacity = 1 - progress;
        heroContent.style.transform = `translateY(${progress * 30}px)`;
      }
    });
 
    /* ===== PAGE FADE IN ===== */
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
      document.body.style.transition = 'opacity 0.6s ease';
      document.body.style.opacity = '1';
    });

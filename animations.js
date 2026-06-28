 /* ===== HAMBURGER ===== */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
 
    function toggleMobileMenu(e) {
      if (e) e.preventDefault();
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    }
 
    hamburger.addEventListener('click', toggleMobileMenu);
    hamburger.addEventListener('touchend', toggleMobileMenu);
 
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
 
      // Seek to 1s to get a visible thumbnail frame
      video.preload = 'metadata';
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
        modalVideo.muted = true; // permite autoplay en todos los navegadores
        modalVideo.src = encodeURI(src);
        modalVideo.load();
 
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
 
        modalVideo.play().then(() => {
          // si reprodujo bien, se puede quitar el mute
          modalVideo.muted = false;
        }).catch(err => {
          console.log('Autoplay bloqueado, esperando interacción:', err);
        });
      });
    });
 
    // Si el video falla en cargar, avisar en consola y cerrar el loader visual
    modalVideo.addEventListener('error', () => {
      console.error('No se pudo cargar el video:', modalVideo.src);
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
    const revealEls = document.querySelectorAll('.proyecto-card, .servicio-card');
 
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(() => el.classList.add('visible'), Number(delay));
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });
 
    revealEls.forEach((el, i) => {
      el.dataset.delay = i * 120;
      observer.observe(el);
    });
 
    // Fallback: si por algún motivo el observer no dispara (algunos navegadores móviles
    // antiguos o webviews), forzamos visibilidad tras 2.5s para que nunca quede oculto.
    setTimeout(() => {
      revealEls.forEach(el => el.classList.add('visible'));
    }, 2500);
 
    /* ===== NAV scroll ===== */
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      const scrolled = window.scrollY;
 
      // glass intensity increases on scroll
      nav.style.background = scrolled > 40
        ? 'rgba(8,15,32,0.80)'
        : 'rgba(12,20,40,0.55)';
 
      // Hero content fades out as user scrolls down, but only near the end of the section
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
    document.body.style.transition = 'opacity .5s ease';
    function revealPage() { document.body.style.opacity = '1'; }
    // No esperamos al evento 'load' completo, porque videos que tardan o
    // fallan en cargar pueden bloquearlo y dejar la página invisible para siempre.
    document.addEventListener('DOMContentLoaded', () => setTimeout(revealPage, 50));
    setTimeout(revealPage, 1000); // seguridad extra

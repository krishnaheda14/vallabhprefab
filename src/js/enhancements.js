// ===================================
// ANIMATION ENHANCEMENTS
// Clean scroll-triggered animations
// ===================================

(function() {
  'use strict';

  // Reveal elements on scroll
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(el => observer.observe(el));
  }

  // Lazy load images with fade-in
  function enhanceLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.addEventListener('load', () => {
              img.classList.add('loaded');
              img.classList.remove('lazy');
            });
          }
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px'
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Animate numbers (counter effect)
  function animateCounters() {
    const stats = document.querySelectorAll('.stat strong');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          stats.forEach((stat, i) => {
            setTimeout(() => {
              stat.style.animationDelay = i * 0.2 + 's';
            }, i * 100);
          });
        }
      });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.intro-stats');
    if (statsSection) observer.observe(statsSection);
  }

  // Smooth parallax effect on hero
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          if (scrolled < 800) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / 1000);
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Add magnetic effect to buttons - DISABLED TO PREVENT CONFLICTS
  function magneticButtons() {
    // DISABLED - Conflicts with other animation systems
    // This function is intentionally disabled
    return;
  }

  // Initialize everything when DOM is ready
  function init() {
    // Small delay to ensure all components are loaded
    setTimeout(() => {
      initScrollReveal();
      enhanceLazyLoading();
      animateCounters();
      initParallax();
  magneticButtons();
      
  // Animations initialized (debug log removed)
    }, 100);
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

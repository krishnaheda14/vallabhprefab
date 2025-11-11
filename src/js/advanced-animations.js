// ===================================
// NEXT-LEVEL JAVASCRIPT ANIMATIONS
// Smooth, performant, badass interactions
// ===================================

(function() {
  'use strict';

  // ==================== 
  // SMOOTH SCROLL REVEAL
  // ==================== 
  function initAdvancedReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Add stagger effect for children
          const children = entry.target.querySelectorAll('.product-card, .solution-card, .stat');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    reveals.forEach(el => observer.observe(el));
  }

  // ==================== 
  // PARALLAX SCROLL EFFECTS
  // ==================== 
  function initParallax() {
    const hero = document.querySelector('.hero');
    const interiors = document.querySelectorAll('.interior');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          
          // Hero parallax
          if (hero && scrolled < 800) {
            hero.style.transform = `translateY(${scrolled * 0.4}px)`;
            hero.style.opacity = Math.max(0, 1 - (scrolled / 600));
          }
          
          // Interior images parallax
          interiors.forEach((interior, index) => {
            const rect = interior.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const offset = (window.innerHeight - rect.top) * 0.1;
              interior.style.transform = `translateY(${offset}px) scale(1)`;
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ==================== 
  // MAGNETIC CURSOR EFFECT ON BUTTONS
  // ==================== 
  function initMagneticButtons() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const buttons = document.querySelectorAll('.btn, .carousel-nav');
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = button.classList.contains('carousel-nav')
          ? `translateY(-50%) translate(${x * 0.2}px, ${y * 0.2}px)`
          : `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-4px)`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  }

  // ==================== 
  // 3D CARD TILT EFFECT
  // ==================== 
  function init3DCardTilt() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cards = document.querySelectorAll('.solution-card, .mission-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==================== 
  // SMOOTH NUMBER COUNTER
  // ==================== 
  function initCounters() {
    const stats = document.querySelectorAll('.stat strong, .stat-value');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          
          stats.forEach(stat => {
            const text = stat.textContent;
            const match = text.match(/[\d,]+/);
            
            if (match) {
              const endValue = parseInt(match[0].replace(/,/g, ''));
              const suffix = text.replace(match[0], '').trim();
              const duration = 2000;
              const steps = 60;
              const stepValue = endValue / steps;
              let currentValue = 0;
              let step = 0;
              
              const counter = setInterval(() => {
                currentValue += stepValue;
                step++;
                
                if (step >= steps) {
                  clearInterval(counter);
                  stat.textContent = match[0] + suffix;
                } else {
                  const displayValue = Math.floor(currentValue);
                  const formatted = match[0].includes(',')
                    ? displayValue.toLocaleString()
                    : displayValue.toString();
                  stat.textContent = formatted + suffix;
                }
              }, duration / steps);
            }
          });
        }
      });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.intro-stats, .stats-showcase');
    if (statsSection) observer.observe(statsSection);
  }

  // ==================== 
  // NAVBAR SCROLL EFFECT
  // ==================== 
  function initNavbarScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Hide/show navbar on scroll
      if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }

  // ==================== 
  // SMOOTH LAZY LOADING WITH FADE
  // ==================== 
  function initSmoothLazyLoad() {
    const lazyImages = document.querySelectorAll('img.lazy, img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src || img.getAttribute('data-src');
          
          if (src) {
            // Create a temporary image to preload
            const tempImg = new Image();
            tempImg.onload = () => {
              img.src = src;
              img.classList.add('loaded');
              img.classList.remove('lazy');
              
              // Fade in animation
              img.style.opacity = '0';
              img.style.transition = 'opacity 0.6s ease';
              setTimeout(() => {
                img.style.opacity = '1';
              }, 10);
            };
            tempImg.src = src;
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px'
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ==================== 
  // CURSOR TRAIL EFFECT (Desktop only)
  // ==================== 
  function initCursorTrail() {
    if (window.innerWidth < 1024) return; // Desktop only
    
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');
    
    // Create cursor circles if they don't exist
    if (circles.length === 0) {
      for (let i = 0; i < 5; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        circle.style.cssText = `
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(10, 95, 122, 0.3), transparent);
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.2s ease;
        `;
        document.body.appendChild(circle);
      }
    }
    
    window.addEventListener('mousemove', (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });
    
    function animateCircles() {
      const circles = document.querySelectorAll('.cursor-circle');
      let x = coords.x;
      let y = coords.y;
      
      circles.forEach((circle, index) => {
        circle.style.left = x - 10 + 'px';
        circle.style.top = y - 10 + 'px';
        circle.style.scale = (circles.length - index) / circles.length;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.offsetLeft - x) * 0.3;
        y += (nextCircle.offsetTop - y) * 0.3;
      });
      
      requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
  }

  // ==================== 
  // PRODUCT CAROUSEL TOUCH SWIPE
  // ==================== 
  function initTouchSwipe() {
    const carousel = document.querySelector('.products-carousel');
    if (!carousel) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next
          document.querySelector('.carousel-nav.next')?.click();
        } else {
          // Swipe right - prev
          document.querySelector('.carousel-nav.prev')?.click();
        }
      }
    }
  }

  // ==================== 
  // INITIALIZE EVERYTHING
  // ==================== 
  function init() {
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
      initAdvancedReveal();
      initParallax();
      initMagneticButtons();
      init3DCardTilt();
      initCounters();
      initNavbarScroll();
      initSmoothLazyLoad();
      initTouchSwipe();
      
      // Only on desktop
      if (window.innerWidth >= 1024) {
        // initCursorTrail(); // Optional - can be overwhelming
      }
      
      // Advanced animations initialized (debug log removed)
    }, 100);
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reinit some effects on resize
      initMagneticButtons();
      init3DCardTilt();
    }, 250);
  });

})();

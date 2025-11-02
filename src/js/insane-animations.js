// ===================================
// INSANE ANIMATIONS - NEXT LEVEL SHIT
// The most badass website animations
// ===================================

(function() {
  'use strict';

  // ==========================================
  // 1. PARTICLE BACKGROUND SYSTEM
  // ==========================================
  class ParticleSystem {
    constructor() {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'particle-canvas';
      this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.6';
      document.body.prepend(this.canvas);
      
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.mouseX = 0;
      this.mouseY = 0;
      
      this.resize();
      this.createParticles();
      this.animate();
      
      window.addEventListener('resize', () => this.resize());
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      });
    }
    
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
      const count = Math.min(150, Math.floor((this.canvas.width * this.canvas.height) / 15000));
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.3
        });
      }
    }
    
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Mouse interaction
        const dx = this.mouseX - p.x;
        const dy = this.mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x -= dx * force * 0.03;
          p.y -= dy * force * 0.03;
        }
        
        // Boundaries
        if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
        
        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(10, 95, 122, ${p.alpha})`;
        this.ctx.fill();
        
        // Connect nearby particles
        this.particles.slice(i + 1).forEach(p2 => {
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist2 < 120) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(10, 95, 122, ${0.2 * (1 - dist2 / 120)})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(() => this.animate());
    }
  }

  // ==========================================
  // 2. 3D TILT EFFECT ON CARDS
  // ==========================================
  function init3DTilt() {
    const cards = document.querySelectorAll('.product-card, .solution-card, .stat, .mission-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('active') && card.classList.contains('product-card')) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==========================================
  // 3. SMOOTH SCROLL WITH MOMENTUM
  // ==========================================
  class SmoothScroll {
    constructor() {
      this.currentScroll = 0;
      this.targetScroll = 0;
      this.ease = 0.08;
      
      this.update();
    }
    
    update() {
      this.currentScroll += (this.targetScroll - this.currentScroll) * this.ease;
      
      if (Math.abs(this.targetScroll - this.currentScroll) > 0.5) {
        window.scrollTo(0, this.currentScroll);
        requestAnimationFrame(() => this.update());
      }
    }
  }

  // ==========================================
  // 4. MAGNETIC BUTTONS
  // ==========================================
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .carousel-nav');
    
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ==========================================
  // 5. TEXT REVEAL ANIMATION
  // ==========================================
  function initTextReveal() {
    const titles = document.querySelectorAll('h1, h2, .hero-title');
    
    titles.forEach(title => {
      const text = title.textContent;
      title.innerHTML = '';
      
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.cssText = `
          display: inline-block;
          opacity: 0;
          transform: translateY(20px) rotateX(-90deg);
          animation: revealChar 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: ${i * 0.03}s;
        `;
        title.appendChild(span);
      });
    });
    
    // Add keyframe animation
    if (!document.getElementById('reveal-char-animation')) {
      const style = document.createElement('style');
      style.id = 'reveal-char-animation';
      style.textContent = `
        @keyframes revealChar {
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ==========================================
  // 6. PARALLAX SCROLL EFFECTS
  // ==========================================
  function initParallax() {
    const elements = document.querySelectorAll('.hero, .interior, .stat, .product-card');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      elements.forEach((el, i) => {
        if (el.classList.contains('hero')) {
          el.style.transform = `translateY(${scrolled * 0.5}px)`;
        } else {
          const rect = el.getBoundingClientRect();
          const speed = 0.05 * (i % 3 + 1);
          
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * speed;
            el.style.transform = `translateY(${-offset}px)`;
          }
        }
      });
    });
  }

  // ==========================================
  // 7. GLITCH EFFECT ON HOVER
  // ==========================================
  function initGlitchEffect() {
    const titles = document.querySelectorAll('.hero-title, .products-preview h2');
    
    titles.forEach(title => {
      const originalText = title.textContent;
      
      title.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
          title.textContent = originalText
            .split('')
            .map((char, i) => {
              if (i < iterations) return originalText[i];
              return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            })
            .join('');
          
          iterations += 1/3;
          
          if (iterations >= originalText.length) {
            clearInterval(interval);
            title.textContent = originalText;
          }
        }, 30);
      });
    });
  }

  // ==========================================
  // 8. CURSOR TRAIL EFFECT
  // ==========================================
  class CursorTrail {
    constructor() {
      this.cursor = document.createElement('div');
      this.cursor.className = 'custom-cursor';
      this.cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #0a5f7a;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease-out;
        mix-blend-mode: difference;
      `;
      document.body.appendChild(this.cursor);
      
      this.follower = document.createElement('div');
      this.follower.className = 'cursor-follower';
      this.follower.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #0a5f7a;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.3s ease-out;
      `;
      document.body.appendChild(this.follower);
      
      document.addEventListener('mousemove', (e) => {
        this.cursor.style.left = e.clientX - 10 + 'px';
        this.cursor.style.top = e.clientY - 10 + 'px';
        
        setTimeout(() => {
          this.follower.style.left = e.clientX - 4 + 'px';
          this.follower.style.top = e.clientY - 4 + 'px';
        }, 50);
      });
      
      // Scale on hover
      const interactiveElements = document.querySelectorAll('a, button, .btn, .carousel-nav');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.cursor.style.transform = 'scale(1.5)';
          this.follower.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
          this.cursor.style.transform = 'scale(1)';
          this.follower.style.transform = 'scale(1)';
        });
      });
    }
  }

  // ==========================================
  // 9. NUMBER COUNTER ANIMATION
  // ==========================================
  function initCounters() {
    const counters = document.querySelectorAll('.stat strong');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const text = target.textContent;
          const number = parseInt(text.replace(/[^0-9.]/g, ''));
          
          if (number) {
            animateNumber(target, 0, number, 2000, text);
          }
          
          observer.unobserve(target);
        }
      });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
  }
  
  function animateNumber(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const suffix = originalText.replace(/[0-9.]/g, '');
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * easeOutExpo);
      
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = originalText;
      }
    }
    
    requestAnimationFrame(update);
  }

  // ==========================================
  // 10. SCROLL-TRIGGERED ANIMATIONS
  // ==========================================
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.reveal, .stat, .reason-grid li, .solution-card');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'slideUpBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    elements.forEach(el => observer.observe(el));
    
    // Add animation
    if (!document.getElementById('slide-up-bounce')) {
      const style = document.createElement('style');
      style.id = 'slide-up-bounce';
      style.textContent = `
        @keyframes slideUpBounce {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          60% {
            transform: translateY(-10px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ==========================================
  // 11. RIPPLE EFFECT ON CLICK
  // ==========================================
  function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, button');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    // Add ripple animation
    if (!document.getElementById('ripple-animation')) {
      const style = document.createElement('style');
      style.id = 'ripple-animation';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ==========================================
  // 12. IMAGE ZOOM ON HOVER
  // ==========================================
  function initImageZoom() {
    const images = document.querySelectorAll('.interior img, .carousel-inner img');
    
    images.forEach(img => {
      img.parentElement.style.overflow = 'hidden';
      
      img.addEventListener('mouseenter', () => {
        img.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        img.style.transform = 'scale(1.15) rotate(2deg)';
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotate(0deg)';
      });
    });
  }

  // ==========================================
  // INITIALIZE EVERYTHING
  // ==========================================
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startAnimations);
    } else {
      startAnimations();
    }
  }
  
  function startAnimations() {
    console.log('🚀 Initializing INSANE animations...');
    
    // Only on desktop for heavy effects
    const isDesktop = window.innerWidth > 768;
    
    try {
      if (isDesktop) {
        new ParticleSystem();
        new CursorTrail();
      }
      
      init3DTilt();
      initMagneticButtons();
      initTextReveal();
      initParallax();
      initGlitchEffect();
      initCounters();
      initScrollAnimations();
      initRippleEffect();
      initImageZoom();
      
      console.log('✨ INSANE animations loaded successfully!');
    } catch (error) {
      console.warn('Animation error (non-critical):', error);
    }
  }
  
  // Start the magic
  init();
  
})();

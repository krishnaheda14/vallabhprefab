/* =============================================
   BADASS HERO SLIDESHOW
   Cinematic slideshow with smooth transitions
   ============================================= */

(function() {
  'use strict';
  
  class HeroSlideshow {
    constructor() {
      this.slides = document.querySelectorAll('.hero-slide');
      this.dots = document.querySelectorAll('.hero-slide-dot');
      this.currentIndex = 0;
      this.isTransitioning = false;
      this.autoAdvanceInterval = null;
      this.autoAdvanceDelay = 6000; // 6 seconds per slide
      
      if (this.slides.length === 0) return;
      
      this.init();
    }
    
    init() {
      // Set first slide as active
      this.slides[0].classList.add('active');
      if (this.dots.length > 0) {
        this.dots[0].classList.add('active');
      }
      
      // Setup dot click handlers
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });
      
      // Start auto-advance
      this.startAutoAdvance();
      
      // Pause on hover
      const heroElement = document.querySelector('.hero');
      if (heroElement) {
        heroElement.addEventListener('mouseenter', () => this.stopAutoAdvance());
        heroElement.addEventListener('mouseleave', () => this.startAutoAdvance());
      }
      
      // Handle visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stopAutoAdvance();
        } else {
          this.startAutoAdvance();
        }
      });
    }
    
    goToSlide(index) {
      if (this.isTransitioning || index === this.currentIndex) return;
      
      this.isTransitioning = true;
      
      // Remove active class from current
      this.slides[this.currentIndex].classList.remove('active');
      if (this.dots.length > 0) {
        this.dots[this.currentIndex].classList.remove('active');
      }
      
      // Add active class to new
      this.currentIndex = index;
      this.slides[this.currentIndex].classList.add('active');
      if (this.dots.length > 0) {
        this.dots[this.currentIndex].classList.add('active');
      }
      
      // Reset transitioning flag after animation
      setTimeout(() => {
        this.isTransitioning = false;
      }, 1500);
    }
    
    nextSlide() {
      const nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.goToSlide(nextIndex);
    }
    
    prevSlide() {
      const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prevIndex);
    }
    
    startAutoAdvance() {
      this.stopAutoAdvance();
      this.autoAdvanceInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoAdvanceDelay);
    }
    
    stopAutoAdvance() {
      if (this.autoAdvanceInterval) {
        clearInterval(this.autoAdvanceInterval);
        this.autoAdvanceInterval = null;
      }
    }
  }
  
  /* =============================================
     PARTICLE CANVAS BACKGROUND
     Subtle animated background particles
     ============================================= */
  
  class ParticleCanvas {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.particleCount = 80;
      this.mouse = { x: null, y: null, radius: 150 };
      this.animationFrame = null;
      this.isDesktop = window.innerWidth > 768;
      
      if (this.isDesktop) {
        this.init();
      }
      
      // Handle resize
      window.addEventListener('resize', () => {
        const wasDesktop = this.isDesktop;
        this.isDesktop = window.innerWidth > 768;
        
        if (!wasDesktop && this.isDesktop) {
          this.init();
        } else if (wasDesktop && !this.isDesktop) {
          this.destroy();
        } else if (this.isDesktop) {
          this.handleResize();
        }
      });
    }
    
    init() {
      // Create canvas
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'particle-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.zIndex = '-1';
      this.canvas.style.pointerEvents = 'none';
      
      document.body.prepend(this.canvas);
      
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      this.createParticles();
      this.animate();
      
      // Mouse interaction
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      });
      
      window.addEventListener('mouseout', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
    
    destroy() {
      if (this.canvas) {
        this.canvas.remove();
        this.canvas = null;
        this.ctx = null;
      }
      
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
      
      this.particles = [];
    }
    
    handleResize() {
      this.resizeCanvas();
      this.particles = [];
      this.createParticles();
    }
    
    resizeCanvas() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          originalRadius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }
    
    updateParticles() {
      this.particles.forEach(particle => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > this.canvas.width) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > this.canvas.height) {
          particle.vy *= -1;
        }
        
        // Mouse interaction
        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = this.mouse.x - particle.x;
          const dy = this.mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.mouse.radius) {
            const force = (this.mouse.radius - distance) / this.mouse.radius;
            particle.vx -= (dx / distance) * force * 0.5;
            particle.vy -= (dy / distance) * force * 0.5;
            particle.radius = particle.originalRadius * (1 + force * 0.5);
          } else {
            particle.radius = particle.originalRadius;
          }
        } else {
          particle.radius = particle.originalRadius;
        }
      });
    }
    
    drawParticles() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach(particle => {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 193, 7, ${particle.opacity})`;
        this.ctx.fill();
      });
    }
    
    animate() {
      this.updateParticles();
      this.drawParticles();
      this.animationFrame = requestAnimationFrame(() => this.animate());
    }
  }
  
  /* =============================================
     ANIMATED COUNTER
     Count up numbers in stats bar
     ============================================= */
  
  function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    const duration = 2000; // 2 seconds
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          const target = entry.target;
          const text = target.textContent;
          const number = parseInt(text.replace(/[^0-9]/g, ''));
          const suffix = text.replace(/[0-9]/g, '');
          
          let current = 0;
          const increment = number / (duration / 16);
          const startTime = Date.now();
          
          const counter = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuad = progress * (2 - progress);
            current = Math.floor(number * easeOutQuad);
            
            target.textContent = current + suffix;
            
            if (progress >= 1) {
              clearInterval(counter);
              target.textContent = number + suffix;
            }
          }, 16);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  }
  
  /* =============================================
     INITIALIZATION
     ============================================= */
  
  function init() {
    // Initialize hero slideshow
    new HeroSlideshow();
    
    // Initialize particle canvas
    new ParticleCanvas();
    
    // Animate counters
    animateCounters();
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();

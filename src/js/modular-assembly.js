// MODULAR ASSEMBLY ANIMATIONS - DISABLED
// Using simple CSS animations instead

function initModularAssembly() {
  console.log('🏗️ Modular Assembly: Disabled (using CSS animations instead)');
  
  // Only add construction progress bar
  addConstructionProgress();
  
  console.log('✅ Simple animations active');
}

// HERO SECTION - Modular Text Drop Animation
function initHeroModularDrop() {
  const heroTitle = document.querySelector('.hero-title-massive');
  if (!heroTitle) return;

  const spans = heroTitle.querySelectorAll('span');
  const hero = document.querySelector('.hero');
  
  // Create timeline for sequential drops
  const tl = gsap.timeline({
    defaults: {
      ease: 'back.out(1.7)',
      duration: 0.8
    }
  });

  spans.forEach((span, index) => {
    // Each word drops in sequence
    tl.to(span, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      onStart: () => {
        // Create impact effects when text lands
        if (span.classList.contains('highlight')) {
          createImpactRipple(span);
          createWeldingSparks(span);
          triggerScreenShake(hero);
        }
      }
    }, index * 0.15); // Stagger timing
  });

  // Animate subtitle after title
  gsap.from('.hero-subtitle-massive', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power2.out',
    delay: spans.length * 0.15 + 0.3
  });

  // Animate CTAs
  gsap.from('.hero-ctas-massive .btn-massive', {
    opacity: 0,
    scale: 0.8,
    y: 20,
    stagger: 0.2,
    duration: 0.6,
    ease: 'back.out(1.7)',
    delay: spans.length * 0.15 + 0.6
  });
}

// Create impact ripple effect
function createImpactRipple(element) {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const ripple = document.createElement('div');
  ripple.className = 'impact-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.marginLeft = '-150px';
  ripple.style.marginTop = '-150px';
  
  document.body.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 800);
}

// Create welding spark effects
function createWeldingSparks(element) {
  const rect = element.getBoundingClientRect();
  const sparkCount = 8;

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'welding-spark';
    
    const angle = (Math.PI * 2 * i) / sparkCount;
    const distance = 30 + Math.random() * 20;
    const sparkX = Math.cos(angle) * distance;
    const sparkY = Math.sin(angle) * distance;
    
    spark.style.setProperty('--spark-x', `${sparkX}px`);
    spark.style.setProperty('--spark-y', `${sparkY}px`);
    spark.style.left = (rect.left + rect.width / 2) + 'px';
    spark.style.top = (rect.top + rect.height / 2) + 'px';
    
    document.body.appendChild(spark);
    
    setTimeout(() => spark.remove(), 600);
  }
}

// Trigger screen shake effect
function triggerScreenShake(element) {
  if (!element) return;
  element.classList.add('hero-shake');
  setTimeout(() => element.classList.remove('hero-shake'), 300);
}

// SCROLL-TRIGGERED ASSEMBLY EFFECTS
function initScrollAssembly() {
  console.log('📜 Initializing scroll assembly effects...');
  
  const statsElements = gsap.utils.toArray('.stat');
  console.log('Found stats elements:', statsElements.length);
  
  // Intro stats - slide in from sides like panels
  statsElements.forEach((stat, index) => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none reverse'
      },
      x: index % 2 === 0 ? -100 : 100,
      opacity: 0,
      skewX: index % 2 === 0 ? -10 : 10,
      duration: 0.8,
      ease: 'power3.out',
      onStart: () => {
        createSoundWave();
      }
    });
  });

  // Reasons grid - modular assembly
  gsap.utils.toArray('.reasons-grid li').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.5,
      opacity: 0,
      rotation: -5,
      duration: 0.7,
      ease: 'back.out(1.7)',
      delay: index * 0.1,
      onStart: () => {
        if (index % 3 === 0) {
          createWeldingSparks(item);
        }
      }
    });
  });

  // Top interiors - slide assembly
  gsap.utils.toArray('.interior').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: '.top-interiors',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      x: index % 2 === 0 ? -100 : 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1
    });
  });

  // Products preview section title
  gsap.from('.products-preview h2', {
    scrollTrigger: {
      trigger: '.products-preview',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out'
  });

  // Carousel assembly (after it's initialized)
  setTimeout(() => {
    const carousel = document.querySelector('.products-carousel');
    if (carousel) {
      gsap.from(carousel, {
        scrollTrigger: {
          trigger: carousel,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 1,
        ease: 'power2.out'
      });
    }
  }, 1000);

  // Gallery carousel
  gsap.from('.carousel', {
    scrollTrigger: {
      trigger: '.carousel',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out'
  });

  // Inquiry strip - build from center
  gsap.from('.inquiry-strip', {
    scrollTrigger: {
      trigger: '.inquiry-strip',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    scaleX: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    transformOrigin: 'center'
  });
}

// BUTTON BLUEPRINT EFFECTS
function initButtonEffects() {
  const buttons = document.querySelectorAll('.btn-massive, .btn.primary-cta, .btn.primary');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
      createBlueprintScan(e.currentTarget);
    });
  });
}

function createBlueprintScan(button) {
  // Visual feedback already in CSS, could add sound here
  gsap.to(button, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1
  });
}

// SCAN LINE EFFECT FOR CARDS
function initCardScanLines() {
  const cards = document.querySelectorAll('.card, .product-card, .stat');
  
  cards.forEach(card => {
    // Add scan line element if not exists
    if (!card.querySelector('.scan-line')) {
      const scanLine = document.createElement('div');
      scanLine.className = 'scan-line';
      card.appendChild(scanLine);
    }
  });
}

// CONSTRUCTION PROGRESS BAR
function addConstructionProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'construction-progress';
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);

  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// TECHNICAL OVERLAY (shows scroll position, etc.)
function addTechnicalOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'tech-overlay';
  overlay.innerHTML = `
    <div><span>SYS:</span><span>ONLINE</span></div>
    <div><span>SCROLL:</span><span id="tech-scroll">0%</span></div>
    <div><span>VIEWPORT:</span><span id="tech-viewport">---</span></div>
  `;
  document.body.appendChild(overlay);

  // Update values
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.round((window.pageYOffset / windowHeight) * 100);
    document.getElementById('tech-scroll').textContent = scrolled + '%';
  });

  function updateViewport() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    document.getElementById('tech-viewport').textContent = `${vw}x${vh}`;
  }

  updateViewport();
  window.addEventListener('resize', updateViewport);
}

// Create sound wave visual effect
function createSoundWave() {
  const wave = document.createElement('div');
  wave.className = 'sound-wave';
  document.body.appendChild(wave);
  setTimeout(() => wave.remove(), 1000);
}

// PARALLAX BLUEPRINT BACKGROUND
function initBlueprintParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      const heroOverlay = hero.querySelector('::before');
      // Blueprint moves at different speed
      hero.style.setProperty('--parallax-offset', `${scrolled * 0.3}px`);
    }
  });
}

// ENHANCED REVEAL ANIMATIONS
function enhanceRevealAnimations() {
  gsap.utils.toArray('.reveal').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
        once: false
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to load from CDN
    let attempts = 0;
    const checkGSAP = setInterval(() => {
      attempts++;
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        clearInterval(checkGSAP);
        initModularAssembly();
      } else if (attempts > 20) {
        clearInterval(checkGSAP);
        console.warn('GSAP failed to load after 20 attempts');
      }
    }, 100);
  });
} else {
  // DOM already loaded
  let attempts = 0;
  const checkGSAP = setInterval(() => {
    attempts++;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      clearInterval(checkGSAP);
      initModularAssembly();
    } else if (attempts > 20) {
      clearInterval(checkGSAP);
      console.warn('GSAP failed to load after 20 attempts');
    }
  }, 100);
}

// Export for manual initialization if needed
window.initModularAssembly = initModularAssembly;

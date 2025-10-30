// GSAP Animations for Vallabh Prefab
// Professional, smooth animations with GSAP

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Page Load Animation
window.addEventListener('load', () => {
  const tl = gsap.timeline();
  
  // Hide loader and reveal content
  tl.to('.page-loader', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut',
    onComplete: () => {
      document.querySelector('.page-loader').style.display = 'none';
      document.body.classList.remove('loading');
    }
  })
  .from('.site-header', {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.3')
  .from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.hero-sub', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.7')
  .from('.hero-ctas .btn', {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  }, '-=0.5')
  .from('.hero-gallery .slide', {
    x: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out'
  }, '-=0.8');
});

// Smooth scroll animations for sections
gsap.utils.toArray('.reveal').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
});

// Interior images animation
gsap.from('.interior', {
  scrollTrigger: {
    trigger: '.top-interiors',
    start: 'top 80%'
  },
  scale: 0.9,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power2.out'
});

// Stats counter animation
const animateCounter = (element, target) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true
    },
    innerHTML: target,
    duration: 2,
    ease: 'power1.inOut',
    snap: { innerHTML: 1 },
    onUpdate: function() {
      const val = Math.ceil(this.targets()[0].innerHTML);
      if(target === '1.2') {
        element.innerHTML = (val / 10).toFixed(1);
      } else {
        element.innerHTML = val + (target === '100' ? '' : '+');
      }
    }
  });
};

// Wait for stats to be in DOM
setTimeout(() => {
  const stats = document.querySelectorAll('.stat strong');
  if(stats.length > 0) {
    animateCounter(stats[0], 250);
    animateCounter(stats[1], '1.2');
    animateCounter(stats[2], 15);
  }
}, 500);

// Reasons grid items animation
gsap.from('.reasons-grid li', {
  scrollTrigger: {
    trigger: '.reasons-grid',
    start: 'top 75%'
  },
  y: 40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: 'power2.out'
});

// Carousel images parallax
gsap.utils.toArray('.carousel-inner img').forEach((img, i) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    y: i % 2 === 0 ? -50 : 50,
    ease: 'none'
  });
});

// Buttons magnetic effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', (e) => {
    gsap.to(btn, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', (e) => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});

// Hero parallax effect
gsap.to('.hero', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  },
  y: 200,
  opacity: 0.8,
  ease: 'none'
});

// Floating animation for product cards
if(document.querySelector('.product-card')) {
  gsap.to('.product-card.active', {
    y: -10,
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });
}

// WhatsApp button entrance
setTimeout(() => {
  const whatsappBtn = document.querySelector('.whatsapp-fab');
  if(whatsappBtn) {
    gsap.from(whatsappBtn, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(2)',
      delay: 1
    });
    
    // Pulse animation
    gsap.to(whatsappBtn, {
      scale: 1.1,
      duration: 0.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }
}, 1500);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'power3.inOut'
      });
    }
  });
});

// Add stagger animation to solution cards if they exist
if(document.querySelector('.solution-card')) {
  gsap.from('.solution-card', {
    scrollTrigger: {
      trigger: '.solutions-grid',
      start: 'top 75%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out'
  });
}

// Text split animation for h1 (optional - can be disabled if too much)
const splitText = (element) => {
  const text = element.textContent;
  const words = text.split(' ');
  element.innerHTML = '';
  
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.textContent = word + (i < words.length - 1 ? ' ' : '');
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    element.appendChild(span);
  });
  
  return element.querySelectorAll('span');
};

// Animate intro stats title
setTimeout(() => {
  const introTitle = document.querySelector('.intro h2');
  if(introTitle) {
    const words = splitText(introTitle);
    gsap.from(words, {
      scrollTrigger: {
        trigger: introTitle,
        start: 'top 80%'
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
}, 1000);

console.log('✨ GSAP animations loaded successfully');

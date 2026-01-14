// MODERN PRODUCT CAROUSEL - Framer Motion Inspired
// Smooth animations, touch gestures, momentum scrolling

let carouselState = {
  currentIndex: 0,
  totalCards: 0,
  isAnimating: false,
  autoplayInterval: null,
  touchStartX: 0,
  touchEndX: 0,
  isDragging: false,
  dragStart: 0,
  dragOffset: 0
};

function initProductCarousel() {
  const carousel = document.querySelector('.products-carousel');
  const cards = document.querySelectorAll('.product-card');
  
  if (!carousel || !cards.length) {
    return;
  }
  
  carouselState.totalCards = cards.length;
  
  // Create floating particles for visual effect
  createFloatingParticles(carousel);
  
  // Create navigation arrows
  createNavigationArrows(carousel);
  
  // Create indicator dots
  createIndicators(carousel, cards.length);
  
  // Initialize carousel position
  updateCarouselPosition(cards);
  
  // Setup event listeners
  setupEventListeners(carousel, cards);
  
  // Start autoplay
  startAutoplay(cards);
  
  // Add keyboard navigation
  setupKeyboardNavigation(cards);
  
  // Initialize with entrance animation
  setTimeout(() => {
    carousel.classList.add('initialized');
  }, 100);
}

function createFloatingParticles(carousel) {
  const particleCount = 8;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'carousel-particle';
    
    // Random positions
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * -150 - 50;
    const randomDelay = Math.random() * 4;
    
    particle.style.setProperty('--dx', `${randomX}px`);
    particle.style.setProperty('--dy', `${randomY}px`);
    particle.style.animationDelay = `${randomDelay}s`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    carousel.appendChild(particle);
  }
}

function createNavigationArrows(carousel) {
  // Previous button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-nav prev';
  prevBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  prevBtn.setAttribute('aria-label', 'Previous product');
  
  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-nav next';
  nextBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  nextBtn.setAttribute('aria-label', 'Next product');
  
  carousel.appendChild(prevBtn);
  carousel.appendChild(nextBtn);
  
  // Add ripple effect on click
  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('click', (e) => {
      createRipple(e, btn);
    });
  });
}

function createIndicators(carousel, count) {
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'carousel-indicators';
  
  for (let i = 0; i < count; i++) {
    const indicator = document.createElement('button');
    indicator.className = 'carousel-indicator';
    indicator.setAttribute('aria-label', `Go to product ${i + 1}`);
    indicator.dataset.index = i;
    indicatorsContainer.appendChild(indicator);
  }
  
  carousel.parentElement.appendChild(indicatorsContainer);
}

function updateCarouselPosition(cards, animated = true) {
  // Mobile check removed to allow carousel on all devices
  /* if (window.innerWidth <= 992) {
    cards.forEach(card => {
      card.style = '';
      card.classList.remove('active', 'left-1', 'left-2', 'right-1', 'right-2');
    });
    return;
  } */

  if (carouselState.isAnimating && animated) return;
  
  if (animated) {
    carouselState.isAnimating = true;
    setTimeout(() => {
      carouselState.isAnimating = false;
    }, 600);
  }
  
  const currentIndex = carouselState.currentIndex;
  const isMobile = window.innerWidth <= 768;
  
  cards.forEach((card, idx) => {
    // Remove all position classes
    card.classList.remove('active', 'left-1', 'left-2', 'right-1', 'right-2');
    card.style.transition = animated ? 
      'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 
      'none';
    
    // Calculate relative position
    let diff = idx - currentIndex;
    
    // Handle wrap-around
    if (diff > cards.length / 2) {
      diff -= cards.length;
    } else if (diff < -cards.length / 2) {
      diff += cards.length;
    }
    
    // Apply position classes
    if (diff === 0) {
      card.classList.add('active');
      card.style.zIndex = '100';
      
      // Stagger animation for card content
      if (animated) {
        const features = card.querySelectorAll('.card-features li');
        features.forEach((li, i) => {
          li.style.setProperty('--i', i);
        });
      }
    } else if (diff === -1) {
      card.classList.add('left-1');
      card.style.zIndex = '50';
    } else if (diff === -2) {
      card.classList.add('left-2');
      card.style.zIndex = '40';
    } else if (diff === 1) {
      card.classList.add('right-1');
      card.style.zIndex = '50';
    } else if (diff === 2) {
      card.classList.add('right-2');
      card.style.zIndex = '40';
    } else {
      // Hide cards that are too far
      card.style.opacity = '0';
      card.style.transform = 'translate(-50%, -50%) scale(0.6)';
      card.style.zIndex = '10';
    }
  });
  
  // Update indicators
  updateIndicators(currentIndex);
}

function updateIndicators(currentIndex) {
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((indicator, idx) => {
    indicator.classList.toggle('active', idx === currentIndex);
  });
}

function setupEventListeners(carousel, cards) {
  // Arrow button clicks
  const prevBtn = carousel.querySelector('.carousel-nav.prev');
  const nextBtn = carousel.querySelector('.carousel-nav.next');
  
  prevBtn?.addEventListener('click', () => {
    navigateCarousel('prev', cards);
    resetAutoplay(cards);
  });
  
  nextBtn?.addEventListener('click', () => {
    navigateCarousel('next', cards);
    resetAutoplay(cards);
  });
  
  // Indicator clicks
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      carouselState.currentIndex = idx;
      updateCarouselPosition(cards);
      resetAutoplay(cards);
    });
  });
  
  // Touch/swipe support
  setupTouchGestures(carousel, cards);
  
  // Mouse drag support (desktop)
  setupMouseDrag(carousel, cards);
  
  // Window resize
  window.addEventListener('resize', () => {
    updateCarouselPosition(cards, false);
  });
}

function setupTouchGestures(carousel, cards) {
  carousel.addEventListener('touchstart', (e) => {
    carouselState.touchStartX = e.touches[0].clientX;
    carouselState.isDragging = true;
    stopAutoplay();
  }, { passive: true });
  
  carousel.addEventListener('touchmove', (e) => {
    if (!carouselState.isDragging) return;
    carouselState.touchEndX = e.touches[0].clientX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', () => {
    if (!carouselState.isDragging) return;
    
    const diff = carouselState.touchStartX - carouselState.touchEndX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        navigateCarousel('next', cards);
      } else {
        navigateCarousel('prev', cards);
      }
    }
    
    carouselState.isDragging = false;
    resetAutoplay(cards);
  });
}

function setupMouseDrag(carousel, cards) {
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  
  carousel.addEventListener('mousedown', (e) => {
    // Only for navigation arrows area, not on cards
    if (e.target.closest('.product-card')) return;
    
    isDragging = true;
    startX = e.clientX;
    carousel.style.cursor = 'grabbing';
    stopAutoplay();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
  });
  
  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        navigateCarousel('next', cards);
      } else {
        navigateCarousel('prev', cards);
      }
    }
    
    isDragging = false;
    carousel.style.cursor = '';
    resetAutoplay(cards);
  });
}

function setupKeyboardNavigation(cards) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigateCarousel('prev', cards);
      resetAutoplay(cards);
    } else if (e.key === 'ArrowRight') {
      navigateCarousel('next', cards);
      resetAutoplay(cards);
    }
  });
}

function navigateCarousel(direction, cards) {
  if (carouselState.isAnimating) {
    return;
  }
  
  const totalCards = carouselState.totalCards;
  
  if (direction === 'next') {
    carouselState.currentIndex = (carouselState.currentIndex + 1) % totalCards;
  } else {
    carouselState.currentIndex = (carouselState.currentIndex - 1 + totalCards) % totalCards;
  }
  
  updateCarouselPosition(cards);
}

function startAutoplay(cards) {
  stopAutoplay();
  
  carouselState.autoplayInterval = setInterval(() => {
    navigateCarousel('next', cards);
  }, 5000); // Change slide every 5 seconds
}

function stopAutoplay() {
  if (carouselState.autoplayInterval) {
    clearInterval(carouselState.autoplayInterval);
    carouselState.autoplayInterval = null;
  }
}

function resetAutoplay(cards) {
  stopAutoplay();
  startAutoplay(cards);
}

function createRipple(event, button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    left: ${x}px;
    top: ${y}px;
    transform: scale(0);
    animation: rippleEffect 0.6s ease-out;
    pointer-events: none;
  `;
  
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple animation to styles
if (!document.querySelector('#ripple-animation-style')) {
  const style = document.createElement('style');
  style.id = 'ripple-animation-style';
  style.textContent = `
    @keyframes rippleEffect {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Export for use in main.js
window.initProductCarousel = initProductCarousel;

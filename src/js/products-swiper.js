// Swiper Carousel Initialization for Products Page
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for DOM to be fully ready
  setTimeout(initProductsSwiper, 100);
});

function initProductsSwiper() {
  const swiperContainer = document.querySelector('.products-swiper');
  
  if (!swiperContainer) {
    console.log('Products swiper container not found');
    return;
  }

  // Initialize Swiper
  const swiper = new Swiper('.products-swiper', {
    // Slides configuration
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: false,
    
    // Responsive breakpoints
    breakpoints: {
      // Mobile (>= 480px)
      480: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // Tablet (>= 768px)
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
        centeredSlides: false
      },
      // Desktop (>= 992px)
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false
      }
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Pagination dots
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    // Smooth animations
    speed: 600,
    effect: 'slide',
    
    // Autoplay (optional - remove if you don't want auto-scroll)
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },

    // Loop mode
    loop: true,

    // Touch/Swipe settings
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    
    // Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Mouse wheel control (optional)
    mousewheel: {
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: true,
    },

    // Accessibility
    a11y: {
      prevSlideMessage: 'Previous product',
      nextSlideMessage: 'Next product',
      paginationBulletMessage: 'Go to product {{index}}',
    },

    // Lazy loading for images
    lazy: {
      loadPrevNext: true,
    },

    // Observer for dynamic content
    observer: true,
    observeParents: true,
    observeSlideChildren: true,

    // Smooth scrollbar
    scrollbar: false,

    // Prevent clicks on transition
    preventClicksPropagation: true,
    preventClicks: true,
    
    // Events
    on: {
      init: function () {
        console.log('Products Swiper initialized successfully');
        // Add animation class
        setTimeout(() => {
          swiperContainer.classList.add('swiper-initialized');
        }, 100);
      },
      slideChange: function () {
        // Optional: Add custom behavior on slide change
        // console.log('Slide changed to:', this.activeIndex);
      },
    },
  });

  // Add touch feedback on mobile
  if ('ontouchstart' in window) {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.addEventListener('touchstart', function() {
        this.style.opacity = '0.9';
      });
      slide.addEventListener('touchend', function() {
        this.style.opacity = '1';
      });
    });
  }

  // Pause autoplay on hover (desktop)
  if (window.innerWidth >= 992) {
    swiperContainer.addEventListener('mouseenter', () => {
      swiper.autoplay.stop();
    });
    swiperContainer.addEventListener('mouseleave', () => {
      swiper.autoplay.start();
    });
  }

  // Handle visibility change (pause when tab is hidden)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  });

  // Expose swiper instance globally for debugging
  window.productsSwiper = swiper;
}

// Optional: Destroy swiper on page unload to prevent memory leaks
window.addEventListener('beforeunload', () => {
  if (window.productsSwiper) {
    window.productsSwiper.destroy(true, true);
  }
});

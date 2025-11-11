// Main JS: load components and add advanced interactivity
function loadHTML(path, selector){
  fetch(path).then(r=>r.text()).then(html=>{
    const el = document.querySelector(selector);
    if(el) {
      el.innerHTML = html;
      // Initialize product carousel after components load
      if(selector === '#product-cards-placeholder') {
        setTimeout(initProductCarousel, 200);
      }
    }
  }).catch(err=>{
    // Failed to load resource - debug log removed
  });
}

function initLazy(){
  const imgs = document.querySelectorAll('img.lazy, img[data-src]');
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const img = e.target;
        if(img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
        obs.unobserve(img);
      }
    });
  },{rootMargin:'100px'});
  imgs.forEach(i=>io.observe(i));
}

// Product Carousel: 3D circular rotation with arrow navigation
function initProductCarousel() {
  const carousel = document.querySelector('.products-carousel');
  const cards = document.querySelectorAll('.product-card');
  if(!cards || cards.length === 0) return;
  
  let currentIndex = 1; // Start with middle card active
  
  // Create navigation arrows
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-nav prev';
  prevBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  prevBtn.setAttribute('aria-label', 'Previous product');
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-nav next';
  nextBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  nextBtn.setAttribute('aria-label', 'Next product');
  
  carousel.appendChild(prevBtn);
  carousel.appendChild(nextBtn);
  
  // Create indicator dots
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'carousel-indicators';
  cards.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-indicator';
    dot.setAttribute('aria-label', `Go to product ${idx + 1}`);
    dot.addEventListener('click', () => {
      currentIndex = idx;
      updateCarousel();
    });
    indicatorsContainer.appendChild(dot);
  });
  carousel.parentElement.appendChild(indicatorsContainer);
  
  const updateCarousel = () => {
    const isMobile = window.innerWidth <= 768;
    
    cards.forEach((card, idx) => {
      card.classList.remove('active');
      
      // Calculate relative position
      const diff = idx - currentIndex;
      
      if (diff === 0) {
        // Center - active
        card.classList.add('active');
        card.style.opacity = '1';
        if (isMobile) {
          card.style.transform = 'translate(-50%, -50%) scale(1) rotateY(0deg)';
        } else {
          card.style.transform = 'translate(-50%, -50%) scale(1.1) rotateY(0deg)';
        }
      } else if (diff === -1 || diff === cards.length - 1) {
        // Left card
        card.style.opacity = isMobile ? '0' : '0.7';
        card.style.transform = 'translate(-170%, -50%) scale(0.8) rotateY(45deg) translateZ(-80px)';
      } else if (diff === 1 || diff === -cards.length + 1) {
        // Right card
        card.style.opacity = isMobile ? '0' : '0.7';
        card.style.transform = 'translate(70%, -50%) scale(0.8) rotateY(-45deg) translateZ(-80px)';
      } else {
        // Hidden
        card.style.transform = 'translate(-50%, -50%) scale(0.6) rotateY(0deg)';
        card.style.opacity = '0';
      }
    });
    
    // Update indicators
    const dots = document.querySelectorAll('.carousel-indicator');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };
  
  // Initialize
  updateCarousel();
  
  // Arrow navigation
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });
  
  // Auto-rotate every 4 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }, 4000);
  
  // Handle window resize
  window.addEventListener('resize', updateCarousel);
}

// NAV toggle (for hamburger)
document.addEventListener('click', (e)=>{
  if(e.target.matches('.nav-toggle') || e.target.closest('.nav-toggle')){
    const nav = document.querySelector('.nav-links');
    if(nav) nav.classList.toggle('open');
  }
});

// Hero slider: cycle hero-gallery .slide elements
function initHeroSlider(){
  const slides = document.querySelectorAll('.hero-gallery .slide');
  if(!slides || slides.length===0) return;
  let idx = 0;
  slides.forEach((s,i)=>{ if(i===0) s.classList.add('active'); });
  setInterval(()=>{
    slides[idx].classList.remove('active');
    idx = (idx+1) % slides.length;
    slides[idx].classList.add('active');
  }, 4500);
}

// Reveal on scroll for elements with .reveal
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){
        ent.target.classList.add('inview');
      }
    });
  },{threshold:0.15});
  els.forEach(e=>io.observe(e));
}

// Floating WhatsApp button creation
function initWhatsApp(){
  if(document.querySelector('.whatsapp-fab')) return;
  const a = document.createElement('a');
  a.href = 'https://wa.me/917066791356';
  a.className = 'whatsapp-fab';
  a.title = 'Chat on WhatsApp';
  a.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 .05 5.328.05 11.95c0 2.109.55 4.176 1.6 6.01L0 24l6.24-1.64c1.78 1.02 3.787 1.56 5.78 1.56 6.63 0 11.95-5.33 11.95-11.95 0-3.2-1.25-6.17-3.45-8.49z" fill="#fff"/><path d="M17.3 14.1c-.3-.15-1.78-.87-2.06-.97-.28-.1-.49-.15-.7.15-.2.3-.8.97-.98 1.17-.18.2-.35.22-.65.07-.3-.15-1.2-.44-2.28-1.4-.84-.75-1.4-1.67-1.57-1.97-.17-.3-.02-.46.12-.6.12-.12.28-.3.42-.45.14-.15.18-.25.28-.42.1-.17.04-.3-.02-.45-.06-.15-.7-1.68-.96-2.29-.25-.6-.5-.52-.7-.53-.18-.01-.4-.01-.62-.01-.22 0-.58.08-.88.37-.3.29-1.18 1.15-1.18 2.8 0 1.64 1.21 3.23 1.38 3.45.17.22 2.4 3.66 5.83 4.98 3.43 1.32 3.43.88 4.05.82.62-.06 1.98-.8 2.26-1.57.28-.77.28-1.43.2-1.57-.08-.14-.28-.22-.58-.37z" fill="#25D366"/></svg>';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
}

// Smooth parallax scroll effect
function initParallax() {
  const hero = document.querySelector('.hero');
  if(!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if(scrolled < 600) {
      hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', ()=>{
  // Load components
  loadHTML('/src/components/header.html','#header-placeholder');
  loadHTML('/src/components/footer.html','#footer-placeholder');
  loadHTML('/src/components/product-cards.html','#product-cards-placeholder');
  
  // Initialize features with delays
  setTimeout(()=>{
    initLazy();
    initHeroSlider();
    initReveal();
    initWhatsApp();
    initParallax();
  }, 300);
});



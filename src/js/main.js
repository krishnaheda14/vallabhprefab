// Main JS: load components and add small interactivity
function loadHTML(path, selector){
  fetch(path).then(r=>r.text()).then(html=>{
    const el = document.querySelector(selector);
    if(el) el.innerHTML = html;
  }).catch(err=>{
    // silent fail for local files if served via file://
    console.warn('Failed to load', path, err);
  });
}

function initLazy(){
  const imgs = document.querySelectorAll('img.lazy');
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const img = e.target; img.src = img.dataset.src; img.classList.remove('lazy'); obs.unobserve(img);
      }
    });
  },{rootMargin:'100px'});
  imgs.forEach(i=>io.observe(i));
}

document.addEventListener('DOMContentLoaded', ()=>{
  // Use root-absolute paths so component fetch works from any page
  loadHTML('/src/components/header.html','#header-placeholder');
  loadHTML('/src/components/footer.html','#footer-placeholder');
  loadHTML('/src/components/product-cards.html','#product-cards-placeholder');
  // small delay to allow components to mount
  setTimeout(()=>{
    initLazy();
  },150);
});

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
  }, 3800);
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
  a.href = 'https://wa.me/911234567890';
  a.className = 'whatsapp-fab';
  a.title = 'Chat on WhatsApp';
  a.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 .05 5.328.05 11.95c0 2.109.55 4.176 1.6 6.01L0 24l6.24-1.64c1.78 1.02 3.787 1.56 5.78 1.56 6.63 0 11.95-5.33 11.95-11.95 0-3.2-1.25-6.17-3.45-8.49z" fill="#fff"/><path d="M17.3 14.1c-.3-.15-1.78-.87-2.06-.97-.28-.1-.49-.15-.7.15-.2.3-.8.97-.98 1.17-.18.2-.35.22-.65.07-.3-.15-1.2-.44-2.28-1.4-.84-.75-1.4-1.67-1.57-1.97-.17-.3-.02-.46.12-.6.12-.12.28-.3.42-.45.14-.15.18-.25.28-.42.1-.17.04-.3-.02-.45-.06-.15-.7-1.68-.96-2.29-.25-.6-.5-.52-.7-.53-.18-.01-.4-.01-.62-.01-.22 0-.58.08-.88.37-.3.29-1.18 1.15-1.18 2.8 0 1.64 1.21 3.23 1.38 3.45.17.22 2.4 3.66 5.83 4.98 3.43 1.32 3.43.88 4.05.82.62-.06 1.98-.8 2.26-1.57.28-.77.28-1.43.2-1.57-.08-.14-.28-.22-.58-.37z" fill="#25D366"/></svg>';
  a.target = '_blank';
  document.body.appendChild(a);
}

// Kick off additional features after DOM ready and small delay
document.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(()=>{
    initHeroSlider();
    initReveal();
    initWhatsApp();
  }, 300);
});


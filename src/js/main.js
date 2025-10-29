// Main JS: load components into placeholders
function loadHTML(path, selector){
  fetch(path).then(r=>r.text()).then(html=>{
    document.querySelector(selector).innerHTML = html;
  }).catch(()=>{});
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadHTML('src/components/header.html','#header-placeholder');
  loadHTML('src/components/footer.html','#footer-placeholder');
  loadHTML('src/components/product-cards.html','#product-cards-placeholder');
});

// Simple navbar logic (placeholder)
document.addEventListener('click', e=>{
  if(e.target.matches('[data-toggle="nav"]')){
    document.querySelector('nav').classList.toggle('open');
  }
});

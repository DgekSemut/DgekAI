document.addEventListener('DOMContentLoaded', ()=>{
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if(burger) burger.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));

  const card = document.querySelector('.card-3d');
  if(card){
    card.addEventListener('mousemove', (e)=>{
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left)/rect.width - 0.5;
      const y = (e.clientY - rect.top)/rect.height - 0.5;
      card.style.transform = `rotateY(${x * -8}deg) rotateX(${y * 8}deg)`;
    });
    card.addEventListener('mouseleave', ()=> card.style.transform = '');
  }

  const blobA = document.querySelector('.blob.a');
  const blobB = document.querySelector('.blob.b');
  window.addEventListener('scroll', ()=>{
    const t = window.scrollY;
    if(blobA) blobA.style.transform = `translateY(${t* -0.08}px)`;
    if(blobB) blobB.style.transform = `translateY(${t* -0.04}px)`;
  });

  const langBtns = document.querySelectorAll('[data-lang]');
  langBtns.forEach(b=> b.addEventListener('click', ()=>{
    const lang = b.getAttribute('data-lang');
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-en]').forEach(el=> el.textContent = el.getAttribute(`data-${lang}`));
  }));
});
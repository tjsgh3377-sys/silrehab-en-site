(function(){
  "use strict";

  /* 1) Sticky header state on scroll */
  var header = document.getElementById('siteHeader');
  var backTop = document.getElementById('backTop');
  function onScroll(){
    var y = window.scrollY || window.pageYOffset;
    if(header){ header.classList.toggle('scrolled', y > 10); }
    if(backTop){ backTop.classList.toggle('show', y > 500); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  if(backTop){
    backTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  /* 2) Mobile hamburger menu */
  var hamburger = document.getElementById('hamburger');
  var mainNav = document.getElementById('mainNav');
  if(hamburger && mainNav){
    hamburger.addEventListener('click', function(){
      var open = mainNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    var navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function(link){
      link.addEventListener('click', function(){
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* 3) FAQ accordion */
  var faqButtons = document.querySelectorAll('.faq-q');
  faqButtons.forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      if(item){ item.classList.toggle('open'); }
    });
  });

  /* 4) Partnership detail modal */
  var modal = document.getElementById('pModal');
  if(modal){
    var titleEl = document.getElementById('pModalTitle');
    var descEl = document.getElementById('pModalDesc');
    var iconEl = document.getElementById('pModalIcon');
    var closeBtn = modal.querySelector('.p-close');
    var cards = document.querySelectorAll('.partner-card');

    function openModal(card){
      titleEl.textContent = card.getAttribute('data-title') || '';
      descEl.innerHTML = card.getAttribute('data-desc') || '';
      var svg = card.querySelector('.p-icon svg');
      if(svg && iconEl){
        iconEl.innerHTML = svg.innerHTML;
        iconEl.setAttribute('viewBox', svg.getAttribute('viewBox') || '0 0 24 24');
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal(){
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    cards.forEach(function(card){
      card.addEventListener('click', function(){ openModal(card); });
    });
    if(closeBtn){ closeBtn.addEventListener('click', closeModal); }
    modal.addEventListener('click', function(e){
      if(e.target === modal){ closeModal(); }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ closeModal(); }
    });
  }

  /* 5) Scroll reveal animation */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ observer.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

})();

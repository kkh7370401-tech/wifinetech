(() => {
  const nav=document.querySelector('.enhanced-nav');
  if(!nav)return;
  const groups=[...nav.querySelectorAll('.nav-group')];
  const desktop=()=>window.matchMedia('(min-width:1181px) and (hover:hover)').matches;
  function setOpen(group,open){
    group.querySelector('.nav-toggle').setAttribute('aria-expanded',String(open));
    group.querySelector('.submenu').hidden=!open;
  }
  function closeAll(except){groups.forEach(group=>{if(group!==except)setOpen(group,false);});}
  groups.forEach(group=>{
    const toggle=group.querySelector('.nav-toggle');
    group.addEventListener('pointerenter',()=>{if(desktop()){closeAll(group);setOpen(group,true);}});
    group.addEventListener('pointerleave',()=>{if(desktop()&&!group.contains(document.activeElement))setOpen(group,false);});
    group.addEventListener('focusin',event=>{if(desktop()&&event.target.classList.contains('nav-top-link')){closeAll(group);setOpen(group,true);}});
    group.addEventListener('focusout',()=>setTimeout(()=>{if(!group.contains(document.activeElement))setOpen(group,false);},0));
    toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';closeAll(group);setOpen(group,open);});
    group.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setOpen(group,false);toggle.focus();}});
  });
  document.addEventListener('click',event=>{if(!nav.contains(event.target))closeAll();});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeAll()));
  const menu=document.querySelector('.menu-btn');
  if(menu){
    menu.setAttribute('aria-controls','mainNav');
    menu.addEventListener('click',()=>closeAll());
  }
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      closeAll();
      if(document.body.classList.contains('menu-open')){
        document.body.classList.remove('menu-open');
        menu?.setAttribute('aria-expanded','false');
        menu?.focus();
      }
    }
  });
  window.addEventListener('resize',()=>{
    closeAll();
    if(window.innerWidth>1180){document.body.classList.remove('menu-open');menu?.setAttribute('aria-expanded','false');}
  });
})();

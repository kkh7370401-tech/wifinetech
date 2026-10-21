(() => {
 const header=document.querySelector('.b-header');
 if(!header)return;
 const groups=[...header.querySelectorAll('.b-menu-group')];
 function setOpen(group,open){group.querySelector('.b-menu-toggle').setAttribute('aria-expanded',String(open));group.querySelector('.b-dropdown').hidden=!open;}
 const close=except=>groups.forEach(g=>{if(g!==except)setOpen(g,false)});
 groups.forEach(g=>{
   const button=g.querySelector('.b-menu-toggle');
   g.addEventListener('pointerenter',()=>{if(matchMedia('(hover:hover)').matches){close(g);setOpen(g,true)}});
   g.addEventListener('pointerleave',()=>{if(matchMedia('(hover:hover)').matches&&!g.contains(document.activeElement))setOpen(g,false)});
   g.querySelector('.b-category-link').addEventListener('focus',()=>{close(g);setOpen(g,true)});
   button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';close(g);setOpen(g,open)});
   g.addEventListener('focusout',()=>setTimeout(()=>{if(!g.contains(document.activeElement))setOpen(g,false)},0));
   g.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();setOpen(g,false);(button.offsetParent?button:g.querySelector('.b-category-link')).focus();setOpen(g,false)}});
   g.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>close()));
 });
 document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
 const update=()=>document.documentElement.style.setProperty('--b-header-height',header.offsetHeight+'px');
 new ResizeObserver(update).observe(header);update();
 window.addEventListener('resize',()=>close());
})();

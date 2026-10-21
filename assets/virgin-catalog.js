(() => {
 let trigger=null,previousOverflow='';
 document.querySelectorAll('[data-catalog]').forEach(button=>button.addEventListener('click',()=>{
  const dialog=document.getElementById(button.dataset.catalog);
  if(!dialog)return;
  trigger=button;previousOverflow=document.body.style.overflow;
  dialog.showModal();document.body.style.overflow='hidden';
 }));
 document.querySelectorAll('.virgin-dialog').forEach(dialog=>{
  dialog.querySelector('.virgin-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;trigger?.focus();});
 });
})();

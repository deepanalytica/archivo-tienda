/* Dossiers: progressive, accessible search and filters. All content is in HTML. */
(()=>{
  'use strict';
  const cards=Array.from(document.querySelectorAll('.dossier'));
  const filters=Array.from(document.querySelectorAll('[data-category-filter]'));
  const search=document.getElementById('search-project');
  const result=document.getElementById('results-summary');
  const empty=document.getElementById('no-results');
  if(!cards.length||!search||!result)return;
  const fold=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
  let active='all';
  function update(){
    const query=fold(search.value).trim();
    let count=0;
    for(const card of cards){
      const matchCategory=active==='all'||card.dataset.category===active;
      const matchText=!query||fold(card.dataset.search).includes(query)||fold(card.textContent).includes(query);
      const show=matchCategory&&matchText;
      card.hidden=!show;
      if(show)count++;
    }
    result.textContent=count+' de '+cards.length+' proyectos y módulos visibles';
    empty.hidden=count!==0;
    filters.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.categoryFilter===active)));
  }
  filters.forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.categoryFilter;update();}));
  search.addEventListener('input',update);
  const hash=location.hash;
  if(/^#proyecto-[a-z0-9-]+$/.test(hash)){
    const card=document.getElementById(hash.slice(1));
    if(card){
      active='all';search.value='';update();
      // A deep link opens the design decisions, not only the title.
      const details=card.querySelector('details');
      if(details)details.open=true;
    }
  }
  update();
})();

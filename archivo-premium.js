(() => {
  'use strict';
  const container=document.getElementById('archivo-shop-products');
  const data=globalThis.ARCHIVO_CATALOG;
  if (!container || !data) return;
  const order=['ownform','imago','salitre','alto'];
  const money=value=>new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(value);
  const selected=order.map(id=>data.products.find(item=>item.brand===id && item.category==='Poleras')||data.products.find(item=>item.brand===id)).filter(Boolean);
  container.replaceChildren();
  selected.forEach((product,index)=>{
    const article=document.createElement('article');article.className='archivo-curated-product';
    const open=document.createElement('button');open.type='button';open.className='archivo-curated-product-image';open.dataset.openProduct=product.id;open.setAttribute('aria-label','Ver '+product.name+' de '+data.brands[product.brand].name);
    const image=document.createElement('img');image.src=product.image;image.alt=product.name+', '+product.color;image.width=800;image.height=1000;image.loading='lazy';open.append(image);
    const caption=document.createElement('div');caption.className='archivo-curated-product-meta';
    const naming=document.createElement('div');
    const brand=document.createElement('span');brand.className='archivo-curated-brand';brand.textContent=data.brands[product.brand].name;
    const title=document.createElement('button');title.type='button';title.dataset.openProduct=product.id;title.className='archivo-curated-title';title.textContent=product.name;
    naming.append(brand,title);
    const value=document.createElement('span');value.className='archivo-curated-price';value.textContent=money(product.price);
    caption.append(naming,value);article.append(open,caption);container.append(article);
  });
  if (selected.length<4) container.setAttribute('data-partial','true');
  // Evitar menus abiertos tras navegación interna.
  document.querySelectorAll('.archivo-mobile-links a').forEach(anchor=>anchor.addEventListener('click',()=>{
    const details=anchor.closest('details');if(details)details.open=false;
  }));
})();

/* Progressive links to grounded engineering and design dossiers. */
(()=>{
  'use strict';
  document.querySelectorAll('.arsenal-card[id^="ar-"]').forEach(card=>{
    const footer=card.querySelector('.arsenal-footer');
    if(!footer)return;
    const id=card.id.slice(3);
    if(!/^[a-z0-9-]+$/.test(id))return;
    if(footer.querySelector('.arsenal-dossier-link'))return;
    const link=document.createElement('a');
    link.className='arsenal-dossier-link';
    link.href='./criterio/#proyecto-'+id;
    link.textContent='Decisiones y arquitectura ↗';
    link.setAttribute('aria-label','Examinar el problema, el criterio y la construcción de '+(card.querySelector('h3')?.textContent||id));
    footer.append(link);
  });
})();

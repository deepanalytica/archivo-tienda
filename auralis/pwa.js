// Progressive Web App. Audio starts only on user gesture.
(() => {
 if ('serviceWorker' in navigator && location.protocol === 'https:') {
   window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js', {scope:'./'}).catch(console.warn));
 }
 let prompt; const button=document.getElementById('installPwa');
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();prompt=e;button.hidden=false});
 button?.addEventListener('click',async()=>{if(!prompt)return;prompt.prompt();await prompt.userChoice;prompt=null;button.hidden=true});
 window.addEventListener('appinstalled',()=>{button.hidden=true});
})();

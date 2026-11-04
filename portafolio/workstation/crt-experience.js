(()=>{
function crtExperience(){
 "use strict";
 const unit=document.getElementById("crtUnit");
 if(!unit)return;
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
 let done=false;
 function finishBoot(){
   if(done)return;done=true;unit.classList.add("is-booted");
   try{sessionStorage.setItem("ar-boot-seen","1")}catch{}
 }
 const skip=document.getElementById("skipBoot");
 skip?.addEventListener("click",finishBoot);
 let seen=false;
 try{seen=sessionStorage.getItem("ar-boot-seen")==="1"}catch{}
 if(reduced.matches||seen){finishBoot();}else{setTimeout(finishBoot,1950);}
 const canvas=document.getElementById("crtTerrain");
 if(!canvas||!canvas.getContext)return;
 const ctx=canvas.getContext("2d",{alpha:true,desynchronized:true});
 if(!ctx)return;
 let width=0,height=0,active=true,visible=true,last=0,frame=0,shift=0,target=0;
 const resize=()=>{
   const rect=canvas.getBoundingClientRect();
   if(rect.width<15||rect.height<15)return;
   const dpr=Math.min(window.devicePixelRatio||1,1.75);
   const w=Math.max(1,Math.round(rect.width*dpr)),h=Math.max(1,Math.round(rect.height*dpr));
   if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
   ctx.setTransform(dpr,0,0,dpr,0,0);
   width=rect.width;height=rect.height;
   paint(performance.now()/1000);
 };
 function peak(nx,t,depth){
   const broad=Math.sin(nx*7.3+depth*.55+t*.08)*.38+
     Math.sin(nx*15.1+1.3+t*.045)*.20+
     Math.cos(nx*3.8-1.6)*.42;
   const spike=Math.exp(-Math.pow((nx-.56)/.14,2))*.9+
     Math.exp(-Math.pow((nx-.78)/.19,2))*.6;
   return (broad+spike)*32;
 }
 function paint(t){
   if(!width||!height)return;
   ctx.clearRect(0,0,width,height);
   const w=width,h=height;
   const s=Math.min(w/500,h/310);
   ctx.save();
   ctx.lineCap="round";
   const cx=w*.77+shift*7,cy=h*.315,r=h*.205;
   const sun=ctx.createRadialGradient(cx,cy,r*.07,cx,cy,r);
   sun.addColorStop(0,"rgba(183,255,171,.35)");
   sun.addColorStop(1,"rgba(151,248,149,.025)");
   ctx.fillStyle=sun;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();
   ctx.save();ctx.beginPath();ctx.arc(cx,cy,r*.75,0,Math.PI*2);ctx.clip();
   for(let i=0;i<14;i++){
      const y=cy-r*.65+i*r*.105;
      ctx.fillStyle=`rgba(149,255,151,${Math.max(.06,.46-i*.024)})`;
      ctx.fillRect(cx-r*.8,y,r*1.6,r*.047);
   }
   ctx.restore();
   // Several deterministic wireframe ridges; all drawn locally, no paid media.
   for(let row=14;row>=0;row--){
      const z=row/14, y0=h*(.46+z*.5),amp=(1-z)*h*.30;
      ctx.strokeStyle=`rgba(144,255,146,${.17+z*.46})`;
      ctx.lineWidth=(.65+z*.55)*Math.max(.75,s);
      ctx.beginPath();
      for(let col=0;col<=62;col++){
        const nx=col/62, px=nx*w;
        const terrain=peak(nx,t,row)*Math.max(.65,s);
        const rise=amp*(.45+.4*Math.sin(nx*7+row*.42)+.26*Math.cos(nx*19-row*.33));
        const yy=y0-(1-z)*terrain-rise*.43;
        if(col===0)ctx.moveTo(px,yy);else ctx.lineTo(px,yy);
      }
      ctx.stroke();
   }
   // Perspective longitude lines, decreasing brightness toward horizon.
   for(let col=0;col<=18;col++){
      const nx=col/18;
      ctx.strokeStyle="rgba(146,255,140,.27)";
      ctx.lineWidth=Math.max(.6,s*.8);
      ctx.beginPath();
      for(let row=0;row<=30;row++){
         const z=row/30,sy=h*(.47+Math.pow(z,1.67)*.53);
         const center=.5+(nx-.5)*(z*.95+.035),xx=center*w;
         const y=sy-(1-z)*peak(center,t,0)*s*.75;
         if(row===0)ctx.moveTo(xx,y);else ctx.lineTo(xx,y);
      }
      ctx.stroke();
   }
   const glow=ctx.createLinearGradient(0,h*.6,0,h);
   glow.addColorStop(0,"rgba(151,255,150,0)");
   glow.addColorStop(1,"rgba(151,255,150,.12)");
   ctx.fillStyle=glow;ctx.fillRect(0,h*.6,w,h*.4);
   ctx.restore();
 }
 const tick=now=>{
   if(!active||!visible||document.hidden)return;
   if(now-last>=42){
     last=now;
     shift+=(target-shift)*.045;
     paint(now/1000);
   }
   frame=requestAnimationFrame(tick);
 };
 const redraw=()=>{
   if(frame)cancelAnimationFrame(frame);frame=0;
   if(reduced.matches){paint(0);return;}
   if(visible&&!document.hidden){frame=requestAnimationFrame(tick);}
 };
 const parent=canvas.parentElement;
 const obs=new IntersectionObserver(es=>{
   visible=es.some(x=>x.isIntersecting);
   redraw();
 },{threshold:.05});
 obs.observe(canvas);
 const ro=new ResizeObserver(()=>{resize();if(!frame&&!reduced.matches)redraw()});
 ro.observe(parent);
 parent.addEventListener("pointermove",ev=>{
   if(reduced.matches)return;
   const rect=parent.getBoundingClientRect();
   target=(ev.clientX-rect.left)/rect.width-.5;
 },{passive:true});
 parent.addEventListener("pointerleave",()=>{target=0},{passive:true});
 document.addEventListener("visibilitychange",redraw);
 reduced.addEventListener?.("change",redraw);
 window.addEventListener("pagehide",()=>{active=false;cancelAnimationFrame(frame);obs.disconnect();ro.disconnect()},{once:true});
 resize();redraw();
}
if(document.getElementById("crtUnit")){crtExperience();}
else{const observer=new MutationObserver(()=>{if(document.getElementById("crtUnit")){observer.disconnect();crtExperience();}});observer.observe(document.body,{childList:true});}
})();

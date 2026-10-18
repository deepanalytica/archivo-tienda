(()=>{
"use strict";
const catalog=globalThis.ARCHIVO_CATALOG;
const order=["ownform","imago","umbral","neblina","logic","solar","marea","orbita","salitre","alto","limen","brava"];
if(!catalog||order.some(k=>!catalog.brands[k])){document.getElementById("brand-tabs").textContent="Catálogo temporalmente no disponible.";return;}
const get=id=>document.getElementById(id),buttons=[];
const contrast=hex=>{const c=(hex||"#202b32").replace("#","");if(!/^[a-f0-9]{6}$/i.test(c))return "#fff8ec";const vals=[0,2,4].map(i=>parseInt(c.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*vals[0]+.7152*vals[1]+.0722*vals[2]>.40?"#222321":"#fff8ec";};
const img=(id,src,alt)=>{const n=get(id);n.src=src;n.alt=alt;};
function select(key,focus=false){
 const b=catalog.brands[key];if(!b)return;const n=order.indexOf(key),tone=b.palette?.[0]||b.color;
 document.documentElement.style.setProperty("--brand",tone);
 document.documentElement.style.setProperty("--onbrand",contrast(tone));
 buttons.forEach((node,i)=>{const active=i===n;node.setAttribute("aria-selected",String(active));node.tabIndex=active?0:-1;if(active){get("brand-panel").setAttribute("aria-labelledby",node.id);if(focus)node.focus({preventScroll:true});}});
 get("brand-index").textContent=String(n+1).padStart(2,"0")+" / 12";
 get("brand-mood").textContent=(b.mood||"UNIVERSO DE MARCA").toUpperCase();
 get("brand-world").textContent=b.world||b.tagline||b.name;
 get("brand-manifesto").textContent=b.manifesto||b.description||"";
 get("brand-art").textContent=b.art||"Dirección artística propia";
 get("brand-collections").textContent=Object.values(catalog.collections).filter(c=>c.brand===key).map(c=>c.name).join(" · ");
 get("campaign-label").textContent=b.name+" / "+(b.collection||"COLECCIÓN");
 img("brand-signature","assets/identities/"+key+"-signature.svg","Firma de "+b.name);
 get("brand-signature").style.filter=contrast(tone)==="#222321"?"brightness(0)":"brightness(0) invert(1)";
 img("campaign-image",b.campaign,"Campaña editorial conceptual de "+b.name);
 const palette=get("brand-palette");palette.replaceChildren();
 (b.palette||[b.color]).forEach(c=>{const el=document.createElement("i");el.style.background=c;el.title=c;el.setAttribute("aria-label",c);palette.append(el);});
 const own=key==="ownform";
 img("macro-art",own?"assets/prints/other-nature/signal-bloom.svg":"assets/prints/brand-lab/"+key+"/macro-study.svg","Estudio de estampado de "+b.name);
 img("neck-art",own?"assets/trims/ownform/neck-m-charcoal.svg":"assets/trims/brand-lab/"+key+"/neck-m.svg","Etiqueta interior de estudio "+b.name);
 img("sleeve-art",own?"assets/trims/ownform/sleeve-charcoal.svg":"assets/trims/brand-lab/"+key+"/sleeve-signature.svg","Firma de manga de "+b.name);
 img("tag-art",own?"assets/trims/ownform/hangtag-front.svg":"assets/trims/brand-lab/"+key+"/hangtag-front.svg","Colgante de "+b.name);
 get("macro-title").textContent=own?"Signal Bloom / Other Nature":b.name+" / Estudio 01";
 get("macro-caption").textContent=own?"Arte específico de OWN FORM para prueba técnica.":"Propuesta original 270 × 270 mm. No corresponde necesariamente a un SKU publicado.";
 const grid=get("brand-products");grid.replaceChildren();
 catalog.products.filter(p=>p.brand===key).slice(0,4).forEach(p=>{const a=document.createElement("a");a.href="index.html#catalogo";a.setAttribute("aria-label","Explorar catálogo: "+p.name);const im=document.createElement("img");im.src=p.image;im.alt="Fotografía de concepto: "+p.name;im.loading="lazy";const div=document.createElement("div");div.className="product-caption";const title=document.createElement("strong");title.textContent=p.name;const type=document.createElement("span");type.textContent=p.category;div.append(title,type);a.append(im,div);grid.append(a);});
 try{const u=new URL(location.href);u.searchParams.set("marca",key);history.replaceState(null,"",u);}catch{}
}
order.forEach((key,i)=>{const b=catalog.brands[key],el=document.createElement("button");el.type="button";el.id="brand-tab-"+key;el.setAttribute("role","tab");el.setAttribute("aria-controls","brand-panel");el.setAttribute("aria-selected","false");const rank=document.createElement("span");rank.className="seq";rank.textContent=String(i+1).padStart(2,"0");const label=document.createElement("span");label.className="name";label.textContent=b.name;el.append(rank,label);get("brand-tabs").append(el);buttons.push(el);el.addEventListener("click",()=>select(key));el.addEventListener("keydown",e=>{let dest;if(["ArrowRight","ArrowDown"].includes(e.key))dest=(i+1)%order.length;else if(["ArrowLeft","ArrowUp"].includes(e.key))dest=(i+order.length-1)%order.length;else if(e.key==="Home")dest=0;else if(e.key==="End")dest=order.length-1;else return;e.preventDefault();select(order[dest],true);});});
const requested=new URLSearchParams(location.search).get("marca");select(order.includes(requested)?requested:order[0]);
})();

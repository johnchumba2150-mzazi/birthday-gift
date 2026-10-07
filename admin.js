// Browser storage can be blocked (in-app browsers, private mode). Never let that break the page.
var safeStore={get(k){try{return window.localStorage.getItem(k);}catch(e){return null;}},set(k,v){try{window.localStorage.setItem(k,v);}catch(e){}}};
const defaults=[
{id:1,name:"Kenyan Bead Bracelet",category:"Bracelets",price:800,tag:"Colour / Everyday"},
{id:2,name:"Shanga Waist Beads",category:"Waist Beads",price:1200,tag:"Colour / Statement"},
{id:3,name:"Beaded Necklace",category:"Necklaces",price:1500,tag:"Hand-finished / Bold"},
{id:4,name:"Beaded Earrings",category:"Earrings",price:600,tag:"Light / Colourful"}];
let products=defaults;
try{ products=JSON.parse(safeStore.get("imaniProducts")||"null")||defaults; }catch(e){ products=defaults; }
const box=document.querySelector("#admin-products");
function render(){box.innerHTML=products.map((p,i)=>`<form class="admin-card" data-id="${p.id}"><div><p class="eyebrow">${p.category}</p><h3>${p.name}</h3></div><label>Price (KSh)<input type="number" min="0" step="50" name="price" value="${p.price}"></label><button class="cta small" type="submit">Save price</button><span class="saved" aria-live="polite"></span></form>`).join("");}
render();
box.addEventListener("submit",e=>{e.preventDefault();const form=e.target;const id=Number(form.dataset.id);const item=products.find(p=>p.id===id);item.price=Math.max(0,Number(form.price.value)||0);safeStore.set("imaniProducts",JSON.stringify(products));form.querySelector(".saved").textContent="Saved ✓";setTimeout(()=>form.querySelector(".saved").textContent="",1600);});

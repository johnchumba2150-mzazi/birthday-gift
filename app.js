const defaults=[
 {id:1,name:"Kenyan Bead Bracelet",category:"Bracelets",price:800,tag:"Colour / Everyday"},
 {id:2,name:"Shanga Waist Beads",category:"Waist Beads",price:1200,tag:"Colour / Statement"},
 {id:3,name:"Beaded Necklace",category:"Necklaces",price:1500,tag:"Hand-finished / Bold"},
 {id:4,name:"Beaded Earrings",category:"Earrings",price:600,tag:"Light / Colourful"}
];
const products=JSON.parse(localStorage.getItem("imaniProducts")||"null")||defaults;
const colors=[["#d96b3b","#f1c75b","#244b45"],["#7c3f70","#f2b35e","#315c52"],["#203b70","#d95b45","#e4c95b"],["#b54b5d","#e4c95b","#356b63"]];
document.querySelector("#products").innerHTML=products.map((p,i)=>`
<article class="product" tabindex="0" style="--c1:${colors[i%4][0]};--c2:${colors[i%4][1]};--c3:${colors[i%4][2]}">
  <div class="product-art"><div class="fake-beads"></div><span>${p.category}</span></div>
  <div class="product-info"><div><h3>${p.name}</h3><p>${p.tag}</p></div><strong>KSh ${Number(p.price).toLocaleString()}</strong></div>
  <a class="order" href="https://wa.me/254786800131?text=${encodeURIComponent("Hello Imani Bead Works, I am interested in "+p.name+" (KSh "+p.price+").")}">Order ↗</a>
</article>`).join("");

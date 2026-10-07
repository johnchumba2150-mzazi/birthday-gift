const defaults=[
 {id:1,name:"Kenyan Bead Bracelet",category:"Bracelets",price:800,tag:"Colour / Everyday"},
 {id:2,name:"Shanga Waist Beads",category:"Waist Beads",price:1200,tag:"Colour / Statement"},
 {id:3,name:"Beaded Necklace",category:"Necklaces",price:1500,tag:"Hand-finished / Bold"},
 {id:4,name:"Beaded Earrings",category:"Earrings",price:600,tag:"Light / Colourful"}
];
const productsData=JSON.parse(localStorage.getItem("imaniProducts")||"null")||defaults;
const colors=[['#d96b3b','#f1c75b','#244b45'],['#7c3f70','#f2b35e','#315c52'],['#203b70','#d95b45','#e4c95b'],['#b54b5d','#e4c95b','#356b63']];
const imagePool=[
 'https://upload.wikimedia.org/wikipedia/commons/d/de/Traditional_waist_beads_and_accessories.jpg',
 'https://upload.wikimedia.org/wikipedia/commons/6/67/Kenyan_Necklace_Beads.jpg',
 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Kenya_most_popular_beaded_bracelet.jpg/500px-Kenya_most_popular_beaded_bracelet.jpg',
 'https://upload.wikimedia.org/wikipedia/commons/8/8b/African_bead_work.jpg'
];
const products=document.querySelector('#products');
products.innerHTML=productsData.map((p,i)=>`
<article class="product" tabindex="0">
  <div class="product-art product-photo"><img loading="lazy" src="${imagePool[i%imagePool.length]}" alt="${p.name}"><div class="photo-shade"></div><span>${p.category}</span></div>
  <div class="product-info"><div><h3>${p.name}</h3><p>${p.tag}</p></div><strong>KSh ${Number(p.price).toLocaleString()}</strong></div>
  <a class="order" href="https://wa.me/254786800131?text=${encodeURIComponent("Hello Imani Bead Works, I am interested in "+p.name+" (KSh "+p.price+").")}">Order ↗</a>
</article>`).join('');

const heroSlides=[...document.querySelectorAll('.hero-slide')];
const heroDots=[...document.querySelectorAll('.hero-dot')];
const heroCaption=document.querySelector('#hero-caption');
const captions=['Waist beads & accessories','Kenyan beaded necklaces','Handmade Kenyan beadwork'];
let heroIndex=0;
function showHero(index){
 heroIndex=(index+heroSlides.length)%heroSlides.length;
 heroSlides.forEach((el,i)=>el.classList.toggle('active',i===heroIndex));
 heroDots.forEach((el,i)=>el.classList.toggle('active',i===heroIndex));
 if(heroCaption) heroCaption.textContent=captions[heroIndex];
}
heroDots.forEach((dot,i)=>dot.addEventListener('click',()=>showHero(i)));
setInterval(()=>showHero(heroIndex+1),4200);

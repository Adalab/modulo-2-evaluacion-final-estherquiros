const h="https://fakestoreapi.com/products",a=document.querySelector(".js_products-list"),f=document.querySelector(".js_shopping-cart"),g=document.querySelector(".js_findFormInput"),S=document.querySelector(".js_findFormButton");let d=[],o=[];const l=localStorage.getItem("cart");l&&(o=JSON.parse(l),u(o,f,"hidden"));const C=t=>{t.preventDefault();const r=g.value,c=d.filter(s=>s.title.toLowerCase().includes(r.toLowerCase()));u(c,a)};S.addEventListener("click",C);function $(){fetch(h).then(t=>t.json()).then(t=>{d=t,u(d,a)})}function u(t,r,c){let s="",e="Buy",n="";for(const i of t){let p=i.image;p===void 0&&(p="https://placehold.co/600x400"),o.find(m=>i.id===m.id)&&(e="Delete",n="on-cart"),s+=`<li class="product-card ${n}">
    <div class="product-img-title"> 
    <img class="product-img"src="${p}"/>
    <h2 class="product-title ${n}">${i.title}</h2>
    </div>
    <div class="product-price-button">
    <p class="product-price ${n}">${i.price}€</p>
    <button class="product-button ${c} ${n}" data-id="${i.id}">${e}</button>
    </div>
    </li>`,e="Buy",n=""}r.innerHTML=s}$();a.addEventListener("click",t=>{t.preventDefault();const r=t.target.dataset.id,c=d.find(e=>Number(e.id)===Number(r));o.findIndex(e=>Number(e.id)===Number(r))===-1&&o.push(c),u(o,f,"hidden"),u(d,a),localStorage.setItem("cart",JSON.stringify(o))});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OzsifQ==

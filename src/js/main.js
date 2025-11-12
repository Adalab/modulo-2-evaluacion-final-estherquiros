"use strict";
const API_URL = "https://fakestoreapi.com/products";
const productsList = document.querySelector(".js_products-list");
const shoppingCartList = document.querySelector(".js_shopping-cart");
const nameFilterInput = document.querySelector(".js_findFormInput");
const findFormButton = document.querySelector(".js_findFormButton");

let products = [];
let shoppingCart = [];

//FILTRO Y BOTON BUSCAR
const handleInputNameFilter = (ev) => {
  ev.preventDefault();
  const nameFilter = nameFilterInput.value;
  const filteredProducts = products.filter((productObj) =>
    productObj.title.toLowerCase().includes(nameFilter.toLowerCase())
  );
  renderProducts(filteredProducts);
};

findFormButton.addEventListener("click", handleInputNameFilter);

//FETCH: TRAER LOS DATOS DEL API
function fetchProducts() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data;
      renderProducts(products, productsList);
    });
}

//PINTAR LOS PRODUCTOS

function renderProducts(products, list) {
  let html = "";

  for (const product of products) {
    html += `<li class="product-card">
    <div class="product-img-title"> 
    <img class="product-img"src="${product.image}"/>
    <h2 class="product-title">${product.title}</h2>
    </div>
    <div class="product-price-button">
    <p class="product-price">${product.price}</p>
    <button class="product-button" data-id="${product.id}">Buy</button>
    </div>
    </li>`;
  }

  list.innerHTML = html;
}

fetchProducts();

//DARLE BOTON DE COMPRAR Y SUMAR PRODUCTOS A LA CESTA

productsList.addEventListener("click", (ev) => {
  ev.preventDefault();
  console.log(ev.target.dataset.id);
  const productId = ev.target.dataset.id;
  const product = products.find((prd) => {
    return Number(prd.id) === Number(productId);
  });

  console.log(product);

  const existProductOnShoppingCart = shoppingCart.findIndex((prd) => {
    return Number(prd.id) === Number(productId);
  });
  console.log(existProductOnShoppingCart);

  if (existProductOnShoppingCart === -1) {
    shoppingCart.push(product);
  }

  renderProducts(shoppingCart, shoppingCartList);

  console.log(shoppingCart);
});

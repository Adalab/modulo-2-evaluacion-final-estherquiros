"use strict";
const API_URL = "https://fakestoreapi.com/products";
const productsList = document.querySelector(".js_products-list");
const shoppingCartList = document.querySelector(".js_shopping-cart");
const nameFilterInput = document.querySelector(".js_findFormInput");
const findFormButton = document.querySelector(".js_findFormButton");

let products = [];
let shoppingCart = [];
//obtengo los datos del carrito guardados en el LS.
const shoppingCartStorage = localStorage.getItem("cart");
//Si recupero los datos (no es null, hay cositas en el carro)
if (shoppingCartStorage) {
  //entonces, los datos guardados los meo en la variable shoppingCart
  shoppingCart = JSON.parse(shoppingCartStorage);
  //renderizo porque sino no se muestra
  renderProducts(shoppingCart, shoppingCartList, "hidden");
}

//FILTRO Y BOTON BUSCAR
const handleInputNameFilter = (ev) => {
  ev.preventDefault();
  const nameFilter = nameFilterInput.value;
  const filteredProducts = products.filter((productObj) =>
    productObj.title.toLowerCase().includes(nameFilter.toLowerCase())
  );
  renderProducts(filteredProducts, productsList);
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
//el hidden para quitar el boton

function renderProducts(products, list, hiddenClass) {
  let html = "";

  let buttonText = "Buy";
  let onCartClass = "";

  for (const product of products) {
    //recorro la lista de la compra para ver si el producto existe dentro de ella (para saber cuando poner eliminar)
    const existsOnShoppingCart = shoppingCart.find((shpPro) => {
      return product.id === shpPro.id;
    });

    // si el producto está en la shopping cart cambiamos el nombre del botón y las clases
    if (existsOnShoppingCart) {
      buttonText = "Delete";
      onCartClass = "on-cart";
    }

    html += `<li class="product-card ${onCartClass}">
    <div class="product-img-title"> 
    <img class="product-img"src="${product.image}"/>
    <h2 class="product-title ${onCartClass}">${product.title}</h2>
    </div>
    <div class="product-price-button">
    <p class="product-price ${onCartClass}">${product.price}€</p>
    <button class="product-button ${hiddenClass} ${onCartClass}" data-id="${product.id}">${buttonText}</button>
    </div>
    </li>`;
    //reseteo el texto del boton para que vuelva a buy
    buttonText = "Buy";
    //reseteo on-cart y pongo vacio para que no se apliquen los estilos
    onCartClass = "";
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

  //el hidden para quitar el boton
  renderProducts(shoppingCart, shoppingCartList, "hidden");
  //para que se me cambie el boton a eliminar tengo que volver a rnderizar la ul
  renderProducts(products, productsList);

  // guardar el carrito en el localStorage
  console.log(JSON.stringify(shoppingCart));
  localStorage.setItem("cart", JSON.stringify(shoppingCart));

  console.log(shoppingCart);
});

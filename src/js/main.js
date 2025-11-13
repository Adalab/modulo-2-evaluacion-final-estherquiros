"use strict";
//api
const API_URL = "https://fakestoreapi.com/products";
//UL de most popular produts
const productsList = document.querySelector(".js_products-list");
//UL DE SHOPPING CART
const shoppingCartList = document.querySelector(".js_shopping-cart");
//me traigo el input de formulario para buscar productos
const nameFilterInput = document.querySelector(".js_findFormInput");
//me traigo el boton de formulario para buscar productos
const findFormButton = document.querySelector(".js_findFormButton");

///////////////////
//mis arrays de mis productos y de mi cesta
let products = [];
let shoppingCart = [];

//////////////////
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
//función de filtro que le paso al escuchador de evento click cuando pulso en el boton de find
const handleInputNameFilter = (ev) => {
  ev.preventDefault(); //para que no lance el evento del formulario
  //input donde he escrito la palabra filtrar
  const nameFilter = nameFilterInput.value;
  //funcion de busqueda sobre el array products
  //en el caso de que el titulo de alguno de los productos que recorre el bucle coincide con la palabra devuelve true, por lo que filtra esos productos en esta variable
  const filteredProducts = products.filter((productObj) =>
    productObj.title.toLowerCase().includes(nameFilter.toLowerCase())
  );
  //para qvolver a pintr lo que he filtrado
  renderProducts(filteredProducts, productsList);
};
//evento click para ejeutar la funcion de filtro
findFormButton.addEventListener("click", handleInputNameFilter);

//FETCH: TRAER LOS DATOS DEL API
function fetchProducts() {
  //estructura del fetch. 1 (then); conbierto la respuesta del servidor a JSON. 2(then); ese JSON lo introduzco en el array products y lo renderizo en la UL de productos
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      products = data;
      renderProducts(products, productsList);
    });
}

//PINTAR LOS PRODUCTOS
//el hidden para quitar el boton, añadiendo la clase hidden.
function renderProducts(products, list, hiddenClass) {
  let html = "";

  let buttonText = "Buy";
  let onCartClass = "";

  //BUCLE

  //imagen, lo que tiene que mostrar si hay imagen y lo que tiene que mostrar si no hay imagen. Recorre el array elemento a elemento, sin saltarse ninguno.
  for (const product of products) {
    let productImage = product.image;
    //si el producto no tiene imagen (undefined) muestra una imagen por defecto (condicional)
    if (productImage === undefined) {
      productImage = "https://placehold.co/600x400";
    }

    //recorro la lista de la compra para ver si el producto existe dentro de ella (para saber cuando poner eliminar). Recore uno a uno hasta que encuentra el igual y devuelve existsOnShoppingCart.
    const existsOnShoppingCart = shoppingCart.find((shpPro) => {
      return product.id === shpPro.id;
    });

    // si el producto está en la shopping cart cambiamos el nombre del botón y las clases. Si el anterior me ha devuelto existsOnShoppingCart me cambia el texto del boton y colores.
    if (existsOnShoppingCart) {
      buttonText = "Delete";
      onCartClass = "on-cart";
    }

    //construyendo la lista de articulos
    html += `<li class="product-card ${onCartClass}">
    <div class="product-img-title"> 
    <img class="product-img"src="${productImage}"/>
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
  //modifico el html para que se pinten
  list.innerHTML = html;
}

fetchProducts();

//DARLE BOTON DE COMPRAR Y SUMAR PRODUCTOS A LA CESTA

productsList.addEventListener("click", (ev) => {
  ev.preventDefault();
  const productId = ev.target.dataset.id;
  const product = products.find((prd) => {
    return Number(prd.id) === Number(productId);
  });

  const existProductOnShoppingCart = shoppingCart.findIndex((prd) => {
    return Number(prd.id) === Number(productId);
  });

  if (existProductOnShoppingCart === -1) {
    shoppingCart.push(product);
  }

  //el hidden para quitar el boton
  renderProducts(shoppingCart, shoppingCartList, "hidden");
  //para que se me cambie el boton a eliminar tengo que volver a rnderizar la ul
  renderProducts(products, productsList);

  // guardar el carrito en el localStorage

  localStorage.setItem("cart", JSON.stringify(shoppingCart));
});

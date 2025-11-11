"use strict";
const API_URL = "https://fakestoreapi.com/products";

let products = [];

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

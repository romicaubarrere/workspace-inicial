const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json"; // cambio esto para ver si queda https://japceibal.github.io/emercado-api/cats_products/101.json

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

// PARTE 1 DE LA ENTREGA 2

document.addEventListener("DOMContentLoaded", () => {
  // obtiene los datos del localstorage
  let usuario = localStorage.getItem("email");
  let password = localStorage.getItem("password");

  if (usuario == undefined || password == undefined) {
    //si no hay ninguno que lo mande al login de nuevo
    location.href = "login.html";
  }

  document.getElementById("desplegable").innerHTML = usuario; //el boton para cerrar sesion, futuro desplegable
});

function desconectar() {
  //para cerrar sesion
  localStorage.clear();
  location.href = "login.html";
}

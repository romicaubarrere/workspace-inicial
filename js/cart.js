const cart = CART_INFO_URL + 25801 + EXT_TYPE; //guardo el json

let cartArray = [];
let subtotal = 0;
let total = 0;
let costo = 0;

function mostrarCarrito(carrito) {
  //con onchange para que se actualice automaticamente
  //minimo 0 para que no haya cantidad negativa
  let cart = "";

  for (let i = 0; i < carrito.articles.length; i++) {
    //por cada articulo muestro sus atributos

    if (carrito.articles[i].currency == "USD") {
      //if para que no me aparezca en dolares
      carrito.articles[i].currency = "UYU";
      carrito.articles[i].unitCost = carrito.articles[i].unitCost * 41.08;
    }

    cart += `
        </tr>
        <tr id="prod${i}">
        <td>
        <img src="${carrito.articles[i].image}" style="width: 100%; height: 120px;">
        </td>
        <td>
        <b>${carrito.articles[i].name}</b>
        </td>
        <td>
        <input type="number" class="cantidad" min="0" value=${carrito.articles[i]} onchange="calcularSubTotal()"></input> 
        </td>
        <td>
        ${carrito.articles[i].currency}
        </td>
        <td class="costo">    
        ${carrito.articles[i].unitCost}
        </td>
        <td id="subtotal${i}">
        0
        </td>
       
        </tr>
        `;
  }

  document.getElementById("productosV").innerHTML = //creo tabla general
    `<tr style="text-align: center">
    <th style="width: 20%"></th>
    <th>Producto</th>
    <th>Cant.</th>
    <th>Moneda</th>
    <th>Precio unitario</th>
    <th>Subtotal</th>
    <th></th>` + cart; //llamo al json

  calcularSubTotal();
}

function calcularSubTotal() {
  total = 0;
  subtotal = 0;
  costo = 0;
  //consigo los precios del json
  let preciosU = document.getElementsByClassName("costo");
  let cantidad = document.getElementsByClassName("cantidad");

  for (let i = 0; i < preciosU.length; i++) {
    subtotal +=
      parseFloat(preciosU[i].innerHTML) * parseFloat(cantidad[i].value); //REDONDEO

    document.getElementById("subtotal" + i).innerHTML =
      "$" + parseFloat(preciosU[i].innerHTML) * parseFloat(cantidad[i].value);
  }

  total += subtotal;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(cart).then(function (resultObj) {
    if (resultObj.status === "ok" && localStorage.getItem("carrito") == null) {
      localStorage.setItem("carrito", JSON.stringify(resultObj.data));
    }
    cartArray = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito(cartArray);
  });

  calcularSubTotal();
});

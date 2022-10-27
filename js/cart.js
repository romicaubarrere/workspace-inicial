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
        <input type="number" class="cantidad" min="0" value=${carrito.articles[i].count} onchange="calcularSubTotal()"></input> 
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
       <td>
       <button id="eliminar${i}" class="btn btn-danger" onclick="eliminar(${i})">X</button>
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
    <th>   </th>` + cart; //llamo al json
  calcularSubTotal();
}

function calcularSubTotal() {
  total = 0;
  subtotal = 0;
  costo = 0;
  //consigo los precios del json
  let preciosUnidad = document.getElementsByClassName("costo");
  let cantidad = document.getElementsByClassName("cantidad");
  let envio = document.getElementById("envio").value;

  for (let i = 0; i < preciosUnidad.length; i++) {
    subtotal +=
      parseFloat(preciosUnidad[i].innerHTML) * parseFloat(cantidad[i].value);

    document.getElementById("subtotal" + i).innerHTML =
      "$" +
      parseFloat(preciosUnidad[i].innerHTML) * parseFloat(cantidad[i].value);
  }

  total += subtotal;

  // calcular el envio

  if (envio == "local") {
    costo = 0;
  } else if (envio == "standard") {
    costo = total * 0.05;
  } else if (envio == "express") {
    costo = total * 0.07;
  } else if (envio == "premium") {
    costo = total * 0.15;
  }
  document.getElementById("total").innerHTML = "$" + (total + costo).toFixed(0);
  document.getElementById("total1").innerHTML =
    "$" + (total + costo).toFixed(0);
  document.getElementById("costoE").innerHTML =
    "<b>Su costo de envio es: $" + costo.toFixed(0) + "</b>";
}

//  metodos de pago, va actualizando si selecciona uno u otro

function seleccionar() {
  let sel = document.getElementById("pago").value;
  if (sel == "transf") {
    transeferencia();
  } else if (sel == "tarjetaC") {
    tarjetaC();
  }
}

// funcion para la tarjeta de credito

function tarjetaC() {
  let tarjeta = "";

  tarjeta = `
  <div>
      <h4>Datos de la tarjeta</h4>
          <div class="form-row">
              <div class="form-group col-md-12">
                <label>Nombre</label>
                <input type="text" class="form-control" placeholder="Nombre" name="credito">
              </div>
              <div class="form-group col-md-12">
                <label>Apellido</label>
                <input type="text" class="form-control"  placeholder="Apellido" name="credito">
              </div>
          </div>
          <div class="form-group">
              <label>Numero de tarjeta</label>
              <input type="number" class="form-control" placeholder="Numero de tarjeta" name="credito">
          </div>
          <div class="form-row">
              <div class="form-group col-md-3">
                <label>CVV</label>
                <input type="number" class="form-control" placeholder="CVV" name="credito">
              </div>
              <div class="form-group col-md-6">
                <label>Vencimiento</label>
                <input type="month" class="form-control" placeholder="Vencimiento" name="credito">
              </div>
            
              
          </div>
          
  </div> 

  `;
  document.getElementById("metPago").innerHTML = tarjeta;
}

//funcion si selecciona transferencia bancaria

function transeferencia() {
  let transf = "";

  transf = `
  <div>
  <br>
  <h4>Datos de la transferencia</h4>
  <p>Nombre del banco: BROU</p>
  <p>Titular: Emercado Romi</p>
  <p>Sucursal: Solymar, Ciudad de la Costa</p>
  <p>Numero de cuenta: 0008 7788 3333</p>
  <p>Enviar comprobante de la transferencia a; jap@emercado.com.uy</p>
  </div>
  `;

  document.getElementById("metPago").innerHTML = transf;
}

//funcion volver

function volver() {
  window.location.href = "index.html";
}

//para que sean requeridos en la direccion
document.getElementById("pag").addEventListener("click", function (o) {
  o.preventDefault();

  let dir = document.getElementsByName("dir");
  for (let i = 0; i < dir.length; i++) {
    if (dir[i].value == "") {
      dir[i].style.border = "1px solid red";
    }
  }

  // para que sea requerido el metodo de pago

  let forma = document.getElementById("pago");
  if (forma.value == "") {
    forma.style.border = "1px solid red";
  } else if (forma.value == "tarjetaC") {
    let cred = document.getElementsByName("credito");
    for (let i = 0; i < cred.length; i++) {
      if (cred[i].value == "") {
        cred[i].style.border = "1px solid red";
        o.preventDefault();
        //cancela el evento si es cancelable , lo que significa que la acción predeterminada que pertenece al evento no ocurrirá.
      } else {
        document.getElementById(
          "exampleModalLabel"
        ).innerHTML = `Compra finalizada`;

        document.getElementById("pag").remove();
        document.getElementById(
          "but"
        ).innerHTML = `<button type="button" class="btn btn-success w-100 " onclick="volver()" > Finalizar</button> <div class="alert alert-success" role="alert">
        Compra finalizada con exito!
      </div>`;
      }
    }
  } else if (forma.value == "transf") {
    document.getElementById(
      "but"
    ).innerHTML = `<button type="submit" class="btn btn-success w-100 " onclick="volver()" >Finalizar</button> <div class="alert alert-success" role="alert">
    Compra finalizada con exito!
  </div>`;
  }
});

function eliminar(posicion) {
  const removed = cartArray.articles.splice(posicion, 1);
  localStorage.setItem("carrito", JSON.stringify(cartArray));
  mostrarCarrito(cartArray);
  calcularSubTotal();
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

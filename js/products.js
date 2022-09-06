//cambios de solo autos a productos en general
//array donde se cargarán los datos recibidos:
let productsArray = [];
let buscado = []; //para la funcion buscar

//entrega 3, declarar el id del producto
function setProductId(product_id) {
  localStorage.setItem("productID", product_id);
  window.location.href = "product-info.html";
}
//entrega 3

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array) {
  let minimo = document.getElementById("minimo").value; //toma el id del html
  let maximo = document.getElementById("maximo").value;

  if (array == undefined) {
    //para que funcionen los asc y des
    array = productsArray;
  }

  if (maximo == 0 || maximo == undefined) {
    maximo = 1000000000;
  }

  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let products = productsArray[i];

    if (products.cost >= minimo && products.cost <= maximo) {
      //para el filtro
      htmlContentToAppend += //probando el onclick, funciona y lleva a todos a sus respectivos products id
        `
        <div class="list-group-item list-group-item-action" onclick="setProductId(${products.id})"> 
            <div class="row">
                <div class="col-3">
                    <img src="` +
        products.image + //cambio de auto a products
        `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4 class="float-start">` +
        products.name +
        " - " +
        products.currency +
        " " +
        products.cost +
        `</h4> 
    <br>
    <br>
      <p>  ` +
        products.description +
        `</p>

                        </div>
                        <small class="text-muted">` +
        products.soldCount +
        ` vendidos</small>
                    </div>

                </div>
            </div>
        </div>
        `;
      document.getElementById("cat-list-container").innerHTML =
        htmlContentToAppend;
    }
  }
}

let catID = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE; //asigna el json a la lista, cambia de 101, 102, 103

function ordenASC() {
  //filtro ascendente
  productsArray.sort((a, b) => {
    if (a.cost > b.cost) {
      return 1;
    }
    if (a.cost < b.cost) {
      return -1;
    } else {
      return 0;
    }
  });

  showProductsList();
}

function ordenDES() {
  productsArray.sort((a, b) => {
    if (a.cost < b.cost) {
      return 1;
    }
    if (a.cost > b.cost) {
      return -1;
    } else {
      return 0;
    }
  });

  showProductsList();
}

function ordenREL() {
  productsArray.sort((a, b) => {
    if (a.soldCount < b.soldCount) {
      return 1;
    }
    if (a.soldCount > b.soldCount) {
      return -1;
    } else {
      return 0;
    }
  });

  showProductsList();
}

//buscador

function buscar() {
  let elemento = document.getElementById("buscador").value;
  let buscado = productsArray.filter((producto) => {
    return producto.name.toLowerCase().indexOf(elemento.toLowerCase()) > -1;
  });
  showProductsList(buscado);
}

//buscador

document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("minimo").value = "";
  document.getElementById("maximo").value = "";

  showProductsList();
});

document.getElementById("asc").addEventListener("click", () => {
  ordenASC();
});

document.getElementById("des").addEventListener("click", () => {
  ordenDES();
});

document.getElementById("rel").addEventListener("click", () => {
  ordenREL();
});

document.getElementById("buscador").addEventListener("keyup", () => {
  buscar();
});

document.getElementById("buscador").addEventListener("mouseover", buscar);
() => {
  buscar();
};

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(catID).then(function (resultObj) {
    //obtiene la info del json
    if (resultObj.status === "ok") {
      productsArray = resultObj.data.products;
      showProductsList(productsArray);
    }
  });
});

//cambios de solo autos a productos en general
//array donde se cargarán los datos recibidos:
let productsArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array) {
  //codigo nuevo

  let minimo = document.getElementById("minimo").value; //toma el id del html
  let maximo = document.getElementById("maximo").value;

  if (array == undefined) {
    //para que funcionen los asc y des
    array = productsArray;
  }

  if (maximo == 0 || maximo == undefined) {
    maximo = 1000000000000;
  }

  //codigo nuevo
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let products = productsArray[i];

    if (products.cost >= minimo && products.cost <= maximo) {
      //para el filtro
      htmlContentToAppend +=
        `
        <div class="list-group-item list-group-item-action">
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

//codigo nuevo, para filtros

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

//codigo nuevo

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(catID).then(function (resultObj) {
    //obtiene la info del json
    if (resultObj.status === "ok") {
      productsArray = resultObj.data.products;
      showProductsList(productsArray);
    }
  });
});
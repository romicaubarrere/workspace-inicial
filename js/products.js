//cambios de solo autos a productos en general
//array donde se cargarán los datos recibidos:
let categoriesArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let products = productsArray[i];
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

let catID = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE; //asigna el json a la lista, cambia de 101, 102, 103

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(catID).then(function (resultObj) {
    //obtiene la info del json
    if (resultObj.status === "ok") {
      productsArray = resultObj.data.products;
      showProductsList(productsArray);
    }
  });
});

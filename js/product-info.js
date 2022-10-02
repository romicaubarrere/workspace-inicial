//entrega 3

/*Haciendo uso del identificador guardado en el punto anterior, realiza la solicitud adecuada para obtener la información de dicho producto y preséntala en product-info.html */

// declarar los json
let productCode = window.localStorage.getItem("productID");
let productInfoUrl = PRODUCT_INFO_URL + productCode + EXT_TYPE; //obtener la info de los comentarios
let productCommentUrl = PRODUCT_INFO_COMMENTS_URL + productCode + EXT_TYPE; //obtener comentarios

async function showProductInfo() {
  function datosImportantes(prodID, text) {
    const dato = document.getElementById(prodID);
    dato.innerText = text;
  }

  function imagenesProductos(imagenes) {
    const foto = document.getElementById("photo-gallery"); //obtiene las imagenes

    for (let img_src of imagenes) {
      foto.innerHTML += `
           <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center w-25">
           <img src="${img_src}" alt="" class="img-fluid">
           </a>`; //muestra las imagenes
    }
  }

  const json = await getJSONData(productInfoUrl); // obtener la info del json
  const infoProducto = json.data;

  //los ids deben coincidir con el html, chequear eso
  // sacar los datos del json

  datosImportantes("prod-name", infoProducto.name);
  datosImportantes("prod-cat", infoProducto.category);
  datosImportantes(
    "prod-price",
    infoProducto.currency + " " + infoProducto.cost
  );
  datosImportantes("prod-sold", infoProducto.soldCount);
  datosImportantes("prod-des", infoProducto.description);

  imagenesProductos(infoProducto.images);

  const relatedProductsRequest = await getJSONData(
    PRODUCT_INFO_URL + infoProducto.id + ".json"
  );
  const relatedProducts = relatedProductsRequest.data;
  mostrarRel(relatedProducts);
}

// PARTE DE LOS COMENTARIOS

/*Haz la solicitud necesaria para obtener la lista de comentarios de cada producto y muéstralos debajo de lo realizado en el punto anterior (con su puntuación, usuario y fecha). */

// estrellas

async function showProductComment() {
  function puntuacionEstrellas(estrellas) {
    const valoresValidos = [0, 1, 2, 3, 4, 5]; //valores posibles de estrellas
    const esValido = valoresValidos.some((value) => value === estrellas);
    let textoMostrado = "";

    if (esValido) {
      for (let star = 1; star <= 5; star++) {
        if (star <= estrellas) {
          textoMostrado += `<span class="fa fa-star checked" id= "estrella"></span>`;
        } else {
          textoMostrado += `<span class="fa fa-star"></span>`;
        }
      }
    } else {
      textoMostrado = `<span class="text-danger">No es valido</span>`;
    }

    return textoMostrado;
  }

  //para que aparezcan comentarios

  function showComment() {
    document.getElementById("comment-num").innerText = prodComentarios.length;
    for (let comment of prodComentarios) {
      comentarios.innerHTML += `
            <li class="list-group-item">
              <p><span class="fw-bold">${comment.user}</span> - <span>${
        comment.dateTime
      }</span> - <span>${puntuacionEstrellas(comment.score)}</span></p>
              <p>${comment.description}</p>
            </li>`;
    }
  }

  const json = await getJSONData(productCommentUrl); //espera a la promise.
  const prodComentarios = json.data;
  const comentarios = document.getElementById("prod-comment");

  if (prodComentarios.length > 0) {
    showComment();
  } else {
    comentarios.innerHTML = `<h4 class="text-muted text-center">Sin comentarios aun.</h4>`;
  }
}

showProductInfo();
showProductComment();

//Entrega 4

function mostrarRel(infoProducto) {
  let rela = "";

  infoProducto.relatedProducts.forEach((producto) => {
    //por cada producto muestra la imagen y el
    rela += `
    <div onclick="goToProduct (${producto.id})" class="text-center d-flex flex-column justify-content-center p-4 ">
    <img src="${producto.image}" alt="" class="img-fluid">

    <h2 class="fw-light">${producto.name}</h2>
    </div>`;
  });

  document.getElementById("relacionados").innerHTML += rela;
}

function goToProduct(id) {
  window.localStorage.setItem("productID", id);
  location.reload();
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productos = resultObj.data;
      mostrarRel();
    }
  });
});

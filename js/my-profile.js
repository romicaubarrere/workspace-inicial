//
//funcion desafiate para que se pueda cambiar la foto
//
function foto() {
  let foto = document.getElementById("imagen");
  let fotoNueva = document.querySelector("input[type=file]").files[0];

  let reader = new FileReader();

  reader.onload = function (e) {
    foto.src = reader.result;
  };
  if (fotoNueva) {
    reader.readAsDataURL(fotoNueva);
  } else {
    foto.src = "img/perfil.png";
  }
}

function showUserData() {
  //escribe el usuario guardado en el login (localstorage)
  console.log(localStorage.getItem("email")); //diferencia entre comillas y sin comillas
  document.getElementById("usuario").innerHTML = localStorage.getItem("email");
  document.getElementById("imagen").value = localStorage.getItem("img");
  document.getElementById("primerNombre").value =
    localStorage.getItem("primerNombre");
  document.getElementById("segundoNombre").value =
    localStorage.getItem("segundoNombre");
  document.getElementById("correo").value = localStorage.getItem("correo");
  document.getElementById("telefono").value = localStorage.getItem("telefono");
  document.getElementById("primerApellido").value =
    localStorage.getItem("primerApellido");
  document.getElementById("segundoApellido").value =
    localStorage.getItem("segundoApellido");
}

(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function guardarCambios() {
  const img = document.getElementById("imagen").src;
  const name = document.getElementById("primerNombre").value;
  const secondName = document.getElementById("segundoNombre").value;
  const surname = document.getElementById("primerApellido").value;
  const surname2 = document.getElementById("segundoApellido").value;
  const mail = document.getElementById("correo").value;
  const contacto = document.getElementById("telefono").value;

  localStorage.setItem("imagen", img);
  localStorage.setItem("primerNombre", name);
  localStorage.setItem("segundoNombre", secondName);
  localStorage.setItem("primerApellido", surname);
  localStorage.setItem("segundoApellido", surname2);
  localStorage.setItem("correo", mail);
  localStorage.setItem("telefono", contacto);
}

function eliminarCambios() {
  localStorage.clear();
  location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  showUserData(); //cuando carga la pagina enseguida me muestra el usuario precargado
});

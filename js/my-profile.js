function showUserData() {
  //escribe el usuario guardado en el login (localstorage)
  // console.log(localStorage.getItem("email")); //diferencia entre comillas y sin comillas
  // console.log(localStorage.getItem(email));
  document.getElementById("usuario").innerHTML = localStorage.getItem("email");
  document.getElementById("imagen").value = localStorage.getItem("img");
  document.getElementById("name1").value = localStorage.getItem("name");
  document.getElementById("name2").value = localStorage.getItem("secondName");
  document.getElementById("email1").value = localStorage.getItem("mail");
  document.getElementById("contact1").value = localStorage.getItem("contacto");
  document.getElementById("surname1").value = localStorage.getItem("surname");
  document.getElementById("surname2").value = localStorage.getItem("surname2");
}
//
//funcion para tocar cambiar datos agregar info
//
function activar() {
  console.log("activando");
  let des = document.getElementsByTagName("input");

  for (desconectados of des) {
    desconectados.removeAttribute("disabled");
  }
}

function desactivar() {
  console.log("activando");
  let des = document.getElementsByTagName("input");

  for (desconectados of des) {
    desconectados.setAttribute("disabled", "false");
  }
}

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

function guardarCambios() {
  //
  document.querySelectorAll("input").forEach((e) => e.reportValidity());

  const img = document.getElementById("imagen").src;
  const name = document.getElementById("name1").value;
  const secondName = document.getElementById("name2").value;
  const surname = document.getElementById("surname1").value;
  const surname2 = document.getElementById("surname2").value;
  const mail = document.getElementById("email1").value;
  const contacto = document.getElementById("contact1").value;

  localStorage.setItem("img", img);
  localStorage.setItem("name", name);
  localStorage.setItem("secondName", secondName);
  localStorage.setItem("surname1", surname);
  localStorage.setItem("surname2", surname2);
  localStorage.setItem("mail", mail);
  localStorage.setItem("contacto", contacto);

  desactivar();
}

document.addEventListener("DOMContentLoaded", () => {
  showUserData(); //cuando carga la pagina enseguida me muestra el usuario precargado
  //
  //funcion que guarda los cambios hechos
  //

  document.getElementById("save").addEventListener("click", () => {
    guardarCambios();
  });
  document.getElementById("change").addEventListener("click", () => {
    activar();
  });

  let inputs = document.getElementsByTagName("input");
  console.log(inputs);
  document.getElementById("save").addEventListener("onclick", () => {
    inputs.forEach((input) => {
      console.log("inputs");
      input.checkValidity();
    });
  });
});

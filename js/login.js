function registro() {
  let email = document.getElementById("usuario");
  let password = document.getElementById("password");

  let errorEnMail = document.getElementById("errorEnMail");
  let errorEnPassword = document.getElementById("errorEnPassword");

  if (email.value === "") {
    email.classList.add("is-invalid");
    errorEnMail.innerHTML = "Ingresa tu e-mail";
  } else {
    email.classList.remove("is-invalid");
    errorEnMail.innerHTML = "";
  }

  if (password.value === "") {
    password.classList.add("is-invalid");
    errorEnPassword.innerHTML = "Ingresa tu contraseña";
  } else {
    password.classList.remove("is-invalid");
    errorEnPassword.innerHTML = "";
  }

  if (email.value !== "" && password.value !== "") {
    localStorage.setItem("password", password.value);
    localStorage.setItem("email", email.value);
    location.href = "index.html";
  }
}

// desde aca es cuando carga la pagina, a partir de tocar el boton
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("boton").addEventListener("click", () => {
    registro();
  });
});

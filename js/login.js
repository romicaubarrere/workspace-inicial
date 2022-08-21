function registro() {
  let email = document.getElementById("mail").value;
  let password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Faltan datos");
  } else {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    location.href = "index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("boton").addEventListener("click", () => {
    registro();
  });
});

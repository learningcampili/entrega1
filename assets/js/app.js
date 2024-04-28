addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.querySelector(".btn-menu");
  const menuItems = document.querySelector(".menu-items");

  // captura datos para ver si ya inicio session o no
  const logOutButton = document.querySelector("#log-out");
  const logInButton = document.querySelector("#log-in");
  const registraseButton = document.querySelector("#registrarse");
  var isLogged = localStorage.getItem("user");

  // para mostrar o iniciar Session o el Logout
  if (!isLogged) {
    logOutButton.style.display = "none";
    logInButton.style.display = "block";
    registraseButton.style.display = "block";
  } else {
    logOutButton.style.display = "block";
    logInButton.style.display = "none";
    registraseButton.style.display = "none";
  }

  // para el menu hamburgesa
  if (btnMenu) {
    btnMenu.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
    menuItems.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
  }
  if (logOutButton) {
    logOutButton.addEventListener("click", logout);
  }
});

function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  console.log(data);

  const formJSON = Object.fromEntries(data.entries());
  console.log(formJSON);

  if (!formJSON.term) {
    console.log("no ingresaste nada");
    return;}
 

  alert(`Para ser enviado al backend\n\n ${JSON.stringify(formJSON, null, 2)}`);

  form.reset();
}

function logout() {
  localStorage.removeItem("user");
}

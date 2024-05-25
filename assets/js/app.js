addEventListener("DOMContentLoaded", () => {
  // const apiUrl = "https://codo-movies-backend.onrender.com/api/movie";

  let offset = 0;
  let limit = 12;

  const anterior = document.querySelector("#anterior");
  const siguiente = document.querySelector("#siguiente");

  siguiente.addEventListener("click", () => {
    offset = offset + limit;
    console.log(offset);
  });
  anterior.addEventListener("click", () => {
    if (offset > 0) {
      offset = offset - limit;
    }
    console.log(offset);
  });

  const btnMenu = document.querySelector(".btn-menu");
  const menuItems = document.querySelector(".menu-items");
  const btnBrand = document.querySelector(".brand");

  // captura datos para ver si ya inicio session o no
  const logOutButton = document.querySelector("#log-out");
  const logInButton = document.querySelector("#log-in");
  const adminButton = document.querySelector("#admin");
  const registraseButton = document.querySelector("#registrarse");
  var isLogged = localStorage.getItem("user");

  // para el menu hamburgesa
  if (btnMenu) {
    btnMenu.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
    menuItems.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
    btnBrand.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
  }
  if (logOutButton) {
    logOutButton.addEventListener("click", logout);
  }
  // para mostrar o iniciar Session o el Logout
  if (!isLogged) {
    logOutButton.style.display = "none";
    logInButton.style.display = "block";
    registraseButton.style.display = "block";
    adminButton.style.display = "none";
  } else {
    logOutButton.style.display = "block";
    logInButton.style.display = "none";
    registraseButton.style.display = "none";
    adminButton.style.display = "block";
  }
});

function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  if (!formJSON.term) {
    return;
  }

  alert(`Para ser enviado al backend\n\n ${JSON.stringify(formJSON, null, 2)}`);

  form.reset();
}

function logout() {
  localStorage.removeItem("user");
}

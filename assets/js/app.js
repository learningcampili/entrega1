addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://codo-movies-backend.onrender.com/api/movie";

  const itemsPerPage = 12;
  let currentPage = 1;
  let totalItems = 0;

  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");
  const portadas = document.querySelector(".portadas");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadPage(currentPage);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      currentPage++;
      loadPage(currentPage);
    }
  });

  const fetchItems = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
      const response = await fetch(`${apiUrl}?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      const data = await response.json();

      totalItems = data.totalMovies; // Asegúrate de que la API devuelva el total de elementos

      return data.movies;
    } catch (error) {
      console.error("Hubo un problema con la operación fetch:", error);
      return [];
    }
  };

  const renderItems = (movies) => {
    portadas.innerHTML = "";
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.innerHTML = `
            <a href="details.html?id=${movie.id}">
                <div class="card">
                    <img src="${movie.poster_path}" class="card-img-top" alt="${movie.title}" />
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                    </div>
                </div>
            </a>
        `;
      portadas.appendChild(movieElement);
    });

    // pageInfo.textContent = `Página ${currentPage} de ${Math.ceil(
    //   totalItems / itemsPerPage
    // )}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(totalItems / itemsPerPage);
  };

  const loadPage = async (page) => {
    const movies = await fetchItems(page, itemsPerPage);

    renderItems(movies);
  };

  loadPage(currentPage);

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

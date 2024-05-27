addEventListener("DOMContentLoaded", () => {
  apiUrl = "https://codo-movies-backend.onrender.com/api/movie";
  // const apiUrl = "http://localhost:5000/api/movie";

  const loaderContainer = document.querySelector(".loader-container");

  function showLoader() {
    loaderContainer.style.display = "flex";
  }

  function hideLoader() {
    loaderContainer.style.display = "none";
  }

  const itemsPerPage = 12;
  let currentPage = 1;
  let totalItems = 0;

  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");
  const portadas = document.querySelector(".portadas");
  const aclamadas = document.querySelector("#aclamadas");

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

  const fetchItems = async (page, limit, top = false) => {
    showLoader();
    const offset = (page - 1) * limit;
    let url = `${apiUrl}?limit=${limit}&offset=${offset}`;
    top === true
      ? (url = `${apiUrl}?limit=${limit}&offset=${offset}&top=${top}`)
      : (url = url);
    try {
      const response = await fetch(
        // `${apiUrl}?limit=${limit}&offset=${offset}&top=${top}`
        url
      );
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      const data = await response.json();

      totalItems = data.totalMovies; // Asegúrate de que la API devuelva el total de elementos

      return data.movies;
    } catch (error) {
      console.error("Hubo un problema con la operación fetch:", error);
      return [];
    } finally {
      hideLoader();
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

  const renderTopItems = (movies) => {
    aclamadas.innerHTML = "";
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.innerHTML = `
            <a href="details.html?id=${movie.id}">
                <div class="card">
                    <img src="${movie.poster_path}" class="imgAclamada" alt="${movie.title}" />                   
                </div>
            </a>
        `;
      aclamadas.appendChild(movieElement);
    });
  };

  const loadPage = async (page) => {
    const movies = await fetchItems(page, itemsPerPage);
    const topMovies = await fetchItems(page, itemsPerPage, true);
    console.log({ topMovies });

    renderItems(movies);
    renderTopItems(topMovies);
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

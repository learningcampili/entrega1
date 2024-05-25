document.addEventListener("DOMContentLoaded", () => {
  // Función para obtener el ID de la película desde la URL

  const titulo = document.querySelector("#titulo");
  const overview = document.querySelector("#overview");
  const realease = document.querySelector("#realease");
  const runtime = document.querySelector("#runtime");
  const genres = document.querySelector("#genres");
  const crew = document.querySelector("#crew");
  const poster = document.querySelector("#poster");
  const statusData = document.querySelector(".status-data");
  const languageData = document.querySelector(".language-data");
  const budgetData = document.querySelector(".budget-data");
  const revenueData = document.querySelector(".revenue-data");
  const video = document.querySelector("#video");
  const detailsHeader = document.querySelector(".details-header");

  const getMovieIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  };

  const movieId = getMovieIdFromUrl();

  const apiUrl = "https://codo-movies-backend.onrender.com/api/movie";

  function formatNumber(number) {
    // Utiliza el método toLocaleString con las opciones adecuadas para el formato deseado
    return number.toLocaleString("es-ES", {
      minimumFractionDigits: 2, // Asegura que siempre haya al menos 2 decimales
      maximumFractionDigits: 2, // Limita a 2 decimales
    });
  }

  // Función para obtener datos de la API
  const fetchItem = async () => {
    try {
      const response = await fetch(`${apiUrl}/${movieId}`);

      if (!response.ok) {
        window.location.href = "./notfound.html";
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      const movie = await response.json();

      return movie;
    } catch (error) {
      console.error("Hubo un problema con la operación fetch:", error);
      return [];
    }
  };

  const renderItem = (movie) => {
    const newImageUrl = movie.backdrop_path; // Reemplaza esto con la URL de la nueva imagen
    detailsHeader.style.backgroundImage = `url('${newImageUrl}')`;
    titulo.innerHTML = movie.title;
    overview.innerHTML = movie.overview;
    runtime.innerHTML = `${movie.runtime} min`;
    realease.innerHTML = movie.release_date;
    genres.innerHTML = movie.genres.map((genre) => genre.name).join(", ");

    crew.innerHTML = "";
    movie.crew.forEach((person) => {
      const movieElement = document.createElement("div");
      movieElement.innerHTML = `
           <h3>${person.name}</h3>
           <p>${person.job}</p>
        `;
      crew.appendChild(movieElement);
    });

    poster.innerHTML = `<img src="${movie.poster_path}" alt="${movie.title}"/>`;
    statusData.innerHTML = movie.status;
    languageData.innerHTML = movie.original_language;
    budgetData.innerHTML = `$  ${formatNumber(movie.budget)}`;
    revenueData.innerHTML = `$  ${formatNumber(movie.revenue)}`;

    video.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${movie.video}" title="${movie.title}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
  };

  const loadPage = async () => {
    const movie = await fetchItem();

    renderItem(movie);
  };

  loadPage();
});

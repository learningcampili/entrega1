document.addEventListener("DOMContentLoaded", () => {
  // Función para obtener el ID de la película desde la URL
  const getMovieIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  };

  const movieId = getMovieIdFromUrl();
  const apiUrl = `https://codo-movies-backend.onrender.com/api/movie/${movieId}`;

  // Función para obtener datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      const data = await response.json();
      console.log(data);
      // displayData(data);
    } catch (error) {
      console.error("Hubo un problema con la operación fetch:", error);
    }
  };

  fetchData();
});

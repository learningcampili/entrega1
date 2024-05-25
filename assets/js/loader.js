addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://codo-movies-backend.onrender.com/api/movie?limit=12";

  const portadas = document.querySelector(".portadas");

  // Función para obtener datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      const data = await response.json();
      //   console.log(data);
      displayData(data);
    } catch (error) {
      console.error("Hubo un problema con la operación fetch:", error);
    }
  };

  // display data
  const displayData = (movies) => {
    portadas.innerHTML = ""; // Limpiar cualquier contenido previo
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
  };

  fetchData();
});

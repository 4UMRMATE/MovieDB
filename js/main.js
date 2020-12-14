const API = "fd01833c39eff55696dc5120a8934c5a";
const searchBox = document.querySelector("#search-movie");
const resultsBox = document.querySelector("#results-box");
let searchMovie = "";

document.addEventListener("DOMContentLoaded", () => {
  searchBox.addEventListener("keydown", (elem) => {
    if (elem.keyCode >= 65 && elem.keyCode <= 90) {
      searchMovie += elem.key;
    } else if (elem.keyCode === 8) {
      searchMovie = searchMovie.slice(0, -1);
    } else if (elem.keyCode === 32) {
      searchMovie += "+";
    }
    resultsBox.innerHTML = ""; // Reset Results Box
    if (searchMovie != "") {
      fetchMovie(searchMovie);
    }
  });
});

function renderMovies(title, overview, imgSrc) {
  const movie = document.createElement("div");
  movie.className = "movie";

  const movieInfo = document.createElement("div");
  movieInfo.className = "movie-info";
  movieInfo.insertAdjacentHTML(
    "beforeend",
    `<div class="movie-title">${title}</div>
    <br />
    <div class="movie-overview">${overview}</div>`
  );

  // Handle null Image
  if (imgSrc != null) {
    movie.insertAdjacentHTML(
      "beforeend",
      `<a href="https://www.google.com/search?q=${title}" target="_blank"><img class="movie-img" src='https://image.tmdb.org/t/p/original${imgSrc}' alt="movie" /></a>`
    );
  } else {
    movie.insertAdjacentHTML(
      "beforeend",
      `<a href="https://www.google.com/search?q=${title}"><img class="movie-img" src='https://i.pinimg.com/736x/30/d5/38/30d53895b7337958e79aff2e974c7a1f.jpg' alt="movie" /></a>`
    );
  }

  movie.appendChild(movieInfo);
  resultsBox.appendChild(movie);
}

function fetchMovie(movieName) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${movieName}`
  )
    .then((response) => response.json())
    .then((movies) => {
      movies.results.map((movie) => {
        renderMovies(movie.title, movie.overview, movie.backdrop_path);
      });
    })
    .catch((error) => {
      // Do something with error
    });
}

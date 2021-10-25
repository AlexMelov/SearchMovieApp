const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b1633cd8f01f9dc6460c7ce813151df0&page=1";
const API_Series =
  "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=b1633cd8f01f9dc6460c7ce813151df0&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=b1633cd8f01f9dc6460c7ce813151df0&query='";

//get initial movies
const form = document.getElementById("form");
const main = document.getElementById("main");
const search = document.getElementById("search");
const series = document.getElementById("toggleSeries");
const movie = document.getElementById("toggleMovie");

series.addEventListener("click", () => {
  getMovies(API_Series);
});
movie.addEventListener("click", () => {
  getMovies(API_URL);
});

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { titile, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    
        <img
          src="${IMG_PATH + poster_path}"
          alt="${titile}"
        />
        <div class="movie-info">
          <h3>Movie Title</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      
    `;
    main.appendChild(movieEl);
  });
}

//

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

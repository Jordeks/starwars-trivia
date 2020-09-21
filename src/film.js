// const FILMS_URL = `${BASE_URL}/films`;

const filmsBtn = document.querySelector(".films-button")
filmsBtn.addEventListener("click", () => {
  app.innerHTML = ""
  initial();
})

function initial(){
  adapter.getAllFilms()
  .then(renderFilms)
}

function renderFilms(films){
  const filmsList = document.createElement("div")
  app.appendChild(filmsList)
  filmsList.outerHTML = '<div class="films-list">'
  films.forEach(renderFilm)
}

function renderFilm(film){
  const filmsList = document.querySelector(".films-list")
  const div = document.createElement("div")
  addFilmDivContent(div, film)
  filmsList.appendChild(div)
}

function addFilmDivContent(div, film){
  div.classList.add("film-card")
  div.innerHTML = `<p>${film.title}</p>`
}
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
  div.innerHTML = `
  <img class="film-poster" src="${film.poster}" alt=${film.title}/>
  <p class="film-title">Title: ${film.title}</p>
  <p class="release-date">Release Date: ${film.release_date}</p>
  <p class="director">Director: ${film.director}</p>`

  const charactersUl = document.createElement("ul")
  charactersUl.innerText = "Characters:"
  charactersUl.className = "film-characters-ul"
  film.characters.forEach( character => {
    let li = document.createElement("li")
    li.className = "film-characters-li"
    li.innerText = character.name
    charactersUl.appendChild(li)
  })
  div.append(charactersUl)
}
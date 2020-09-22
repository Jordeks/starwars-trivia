/* CHARACTER PLAN
  -refactor with adaptor pattern and class syntax
  -handle catch error from fetch
  -handle validation errors
  -On character's card planet will mouseover to a popup with planet info
  -edit a character has checkboxes for films
  - make an entirely neeew planet with accepts nested attributes for new character

*/

const addButton = document.createElement("button") 
addButton.innerText = "Add a New Character!" 
addButton.id = "add-character-btn"

function addCharButton(){
  app.appendChild(addButton)
}

const charactersButton = document.querySelector(".characters-button")
charactersButton.addEventListener("click", () => {
  app.innerHTML = ""
  fetchCharacters(); 
  addCharButton();
})


addButton.addEventListener("click", () => {
  const modalContent = document.querySelector(".modal-content")
    const form = document.createElement("form")
    adapter.getAllPlanets()
    .then(planets => {
      planets.forEach( planet => {
        let option = document.createElement("option")
        option.textContent = planet.name
        option.value = planet.name
        select.appendChild(option)
      })
    })

    adapter.getAllFilms()
    .then(films => {
      films.forEach( film => {
        filmsCheck.innerHTML += `
    <input class="checks" type="checkbox" id="${film.id}" name="${film.title}">
    <label>${film.title}</label>`
      })
    })

    form.innerHTML = `
      <input type="text" name="name" placeholder="Name..."class="input-text"/>
      <input type="text" name="species" placeholder="Species..."class="input-text"/>`

     const planetDropdown = document.createElement('div')

    const dropdownLabel = document.createElement('label')
    dropdownLabel.innerText = "Choose a Planet:"
    const select = document.createElement('select')
    select.id = "select-planet"
    select.name = "planetName"
     
    planetDropdown.append(dropdownLabel, select)

    const filmsCheck = document.createElement('div') 
    const checkboxLabel = document.createElement('label')
    checkboxLabel.innerText = "Select Films:"
    filmsCheck.append(checkboxLabel)

    const avatarSubmitDiv = document.createElement('div')
     avatarSubmitDiv.className = "avatar-submit-div"
     avatarSubmitDiv.innerHTML =
      `
      <input type="text" name="avatar" placeholder="Image URL..."class="input-text"/>
      <div><input class="submit-button" type="submit" value="Submit"></div>
      <br>`
    modalContent.appendChild(form)
    form.append(planetDropdown, filmsCheck, avatarSubmitDiv)
    modal.style.display = "block"
    
    form.addEventListener("submit", (e) => {
      // debugger
      e.preventDefault()
      const checks = Array.from(e.target.querySelectorAll(".checks"))
      const checkedFilms = checks.filter( film => film.checked )
      let filmIdsArray = checkedFilms.map( film => parseInt(film.id))
      // console.log(filmIdsArray)
     
      const data = {
        name: e.target.name.value,
        species: e.target.species.value,
        planet_name: e.target.planetName.value,
        avatar: e.target.avatar.value,
        film_ids: filmIdsArray
      }
      fetch(`${CHARACTERS_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then( newCharacter => {
          renderCharacter(newCharacter)
          modal.style.display = "none";
          modal.querySelector("form").remove()
      })
    })
})

function fetchCharacters(){
    fetch(CHARACTERS_URL)
    .then(resp => resp.json())
    .then(json => renderCharacters(json)); 
}

function renderCharacters(json){
    const charactersList = document.createElement("div")
    app.appendChild(charactersList)
    charactersList.className = "characters-list"
    json.forEach(character => {
       renderCharacter(character)
    })
}

function renderCharacter(character){
  const charactersList = document.querySelector(".characters-list")
  const div = document.createElement("div")
  addCharacterDivContent(div, character)
  charactersList.appendChild(div)
}

function addCharacterDivContent(div, character){
  div.classList.add("character-card")
  div.innerHTML = `
    <img class="character-avatar" src="${character.avatar}" alt=${character.name}/>
    <p class="character-name"><strong>${character.name}</strong></p>
    <p class="home-planet">Home Planet: ${character.planet.name}</p>
    <p class="species-p">Species: ${character.species}</p>
    `
  const filmUl = document.createElement("ul")
  filmUl.innerText = "Films:"
  filmUl.className = "character-films-ul"
  character.films.forEach( film => {
    let li = document.createElement("li")
    li.className = "character-films-li"
    li.innerText = film.title
    filmUl.appendChild(li)
  })
  div.append(filmUl)
  const editButton = document.createElement("div")
  editButton.className = "edit character-button"
  editButton.innerText = `Edit ${character.name}'s information.`
  editButton.addEventListener("click", () => {
    const modalContent = document.querySelector(".modal-content")
    const form = document.createElement("form")
    form.innerHTML = `
      <label for="name">Name:</label>
      <input type="text" name="name" value="${character.name}"class="input-text"/>
      <label for="name">Species:</label>
      <input type="text" name="species" value="${character.species}"class="input-text"/>
      <label for="name">Home Planet:</label>
      <input type="text" name="planetName" value="${character.planet.name}"class="input-text"/> 
      <label for="name">Image URL:</label>
      <input type="text" name="avatar" value="${character.avatar}"class="input-text"/>
      <input type="submit" value="Submit">
      <br>`

    modalContent.appendChild(form)
    modal.style.display = "block"
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const data = {
        name: e.target.name.value,
        species: e.target.species.value,
        planet_name: e.target.planetName.value,
        avatar: e.target.avatar.value
      }
      fetch(`${CHARACTERS_URL}/${character.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(updatedCharacter => {
        addCharacterDivContent(div, updatedCharacter)
          modal.style.display = "none";
          modal.querySelector("form").remove()
      })
    })
  })
  
  const deleteButton = document.createElement("div")
  deleteButton.className = "delete character-button"
  deleteButton.innerText = `Death to ${character.name}!`
  deleteButton.addEventListener("click", () => {
    fetch(`${CHARACTERS_URL}/${character.id}`, {
      method: "DELETE"
    })
    .then(res=> res.json())
    .then(() => div.remove())
  })
  div.append(editButton, deleteButton)
}
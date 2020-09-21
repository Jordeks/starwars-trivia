/* PLANET PLAN
    -include array of charaters with links to show their individual info? as a popup?
        -may NOT need fetch, just do planet.character.name maybe
        -mini foto, name and species
    -change addPlanetDivContent to be built by js as opposed to innerHTML cause it's ugly as shit
    -refactor to class syntax
*/

function addPlanetButton(){
    const addButton = document.createElement("button")
    addButton.className = "add-planet"
    addButton.innerText = "Be God. Make a Planet."
    addButton.addEventListener("click", () => {
        getModal();
    })
    app.appendChild(addButton)
  }

const planetsBtn = document.querySelector(".planets-button")
planetsBtn.addEventListener("click", () => {
    app.innerHTML = ""
    init();
    addPlanetButton();
})

function init(){
    adapter.getAllPlanets()
    .then(renderPlanets)
}

function renderPlanets(planets){
    const planetsList = document.createElement("div")
    app.appendChild(planetsList)
    planetsList.outerHTML = '<div class="planets-list">'
    planets.forEach(renderPlanet)
}

function renderPlanet(planet){
    const planetsList = document.querySelector(".planets-list")
    const div = document.createElement('div')
    addPlanetDivContent(div, planet)
    planetsList.appendChild(div)
}

function addPlanetDivContent(div, planet){
    div.classList.add("planet-card")
    div.innerHTML = `
    <img class="planet-image" src="${planet.planet_image}" alt=${planet.name}/>
    <p class="planet-name"><strong>${planet.name}</strong></p>
    <p class="planet-population">Population: ${planet.population}</p>
    `
    const climateDiv = document.createElement('div')
    climateDiv.innerHTML = `
    <p class="planet-climate">Climate: ${planet.climate}</p>
    <img class="env-image" src="${planet.env_image}" alt=${planet.name}/>
    `
    const ul = document.createElement("ul")
    ul.className = "planet-characters-ul"
    ul.innerText = "Characters from this planet:"
    planet.characters.forEach(char => {
        let li = document.createElement("li")
        li.className = "planet-characters-li"
        li.innerText = char.name
        ul.appendChild(li)
    })
    div.append(ul, climateDiv)
}

function getModal(){
    const modalContent = document.querySelector(".modal-content")
    const form = document.createElement("form")
    form.className = "modal-form"
    form.innerHTML = `
    <input type="text" name="name" placeholder="Name..."class="input-text"/>
    <input type="text" name="climate" placeholder="Climate..."class="input-text"/>
    <input type="text" name="planet_image" placeholder="Planet URL..."class="input-text"/>
    <input type="text" name="env_image" placeholder="Planet Environment URL..."class="input-text"/>
    <input type="text" name="population" placeholder="Population..."class="input-text"/>
    <div><input class="submit-button" type="submit" value="Submit"></div>
    <br>`
    modal.style.display = "block"
    modalContent.appendChild(form)
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        adapter.addPlanet(e.target)
        .then(data => {
            renderPlanet(data)
            modal.style.display = "none";
            modal.querySelector("form").remove()
        })
    })
}




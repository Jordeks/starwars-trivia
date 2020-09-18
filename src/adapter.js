const PLANETS_URL = `${BASE_URL}/planets`;

const adapter = {
  getAllPlanets: function(){
    return fetch(PLANETS_URL)
    .then(res => res.json())
  },
  addPlanet: function(target){
    const data = {
      name: target.name.value,
      climate: target.climate.value,
      planet_image: target.planet_image.value,
      env_image: target.env_image.value,
      population: target.population.value
    }
    return fetch(PLANETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
  }
}
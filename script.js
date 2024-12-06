const solen = document.querySelector('.solen')
const merkurius = document.querySelector('.merkurius')
const venus = document.querySelector('.venus')
const jorden = document.querySelector('.jorden')
const mars = document.querySelector('.mars')
const jupiter = document.querySelector('.jupiter')
const saturnus = document.querySelector('.saturnus')
const uranus = document.querySelector('.uranus')
const neptunus = document.querySelector('.neptunus')

const planets = [solen, merkurius, venus, jorden, mars, jupiter, saturnus, uranus, neptunus]


/*Fetch the API key*/
/*async function fetchApiKey() - before making it an arrow func*/
const fetchApiKey = async () => {
  const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
    method: 'POST'
  })

  const data = await response.json() //Creates a promise
  //console.log(data)
  const apiKey = data.key //Saves the promise value in a variable
  return apiKey //To be able to use it later in fetchPlanetData
}

/*Fetch Solar system information*/
/*async function fetchPlanetData (apiKey) - before making it an arrow func*/
const fetchPlanetData = async (apiKey) => {
  const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
    method: 'GET',
    headers: {'x-zocom': apiKey}
  })
  
  const data = await response.json() //Creates a promise
  //console.log(data)
  const solarInfo = data.bodies //Saves the promise value in a valuable
  return solarInfo //To be able to use it later in fetchAndDisplayPlanetData
}


//Display the fetched planets info
const fetchAndDisplayPlanetData = async () => {
  //Calling and saving the API key in a variable
  const apiKey = await fetchApiKey()

  //Calling and saving the planets info using the API key in a variable
  let planetData = await fetchPlanetData(apiKey)

  //Loop through the fetched data, since both fetched data and array of planets have just as many indexes, only one loop is needed
  for (let i = 0; i < planetData.length; i++) {
    
    const currentPlanetData = planetData[i]
    const currentPlanet = planets[i]
    //console.log(currentPlanetData) - See fetched data names


    //If indexes match print out this to querySelected classes in HTML
    if (currentPlanet) {

      currentPlanet.addEventListener('click', () => {
      document.querySelector('.planet-name').textContent = `${currentPlanetData.name}`
      document.querySelector('.planet-latin-name').textContent = `${currentPlanetData.latinName}`
      document.querySelector('.planet-description').textContent = `${currentPlanetData.desc}`
      document.querySelector('.planet-circumference').textContent = `${currentPlanetData.circumference} KM`
      document.querySelector('.planet-distance').textContent = `${currentPlanetData.distance} KM`
      document.querySelector('.planet-max-temp').textContent = `${currentPlanetData.temp.day} C`
      document.querySelector('.planet-min-temp').textContent = `${currentPlanetData.temp.night} C`
      document.querySelector('.planet-moons').textContent = `${currentPlanetData.moons.join(', ')}`


      //If the planet has no moons print out this
      if (currentPlanetData.moons.length === 0) {
        document.querySelector('.planet-moons').textContent = `${currentPlanetData.name} har inga månar`
    }

    //Decide which CSS class is displayed based on te chosen planet index
      let planetImage = document.querySelector('.planet')

      if( i === 0) {
        planetImage.classList.remove('planet')
        planetImage.classList.add('solen-clicked')
      } else if (i === 1){
        planetImage.classList.remove('planet')
        planetImage.classList.add('merkurius-clicked')
      } else if (i === 2){
        planetImage.classList.remove('planet')
        planetImage.classList.add('venus-clicked')
      } else if (i === 3){
        planetImage.classList.remove('planet')
        planetImage.classList.add('jorden-clicked')
      } else if (i === 4){
        planetImage.classList.remove('planet')
        planetImage.classList.add('mars-clicked')
      } else if (i === 5){
        planetImage.classList.remove('planet')
        planetImage.classList.add('jupiter-clicked')
      } else if (i === 6){
        planetImage.classList.remove('planet')
        planetImage.classList.add('saturnus-clicked')
      } else if (i === 7){
        planetImage.classList.remove('planet')
        planetImage.classList.add('uranus-clicked')
      } else if (i === 8){
        planetImage.classList.remove('planet')
        planetImage.classList.add('neptunus-clicked')
      }

      //Change visibility to planet-container when a planet is clicked
      document.querySelector('.container').style.display = 'none'
      document.querySelector('.planet-container').style.display = 'flex'
    })
    }
  }
}

//Call the function for everything to work
fetchAndDisplayPlanetData()
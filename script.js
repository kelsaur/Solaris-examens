const solen = document.querySelector('.Solen')
const merkurius = document.querySelector('.Merkurius')
const venus = document.querySelector('.Venus')
const jorden = document.querySelector('.Jorden')
const mars = document.querySelector('.Mars')
const jupiter = document.querySelector('.Jupiter')
const saturnus = document.querySelector('.Saturnus')
const uranus = document.querySelector('.Uranus')
const neptunus = document.querySelector('.Neptunus')

const planetSections = document.querySelectorAll('.container section') //To loop through each section class
const allPlanets = document.querySelector('.container') //To hide the planets altogether
const planets = [solen, merkurius, venus, jorden, mars, jupiter, saturnus, uranus, neptunus] //To get info which planet is clicked on

/*Fetch the API key*/
/*async function fetchApiKey()*/
const fetchApiKey = async () => {
  const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
    method: 'POST'
  })

  const data = await response.json()
  const apiKey = data.key
  return apiKey
}

/*Fetch Solar system information*/
/*async function getSolarInformation (apiKey)*/
const getSolarInfo = async (apiKey) => {
  const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
    method: 'GET',
    headers: {'x-zocom': apiKey}
  })
  
  const data = await response.json()
  const solarInfo = data.bodies
  return solarInfo
}

// Function to display planet info based on the clicked planet class
const displaySolarInfo = async (planetClass) => {
  const apiKey = await fetchApiKey()
  console.log(`The API key is: ${apiKey}`) // Log the API key after it is returned
  
  const solarInfo = await getSolarInfo(apiKey) //Fetched information
  
  for (let i = 0; i < solarInfo.length; i++) { //Loops through the whole API fetch object, returns each id as it's own object
    const body = solarInfo[i]
    console.log(body) //Writes out each planet as it's own object
    //console.log(`ID: ${body.id}, Name: ${body.name}, Type: ${body.type}, Latin name: ${body.latinName}, Längd på dygn: ${body.rotation}, Omkrets: ${body.circumference}, Temperatur på dagen: ${body.temp.day}, Temperatur på natten: ${body.temp.night}, Distans från solen: ${body.distance}, Jorddygn runt solen: ${body.orbitalPeriod}, Beskrivning: ${body.desc}, Månar: ${body.moons}`)
  
  if(body.name.toLowerCase() === planetClass.toLowerCase()) {
      document.querySelector('.planet-name').textContent = `${body.name}`
      document.querySelector('.planet-latin-name').textContent = `${body.latinName}`
      document.querySelector('.planet-description').textContent = `${body.desc}`
      document.querySelector('.planet-circumference').textContent = `${body.circumference}`
      document.querySelector('.planet-distance').textContent = `${body.distance}`
      document.querySelector('.planet-max-temp').textContent = `${body.temp.day}`
      document.querySelector('.planet-min-temp').textContent = `${body.temp.night}`
      document.querySelector('.planet-moons').textContent = `${body.moons}`
      
  }

  }
  return solarInfo
}


//When clicked on a planet, the rest of the planets are hidden and only chosen planet is shown.
for(let i = 0; i < planetSections.length; i++) {
planetSections[i].addEventListener('click', () => {
  const planetName = planets[i].className
  console.log(`Planet clicked is: ${planetName}`)
  displaySolarInfo(planetName)


  allPlanets.style.display = 'none'
  document.querySelector('.planet-container').style.display = 'flex'
})
}
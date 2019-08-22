import { itemList, planets } from './constants'
import uuidv4 from 'uuid/v4'

const getPlanetName = () => {
  const planet = planets[Math.floor(Math.random() * planets.length)]
  return planet
}

export const generateItems = possibleDestinations => {
  const items = []

  for (let i = 0; i < 5; i++) {
    const destinationPlanet =
      possibleDestinations[
        Math.floor(Math.random() * possibleDestinations.length)
      ]

    const item = Object.assign(
      {},
      itemList[Math.floor(Math.random() * itemList.length)],
      {
        id: uuidv4(),
        destination: {
          name: destinationPlanet.name,
          value: destinationPlanet.location
        }
      }
    )
    items.push(item)
  }
  return items
}

export const generatePlanets = () => {
  const planets = []

  for (let i = 0; i < 3; i++) {
    const isHomePlanet = i === 0
    const location = Math.floor(Math.random() * 100 + 1)
    const name = getPlanetName()

    planets.push({ isHomePlanet, location, name })
  }

  planets.forEach(planet => {
    planet.items = generateItems(
      planets.filter(currentPlanet => currentPlanet !== planet)
    )
  })

  return planets
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.error(error)
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.error(error)
  }
}

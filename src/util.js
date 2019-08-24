import { itemList, planets } from './constants'
import uuidv4 from 'uuid/v4'
import moment from 'moment'

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
        },
        quantity: 10
      }
    )
    items.push(item)
  }
  return items
}

export const generatePlanets = () => {
  const planets = []

  for (let i = 0; i < 3; i++) {
    const id = uuidv4()
    const isHomePlanet = i === 0
    const location = Math.floor(Math.random() * 100 + 1)
    const name = getPlanetName()

    planets.push({ id, isHomePlanet, location, name })
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

export const createDuration = () => {
  const deadline = moment().minutes(60)
  const now = moment()

  const minutesLeft = deadline
    .clone()
    .subtract(now.minutes(), 'minutes')
    .minutes()
  const secondsLeft = 60 - now.seconds()

  return moment.duration({ minutes: minutesLeft, seconds: secondsLeft })
}

export const createTravelDuration = (destination, ship) => {
  const distance = Math.abs(destination.value - ship.location.value)
  const seconds = distance * 10

  return moment.duration({ seconds })
}

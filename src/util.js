import { itemList, planets, firstNames, lastNames, colors } from './constants'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import { saveAs } from 'file-saver'

/**
 * Gets a name of a planet.
 * @returns {string}
 */
const getPlanetName = () => {
  const planet = planets[Math.floor(Math.random() * planets.length)]
  return planet
}

/**
 * Generates an array of item objects randomly.
 * @param {array} possibleDestinations Array of possible destinations where the items could be going.
 * @returns {array}
 */
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
        price: Math.ceil(Math.random() * 10),
        quantity: Math.ceil(Math.random() * 10)
      }
    )
    items.push(item)
  }
  return items
}

/**
 * Generataes an array of planet objects randomly.
 * @returns {array}
 */
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

/**
 * Loads the state of the application from localStorage if present.
 * @returns {object}
 */
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

/**
 * Saves the application state in localStorage.
 * @param {object} state State of the application.
 */
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Creates a moment ETA for the ship to get to its destination.
 * @param {object} destination Destination object.
 * @param {object} ship Ship object.
 * @returns {moment}
 */
export const createETA = (destination, ship) => {
  const distance = Math.abs(destination.value - ship.location.value)
  const seconds = distance * 10
  const eta = moment()
  eta.add(seconds, 'seconds')
  eta.millisecond(0)

  return eta
}

/**
 * Creates a moment duration in the difference of time from now to the ETA.
 * @param {Unix Millisecond Timestamp} eta Timestamp.
 * @returns {duration}
 */
export const createDiffDuration = eta => {
  const now = moment()
  now.millisecond(0)
  const differenceMill = moment(eta, 'x').diff(now)

  return moment.duration({ milliseconds: differenceMill })
}

const generateName = () =>
  `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`

const generateBuyer = planets => ({
  color: getRandomItem(colors),
  id: uuidv4(),
  name: generateName(),
  price: Math.ceil(Math.random() * 10),
  location: getRandomItem(planets),
  jumps: Math.ceil(Math.random() * 10),
  item: getRandomItem(itemList)
})

const generateSeller = planets => ({
  color: getRandomItem(colors),
  id: uuidv4(),
  name: generateName(),
  price: Math.ceil(Math.random() * 10),
  location: getRandomItem(planets),
  jumps: Math.ceil(Math.random() * 10),
  item: getRandomItem(itemList)
})

export const generateBuyers = planets => {
  const buyers = []

  for (let i = 0; i < 100; i++) {
    buyers.push(generateBuyer(planets))
  }

  return buyers
}

export const generateSellers = planets => {
  const sellers = []

  for (let i = 0; i < 100; i++) {
    sellers.push(generateSeller(planets))
  }

  return sellers
}

/**
 * Exports the game state as a JSON file.
 */
export const exportGame = () => {
  const state = loadState()
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: 'application/json'
  })
  if (window.Cypress) {
    localStorage.setItem('exportedGame', blob)
    return
  }
  saveAs(blob, 'hermes.json')
}

/**
 * Checks if a millisecond timestamp is from a date that is in the past.
 * @param {String} x Millisecond timestamp.
 * @returns {Boolean}
 */
export const isInPast = x => {
  const now = moment()
  const then = moment(x, 'x')
  return now.diff(then) > 0
}

/**
 * Comparison function.
 * @param {Any} a First item
 * @param {Any} b Second item
 */
export const simpleCompare = (a, b) => {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  }
  return 0
}

export const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)]

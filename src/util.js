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

export const createETA = (destination, ship) => {
  const distance = Math.abs(destination.value - ship.location.value)
  const seconds = distance * 10
  const eta = moment()
  eta.add(seconds, 'seconds')
  eta.millisecond(0)

  return eta
}

export const createDiffDuration = eta => {
  const now = moment()
  now.millisecond(0)
  const differenceMill = moment(eta, 'x').diff(now)

  return moment.duration({ milliseconds: differenceMill })
}

export const generateContracts = () => {
  const contracts = []

  for (let i = 0; i < 5; i++) {
    const itemType = itemList[Math.floor(Math.random() * itemList.length)].name
    const contract = {
      id: uuidv4(),
      itemType,
      value: itemList.find(item => item.name === itemType).value + 1,
      volume: itemList.find(item => item.name === itemType).volume
    }
    contracts.push(contract)
  }

  return contracts
}

export const travelTimerLogic = (ship, setTimeLeft, handleTimerStopped) => {
  if (ship.isShipTraveling) {
    const travelTimer = setInterval(() => {
      const diffDuration = createDiffDuration(ship.destination.eta)

      diffDuration.subtract(1, 'second')

      if (diffDuration.asMilliseconds() === 0) {
        clearInterval(travelTimer)
        handleTimerStopped(ship)
      }

      setTimeLeft(diffDuration)
    }, 1000)
  }
}

export const itemTimerLogic = (
  world,
  setTimeLeft,
  handleTimerStarted,
  handleTimerStopped
) => {
  const { isTimerRunning } = world

  let duration = createDuration()

  if (!isTimerRunning) {
    handleTimerStarted()
    let timer = setInterval(() => {
      duration.subtract(1, 'second')
      setTimeLeft(`${duration.minutes()} minutes ${duration.seconds()} seconds`)
      if (duration.asMilliseconds() === 0) {
        clearInterval(timer)
        handleTimerStopped()
      }
    }, 1000)
  }
}

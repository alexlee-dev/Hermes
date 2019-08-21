import { itemList, planets } from './constants'
import uuidv4 from 'uuid/v4'

const getPlanetName = () => {
  const planet = planets[Math.floor(Math.random() * planets.length)]
  return planet
}

export const generatePlanets = () => {
  const planets = []

  for (let i = 0; i < 3; i++) {
    const isHomePlanet = i === 0
    const items = []
    const location = Math.floor(Math.random() * 100 + 1)
    const name = getPlanetName()

    for (let j = 0; j < 5; j++) {
      const item = Object.assign(
        {},
        itemList[Math.floor(Math.random() * itemList.length)],
        { id: uuidv4() }
      )
      items.push(item)
    }

    planets.push({ isHomePlanet, items, location, name })
  }

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

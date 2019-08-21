import { itemList, planets } from './constants'
import { storePlanets } from './redux/actions/world'
import uuidv4 from 'uuid/v4'

const getPlanetName = () => {
  const planet = planets[Math.floor(Math.random() * planets.length)]
  return planet
}

/**
 * Generates a planet with a name and stores it in Redux.
 * @param dispatch
 */
export const generatePlanets = (dispatch, setStoragePlanets) => {
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

  dispatch(storePlanets(planets))
  setStoragePlanets(planets)
}

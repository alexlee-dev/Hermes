import { itemList, planets } from './constants'
import { storePlanets } from './redux/actions/world'

const getPlanetName = () => {
  const planet = planets[Math.floor(Math.random() * planets.length)]
  return planet.name
}

/**
 * Generates a planet with a name and stores it in Redux.
 * @param dispatch
 */
export const generatePlanets = (dispatch, setStoragePlanets) => {
  const planets = []

  for (let i = 0; i < 3; i++) {
    const items = []
    const name = getPlanetName()

    for (let j = 0; j < 5; j++) {
      const item = itemList[Math.floor(Math.random() * itemList.length)]
      items.push(item)
    }

    planets.push({ items, name })
  }

  dispatch(storePlanets(planets))
  setStoragePlanets(planets)
}

import { itemList, planets } from './constants'
import { storePlanet } from './redux/actions/world'

const getPlanetName = () => {
  const planet = planets[Math.floor(Math.random() * planets.length)]
  return planet.name
}

/**
 * Generates a planet with a name and stores it in Redux.
 * @param dispatch
 */
export const generatePlanet = dispatch => {
  const items = []
  const name = getPlanetName()

  for (let i = 0; i < 5; i++) {
    const item = itemList[Math.floor(Math.random() * itemList.length)]
    items.push(item)
  }

  dispatch(storePlanet({ items, name }))
}

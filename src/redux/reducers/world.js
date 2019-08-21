import { generateItems } from '../../util'

const worldDefaultState = {
  isTimerRunning: false,
  planets: []
}

export default (state = worldDefaultState, action) => {
  switch (action.type) {
    case 'CLEAR_ITEMS':
      const newPlanets = [...state.planets]

      newPlanets.forEach(planet => {
        planet.items = []
      })

      return { ...state, planets: newPlanets }
    case 'REFRESH_ITEMS':
      const additionalPlanets = [...state.planets]

      additionalPlanets.forEach(planet => {
        planet.items = generateItems()
      })

      return { ...state, planets: additionalPlanets }
    case 'SET_PLANETS':
      const { planets } = action.payload

      return { ...state, planets }
    case 'SET_TIMER_RUNNING':
      const { isTimerRunning } = action.payload

      return { ...state, isTimerRunning }
    case 'REMOVE_ITEM':
      const { item } = action.payload

      const updatedPlanets = []

      state.planets.forEach(planet => {
        const { isHomePlanet, items, location, name } = planet
        const planetContainsItem = items.includes(item)
        if (planetContainsItem) {
          const itemIndex = items.findIndex(currentItem => item === currentItem)
          const newItems = Array.from(items)
          newItems.splice(itemIndex, 1)

          const newPlanetObj = {
            isHomePlanet,
            items: newItems,
            location,
            name
          }
          updatedPlanets.push(newPlanetObj)
        } else {
          updatedPlanets.push(planet)
        }
      })

      return { ...state, planets: updatedPlanets }
    default:
      return state
  }
}

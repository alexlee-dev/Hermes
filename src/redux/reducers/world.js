import { generateItems } from '../../util'

const worldDefaultState = {
  isTimerRunning: false,
  planets: []
}

export default (state = worldDefaultState, action) => {
  switch (action.type) {
    case 'CLEAR_ITEMS':
      return {
        ...state,
        planets: state.planets.map(planet => ({ ...planet, items: [] }))
      }
    case 'REFRESH_ITEMS':
      return {
        ...state,
        planets: state.planets.map(planet => ({
          ...planet,
          items: generateItems(state.planets)
        }))
      }
    case 'REMOVE_ITEM':
      const { item, quantity } = action.payload

      const updatedPlanets = state.planets.map(planet => {
        const { isHomePlanet, items, location, name } = planet

        if (planet.items.includes(item)) {
          // * This plaanet has the item in question
          // * Figure out if all of the quantity needs to be removed

          if (quantity === item.quantity) {
            // * All of the item should be removed
            return {
              isHomePlanet,
              items: items.filter(currentItem => item !== currentItem),
              location,
              name
            }
          } else {
            // * Only some of the item quantity should be removed
            const updatedItems = items.map(currentItem => {
              if (item.id === currentItem.id) {
                // * figure out quantity
                return {
                  ...currentItem,
                  quantity: currentItem.quantity - quantity
                }
              } else {
                return currentItem
              }
            })

            return {
              isHomePlanet,
              items: updatedItems,
              location,
              name
            }
          }
        } else {
          return planet
        }
      })

      return { ...state, planets: updatedPlanets }
    case 'SET_PLANETS':
      return { ...state, planets: action.payload.planets }
    case 'SET_TIMER_RUNNING':
      return { ...state, isTimerRunning: action.payload.isTimerRunning }
    default:
      return state
  }
}

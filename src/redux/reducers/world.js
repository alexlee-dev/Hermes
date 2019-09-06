import { generateItems } from '../../util'

const worldDefaultState = {
  contracts: [],
  isTimerRunning: false,
  planets: []
}

export default (state = worldDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CONTRACT':
      state.contracts.push(action.payload.contract)
      return { ...state, contracts: state.contracts }
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
    case 'REMOVE_CONTRACT':
      const itemIndex = state.contracts.indexOf(
        contract => contract.id === action.payload.id
      )
      const updatedContracts = Array.from(state.contracts)
      updatedContracts.splice(itemIndex, 1)

      return { ...state, contracts: updatedContracts }
    case 'REPLACE_WORLD':
      return { ...action.payload.world }
    case 'SET_CONTRACT_TIMEOUT_CREATED':
      const contract = state.contracts.find(
        ({ id }) => id === action.payload.id
      )
      contract.timeoutCreated = action.payload.timeoutCreated

      return state
    case 'SET_CONTRACTS':
      return { ...state, contracts: action.payload.contracts }
    case 'SET_PLANETS':
      return { ...state, planets: action.payload.planets }
    case 'SET_TIMER_RUNNING':
      return { ...state, isTimerRunning: action.payload.isTimerRunning }
    default:
      return state
  }
}

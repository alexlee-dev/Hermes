const shipDefaultState = {
  cargo: {
    items: [],
    volumeRemaining: 10 // m³
  },
  destination: null,
  isShipTraveling: false,
  location: {
    name: null,
    value: null
  }
}

export default (state = shipDefaultState, action) => {
  switch (action.type) {
    case 'REMOVE_CARGO':
      return {
        ...state,
        cargo: {
          ...state.cargo,
          items: state.cargo.items.filter(
            item => item.id !== action.payload.item.id
          ),
          volumeRemaining:
            state.cargo.volumeRemaining + action.payload.item.quantity
        }
      }
    case 'SET_DESTINATION':
      return { ...state, destination: action.payload.destination }
    case 'SET_ETA':
      return {
        ...state,
        destination: { ...state.destination, eta: action.payload.eta }
      }
    case 'SET_SHIP_LOCATION':
      return {
        ...state,
        location: action.payload.location
      }
    case 'SET_SHIP_TRAVELING':
      return { ...state, isShipTraveling: action.payload.isShipTraveling }
    case 'SET_TRAVEL_DURATION':
      return { ...state, travelDuration: action.payload.travelDuration }
    case 'STORE_CARGO':
      let updatedItems = state.cargo.items.map(currentItem => {
        if (action.payload.item.id === currentItem.id) {
          // * This item is the same, and you should just add the quantity
          return {
            ...currentItem,
            quantity: currentItem.quantity + action.payload.quantity
          }
        } else {
          // * This currentItem is different, and you should return the currentItem
          return currentItem
        }
      })

      if (
        !updatedItems.find(
          currentItem => currentItem.id === action.payload.item.id
        )
      ) {
        updatedItems.push({
          ...action.payload.item,
          quantity: action.payload.quantity
        })
      }

      return {
        ...state,
        cargo: {
          ...state.cargo,
          items: updatedItems,
          volumeRemaining: state.cargo.volumeRemaining - action.payload.quantity
        }
      }
    default:
      return state
  }
}

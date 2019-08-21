const shipDefaultState = {
  cargo: [],
  location: {
    name: null,
    value: null
  }
}

export default (state = shipDefaultState, action) => {
  switch (action.type) {
    case 'SET_SHIP_LOCATION_VALUE':
      return {
        ...state,
        location: { ...state.location, value: action.payload.value }
      }
    case 'SET_SHIP_LOCATION_NAME':
      return {
        ...state,
        location: { ...state.location, name: action.payload.name }
      }
    case 'STORE_CARGO':
      return { ...state, cargo: [...state.cargo, action.payload.item] }
    case 'REMOVE_CARGO':
      const itemIndex = state.cargo.findIndex(
        item => item.id === action.payload.item.id
      )

      const newCargo = Array.from(state.cargo)
      newCargo.splice(itemIndex, 1)

      return { ...state, cargo: newCargo }
    default:
      return state
  }
}

const shipDefaultState = {
  cargo: [],
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
        cargo: state.cargo.filter(item => item.id !== action.payload.item.id)
      }
    case 'SET_SHIP_LOCATION_NAME':
      return {
        ...state,
        location: { ...state.location, name: action.payload.name }
      }
    case 'SET_SHIP_LOCATION_VALUE':
      return {
        ...state,
        location: { ...state.location, value: action.payload.value }
      }
    case 'STORE_CARGO':
      return { ...state, cargo: [...state.cargo, action.payload.item] }
    default:
      return state
  }
}

const shipDefaultState = {
  cargo: []
}

export default (state = shipDefaultState, action) => {
  switch (action.type) {
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

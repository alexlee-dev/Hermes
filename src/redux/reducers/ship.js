const shipDefaultState = {
  cargo: []
}

export default (state = shipDefaultState, action) => {
  switch (action.type) {
    case 'STORE_CARGO':
      const { item } = action.payload

      return Object.assign({}, state, { cargo: [...state.cargo, item] })
    case 'SET_SHIP':
      const { ship } = action.payload
      return ship
    default:
      return state
  }
}

const userDefaultState = {
  cash: 100
}

export default (state = userDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CASH':
      return { ...state, cash: state.cash + action.payload.amount }
    case 'REMOVE_CASH':
      return { ...state, cash: state.cash - action.payload.amount }
    case 'REPLACE_USER':
      return { ...action.payload.user }
    case 'RESET_USER':
      return userDefaultState
    default:
      return state
  }
}

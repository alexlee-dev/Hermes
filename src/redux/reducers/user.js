const userDefaultState = {
  cash: 100,
  contract: null
}

export default (state = userDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CASH':
      return { ...state, cash: state.cash + action.payload.amount }
    case 'REMOVE_CASH':
      return { ...state, cash: state.cash - action.payload.amount }
    case 'REPLACE_USER':
      return { ...action.payload.user }
    case 'RESET_CONTRACT':
      return { ...state, contract: null }
    case 'SET_CONTRACT':
      return { ...state, contract: action.payload.contract }
    default:
      return state
  }
}

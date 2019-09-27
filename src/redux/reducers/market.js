const marketDefaultState = {
  buyers: [],
  sellers: []
}

export default (state = marketDefaultState, action) => {
  switch (action.type) {
    case 'SET_BUYERS':
      return { ...state, buyers: action.payload.buyers }
    case 'SET_SELLERS':
      return { ...state, sellers: action.payload.sellers }
    case 'RESET_MARKET':
      return marketDefaultState
    default:
      return state
  }
}

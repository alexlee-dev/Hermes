const uiDefaultState = {
  view: 'Ship'
}

export default (state = uiDefaultState, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload.view }
    default:
      return state
  }
}

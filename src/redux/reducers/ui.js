const uiDefaultState = {
  view: 'Ship'
}

export default (state = uiDefaultState, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      const { view } = action.payload
      return { ...state, view }
    default:
      return state
  }
}

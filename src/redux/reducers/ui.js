const uiDefaultState = {
  isCreatingContract: false,
  view: 'Ship'
}

export default (state = uiDefaultState, action) => {
  switch (action.type) {
    case 'SET_IS_CREATING_CONTRACT':
      return { ...state, isCreatingContract: action.payload.isCreatingContract }
    case 'SET_VIEW':
      return { ...state, view: action.payload.view }
    default:
      return state
  }
}

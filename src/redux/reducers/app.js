const appDefaultState = {
  isExampleAction: false
}

export default (state = appDefaultState, action) => {
  switch (action.type) {
    case 'EXAMPLE_ACTION':
      const { isExampleAction } = action.payload
      return Object.assign({}, state, { isExampleAction })
    default:
      return state
  }
}

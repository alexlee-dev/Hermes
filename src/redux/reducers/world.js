const worldDefaultState = {
  planets: []
}

export default (state = worldDefaultState, action) => {
  switch (action.type) {
    case 'STORE_PLANETS':
      const { planets } = action.payload

      return Object.assign({}, worldDefaultState, { planets })
    default:
      return state
  }
}

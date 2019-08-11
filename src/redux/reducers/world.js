const worldDefaultState = {
  planets: []
}

export default (state = worldDefaultState, action) => {
  switch (action.type) {
    case 'STORE_PLANET':
      const { planet } = action.payload
      const planetsCopy = Array.from(state.planets)
      planetsCopy.push(planet)
      return Object.assign({}, worldDefaultState, { planets: planetsCopy })
    default:
      return state
  }
}

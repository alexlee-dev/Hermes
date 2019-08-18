const shipDefaultState = {
  cargo: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }]
}

export default (state = shipDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

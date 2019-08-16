const worldDefaultState = {
  isTimerRunning: false,
  planets: []
}

export default (state = worldDefaultState, action) => {
  switch (action.type) {
    case 'STORE_PLANETS':
      const { planets } = action.payload

      return Object.assign({}, state, { planets })
    case 'SET_TIMER_RUNNING':
      const { isTimerRunning } = action.payload

      return Object.assign({}, state, { isTimerRunning })
    default:
      return state
  }
}

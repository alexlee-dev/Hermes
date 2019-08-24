// * ACTION TYPES
const CLEAR_ITEMS = 'CLEAR_ITEMS'
const REFRESH_ITEMS = 'REFRESH_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const SET_PLANETS = 'SET_PLANETS'
const SET_TIMER_RUNNING = 'SET_TIMER_RUNNING'

// * ACTION GENERATORS
export const clearItems = () => ({ type: CLEAR_ITEMS })

export const refreshItems = () => ({ type: REFRESH_ITEMS })

export const removeItem = (item, quantity) => ({
  type: REMOVE_ITEM,
  payload: {
    item,
    quantity
  }
})

export const setPlanets = planets => ({
  type: SET_PLANETS,
  payload: { planets }
})

export const setTimerRunning = isTimerRunning => ({
  type: SET_TIMER_RUNNING,
  payload: { isTimerRunning }
})

// * PROMISES

// * THUNKS

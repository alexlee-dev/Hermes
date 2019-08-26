// * ACTION TYPES
const CLEAR_ITEMS = 'CLEAR_ITEMS'
const REFRESH_ITEMS = 'REFRESH_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const SET_PLANETS = 'SET_PLANETS'
const SET_TIMER_RUNNING = 'SET_TIMER_RUNNING'

// * ACTION GENERATORS
/**
 * Removes all items from planets.
 */
export const clearItems = () => ({ type: CLEAR_ITEMS })

/**
 * Refreshes the items on planets.
 */
export const refreshItems = () => ({ type: REFRESH_ITEMS })

/**
 * Removes an item from the list of items on a planet.
 * @param {object} item Item to be removed.
 * @param {number} quantity Quantity of item to be removed.
 */
export const removeItem = (item, quantity) => ({
  type: REMOVE_ITEM,
  payload: {
    item,
    quantity
  }
})

/**
 * Sets the planet objects in the world.
 * @param {array} planets Array of planets.
 */
export const setPlanets = planets => ({
  type: SET_PLANETS,
  payload: { planets }
})

/**
 * Sets if the item timer is running.
 * @param {boolean} isTimerRunning Is the item timer running?
 */
export const setTimerRunning = isTimerRunning => ({
  type: SET_TIMER_RUNNING,
  payload: { isTimerRunning }
})

// * PROMISES

// * THUNKS

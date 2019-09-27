import { setShipLocation, resetShip } from './ship'
import {
  generateBuyers,
  generatePlanets,
  generateSellers
} from '../../util/main'
import { setBuyers, setSellers, resetMarket } from './market'
import { resetUser } from './user'
import { resetUI } from './ui'

// * ACTION TYPES
const CLEAR_ITEMS = 'CLEAR_ITEMS'
const REFRESH_ITEMS = 'REFRESH_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const REPLACE_WORLD = 'REPLACE_WORLD'
const SET_PLANETS = 'SET_PLANETS'
const SET_TIMER_RUNNING = 'SET_TIMER_RUNNING'
const RESET_WORLD = 'RESET_WORLD'

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
 * Replaces entire World.
 * @param {Object} world World object from Redux store.
 */
export const replaceWorld = world => ({
  type: REPLACE_WORLD,
  payload: { world }
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

export const resetWorld = () => ({ type: RESET_WORLD })

// * PROMISES

// * THUNKS
/**
 * Sets the planets, and ship location initially.
 */
export const initializeApplication = () => dispatch => {
  const planets = generatePlanets()
  const homePlanet = planets.find(planet => planet.isHomePlanet === true)
  const location = { name: homePlanet.name, value: homePlanet.location }
  const buyers = generateBuyers(planets)
  const sellers = generateSellers(planets)

  dispatch(setPlanets(planets))
  dispatch(setShipLocation(location))
  dispatch(setBuyers(buyers))
  dispatch(setSellers(sellers))
}

export const resetState = () => dispatch => {
  dispatch(resetMarket())
  dispatch(resetShip())
  dispatch(resetUI())
  dispatch(resetUser())
  dispatch(resetWorld())
  dispatch(initializeApplication())
}

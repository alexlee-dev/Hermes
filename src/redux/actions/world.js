import { setShipLocation } from './ship'
import {
  createDiffDuration,
  generateBuyers,
  generatePlanets,
  generateContracts,
  generateSellers,
  isInPast
} from '../../util'
import { setIsCreatingContract } from './ui'
import { setBuyers, setSellers } from './market'

// * ACTION TYPES
const ADD_CONTRACT = 'ADD_CONTRACT'
const CLEAR_ITEMS = 'CLEAR_ITEMS'
const REFRESH_ITEMS = 'REFRESH_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const REMOVE_CONTRACT = 'REMOVE_CONTRACT'
const REPLACE_WORLD = 'REPLACE_WORLD'
const SET_CONTRACT_TIMEOUT_CREATED = 'SET_CONTRACT_TIMEOUT_CREATED'
const SET_CONTRACTS = 'SET_CONTRACTS'
const SET_PLANETS = 'SET_PLANETS'
const SET_TIMER_RUNNING = 'SET_TIMER_RUNNING'

// * ACTION GENERATORS
/**
 * Adds a contract to the contract array.
 * @param {object} contract Contract object.
 */
export const addContract = contract => ({
  type: ADD_CONTRACT,
  payload: { contract }
})

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
 * Removes a specific item contract.
 * @param {String} id Unique ID for item contract.
 */
export const removeContract = id => ({ type: REMOVE_CONTRACT, payload: { id } })

/**
 * Replaces entire World.
 * @param {Object} world World object from Redux store.
 */
export const replaceWorld = world => ({
  type: REPLACE_WORLD,
  payload: { world }
})

/**
 * Tells the application if a timeout for this item contract has been created to remove the contract.
 * @param {String} id ID of item contract.
 * @param {Boolean} timeoutCreated Has a timeout for this contract been created.
 */
export const setContractTimeoutCreated = (id, timeoutCreated) => ({
  type: SET_CONTRACT_TIMEOUT_CREATED,
  payload: { id, timeoutCreated }
})

/**
 * Sets the contracts array.
 * @param {array} contracts Array of contract objects.
 */
export const setContracts = contracts => ({
  type: SET_CONTRACTS,
  payload: { contracts }
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
/**
 * Sets the isCreatingContract value in UI to false, and adds the contract to the contract array in World.
 * @param {object} contract Contract object.
 */
export const createContract = contract => dispatch => {
  dispatch(setIsCreatingContract(false))
  dispatch(addContract(contract))
}

/**
 * Sets the planets, ship location, and contracts initially.
 */
export const initializeApplication = () => dispatch => {
  const planets = generatePlanets()
  const homePlanet = planets.find(planet => planet.isHomePlanet === true)
  const location = { name: homePlanet.name, value: homePlanet.location }
  const contracts = generateContracts(planets)
  const buyers = generateBuyers(planets)
  const sellers = generateSellers(planets)

  dispatch(setPlanets(planets))
  dispatch(setShipLocation(location))
  dispatch(setContracts(contracts))
  dispatch(setBuyers(buyers))
  dispatch(setSellers(sellers))
}

/**
 * Clears and refreshes items, and sets the timer to be no longer running.
 */
export const itemTimerFinish = () => dispatch => {
  // * Clear all items from planets
  dispatch(clearItems())
  // * Put new items on planets
  dispatch(refreshItems())
  // * Tell Redux the timer is no longer running
  dispatch(setTimerRunning(false))
}

/**
 * Handles setting up timeouts to remove item contracts when they expire.
 * @param {Array} contracts Array of item contracts.
 */
export const calculateContractExpirations = contracts => dispatch => {
  contracts.forEach(({ expiration, id, timeoutCreated }) => {
    if (!timeoutCreated || isInPast(expiration)) {
      dispatch(setContractTimeoutCreated(id, true))
      setTimeout(() => {
        dispatch(removeContract(id))
      }, createDiffDuration(expiration).asMilliseconds())
    }
  })
}

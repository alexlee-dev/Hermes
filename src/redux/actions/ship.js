// * ACTION TYPES
const REMOVE_CARGO = 'REMOVE_CARGO'
const SET_DESTINATION = 'SET_DESTINATION'
const SET_ETA = 'SET_ETA'
const SET_SHIP_LOCATION = 'SET_SHIP_LOCATION'
const SET_SHIP_TRAVELING = 'SET_SHIP_TRAVELING'
const STORE_CARGO = 'STORE_CARGO'

// * ACTION GENERATORS

/**
 * Removes an item from the ship cargo.
 * @param {object} item Item to remove.
 */
export const removeCargo = item => ({
  type: REMOVE_CARGO,
  payload: {
    item
  }
})

/**
 * Sets the ship's destination.
 * @param {object} destination Destination for the ship.
 */
export const setDestination = destination => ({
  type: SET_DESTINATION,
  payload: { destination }
})

/**
 * Sets an ETA in Unix MIllisecond Timestamp for the ship.
 * @param {string} eta ETA in Unix Millisecond Timestamp.
 */
export const setETA = eta => ({
  type: SET_ETA,
  payload: { eta }
})

/**
 * Sets the ship's location.
 * @param {object} location Location object.
 */
export const setShipLocation = location => ({
  type: SET_SHIP_LOCATION,
  payload: { location }
})

/**
 * Sets if the ship is traveling or not.
 * @param {boolean} isShipTraveling Is the ship traveling?
 */
export const setShipTraveling = isShipTraveling => ({
  type: SET_SHIP_TRAVELING,
  payload: { isShipTraveling }
})

/**
 * Stores an item in the ship's cargo.
 * @param {object} item Item to store.
 * @param {number} quantity Quantity of the item to store.
 */
export const storeCargo = (item, quantity) => ({
  type: STORE_CARGO,
  payload: {
    item,
    quantity
  }
})

// * PROMISES

// * THUNKS

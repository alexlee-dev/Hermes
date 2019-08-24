// * ACTION TYPES
const REMOVE_CARGO = 'REMOVE_CARGO'
const SET_DESTINATION = 'SET_DESTINATION'
const SET_SHIP_LOCATION = 'SET_SHIP_LOCATION'
const SET_SHIP_TRAVELING = 'SET_SHIP_TRAVELING'
const SET_TRAVEL_DURATION = 'SET_TRAVEL_DURATION'
const STORE_CARGO = 'STORE_CARGO'

// * ACTION GENERATORS
export const removeCargo = item => ({
  type: REMOVE_CARGO,
  payload: {
    item
  }
})

export const setDestination = destination => ({
  type: SET_DESTINATION,
  payload: { destination }
})

export const setShipLocation = location => ({
  type: SET_SHIP_LOCATION,
  payload: { location }
})

export const setShipTraveling = isShipTraveling => ({
  type: SET_SHIP_TRAVELING,
  payload: { isShipTraveling }
})

export const setTravelDuration = travelDuration => ({
  type: SET_TRAVEL_DURATION,
  payload: { travelDuration }
})

export const storeCargo = (item, quantity) => ({
  type: STORE_CARGO,
  payload: {
    item,
    quantity
  }
})

// * PROMISES

// * THUNKS

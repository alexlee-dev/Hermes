// * ACTION TYPES
const REMOVE_CARGO = 'REMOVE_CARGO'
const SET_DESTINATION = 'SET_DESTINATION'
const SET_SHIP_LOCATION_NAME = 'SET_SHIP_LOCATION_NAME'
const SET_SHIP_LOCATION_VALUE = 'SET_SHIP_LOCATION_VALUE'
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

export const setShipLocationName = name => ({
  type: SET_SHIP_LOCATION_NAME,
  payload: { name }
})

export const setShipLocationValue = value => ({
  type: SET_SHIP_LOCATION_VALUE,
  payload: { value }
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

export const setDestination = destination => ({
  type: SET_DESTINATION,
  payload: { destination }
})

// * PROMISES

// * THUNKS

// * ACTION TYPES
const STORE_CARGO = 'STORE_CARGO'
const REMOVE_CARGO = 'REMOVE_CARGO'
const SET_SHIP_LOCATION_VALUE = 'SET_SHIP_LOCATION_VALUE'
const SET_SHIP_LOCATION_NAME = 'SET_SHIP_LOCATION_NAME'

// * ACTION GENERATORS
export const storeCargo = item => ({
  type: STORE_CARGO,
  payload: {
    item
  }
})

export const removeCargo = item => ({
  type: REMOVE_CARGO,
  payload: {
    item
  }
})

export const setShipLocationValue = value => ({
  type: SET_SHIP_LOCATION_VALUE,
  payload: { value }
})

export const setShipLocationName = name => ({
  type: SET_SHIP_LOCATION_NAME,
  payload: { name }
})

// * PROMISES

// * THUNKS

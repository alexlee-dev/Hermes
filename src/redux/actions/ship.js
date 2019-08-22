// * ACTION TYPES
const REMOVE_CARGO = 'REMOVE_CARGO'
const SET_SHIP_LOCATION_NAME = 'SET_SHIP_LOCATION_NAME'
const SET_SHIP_LOCATION_VALUE = 'SET_SHIP_LOCATION_VALUE'
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

export const storeCargo = item => ({
  type: STORE_CARGO,
  payload: {
    item
  }
})

// * PROMISES

// * THUNKS

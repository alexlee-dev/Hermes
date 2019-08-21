// * ACTION TYPES
const STORE_CARGO = 'STORE_CARGO'
const SET_SHIP = 'SET_SHIP'
const REMOVE_CARGO = 'REMOVE_CARGO'

// * ACTION GENERATORS
export const storeCargo = item => ({
  type: STORE_CARGO,
  payload: {
    item
  }
})

export const setShip = ship => ({ type: SET_SHIP, payload: { ship } })

export const removeCargo = item => ({
  type: REMOVE_CARGO,
  payload: {
    item
  }
})

// * PROMISES

// * THUNKS

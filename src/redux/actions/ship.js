// * ACTION TYPES
const STORE_CARGO = 'STORE_CARGO'
const SET_SHIP = 'SET_SHIP'

// * ACTION GENERATORS
export const storeCargo = item => ({
  type: STORE_CARGO,
  payload: {
    item
  }
})

export const setShip = ship => ({ type: SET_SHIP, payload: { ship } })

// * PROMISES

// * THUNKS

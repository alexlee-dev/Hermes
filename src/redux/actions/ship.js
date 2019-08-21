// * ACTION TYPES
const STORE_CARGO = 'STORE_CARGO'
const REMOVE_CARGO = 'REMOVE_CARGO'

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

// * PROMISES

// * THUNKS

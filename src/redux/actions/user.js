// * ACTION TYPES
const ADD_CASH = 'ADD_CASH'
const REMOVE_CASH = 'REMOVE_CASH'

// * ACTION GENERATORS
export const addCash = amount => ({ type: ADD_CASH, payload: { amount } })
export const removeCash = amount => ({ type: REMOVE_CASH, payload: { amount } })

// * PROMISES

// * THUNKS

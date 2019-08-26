// * ACTION TYPES
const ADD_CASH = 'ADD_CASH'
const REMOVE_CASH = 'REMOVE_CASH'
const RESET_CONTRACT = 'RESET_CONTRACT'
const SET_CONTRACT = 'SET_CONTRACT'

// * ACTION GENERATORS
export const addCash = amount => ({ type: ADD_CASH, payload: { amount } })

export const removeCash = amount => ({ type: REMOVE_CASH, payload: { amount } })

export const resetContract = () => ({ type: RESET_CONTRACT })

export const setContract = contract => ({
  type: SET_CONTRACT,
  payload: { contract }
})

// * PROMISES

// * THUNKS

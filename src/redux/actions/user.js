// * ACTION TYPES
const ADD_CASH = 'ADD_CASH'
const REMOVE_CASH = 'REMOVE_CASH'
const RESET_CONTRACT = 'RESET_CONTRACT'
const SET_CONTRACT = 'SET_CONTRACT'

// * ACTION GENERATORS
/**
 * Adds cash to the user's bank.
 * @param {number} amount Amount to be added.
 */
export const addCash = amount => ({ type: ADD_CASH, payload: { amount } })

/**
 * Removes cash from the user's bank.
 * @param {number} amount Amount to be removed.
 */
export const removeCash = amount => ({ type: REMOVE_CASH, payload: { amount } })

/**
 * Resets the chosen contract to `null`.
 */
export const resetContract = () => ({ type: RESET_CONTRACT })

/**
 * Sets the chosen item contract.
 * @param {object} contract Contract to be set.
 */
export const setContract = contract => ({
  type: SET_CONTRACT,
  payload: { contract }
})

// * PROMISES

// * THUNKS

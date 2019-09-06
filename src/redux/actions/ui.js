// * ACTION TYPES
const REPLACE_UI = 'REPLACE_UI'
const SET_IS_CREATING_CONTRACT = 'SET_IS_CREATING_CONTRACT'
const SET_VIEW = 'SET_VIEW'

// * ACTION GENERATORS
/**
 * Replaces entire UI.
 * @param {Object} ui UI Object from Redux store.
 */
export const replaceUI = ui => ({ type: REPLACE_UI, payload: { ui } })

/**
 * Sets if the user is creating a contract or not.
 * @param {Boolean} isCreatingContract Whether or not the user is creating a contract.
 */
export const setIsCreatingContract = isCreatingContract => ({
  type: SET_IS_CREATING_CONTRACT,
  payload: { isCreatingContract }
})

/**
 * Sets the view displayed to the user.
 * @param {string} view View to display.
 */
export const setView = view => ({
  type: SET_VIEW,
  payload: {
    view
  }
})

// * PROMISES

// * THUNKS

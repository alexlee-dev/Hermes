// * ACTION TYPES
const SET_IS_CREATING_CONTRACT = 'SET_IS_CREATING_CONTRACT'
const SET_VIEW = 'SET_VIEW'

// * ACTION GENERATORS
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

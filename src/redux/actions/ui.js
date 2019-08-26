// * ACTION TYPES
const SET_VIEW = 'SET_VIEW'

// * ACTION GENERATORS
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

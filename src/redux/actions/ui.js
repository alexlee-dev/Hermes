// * ACTION TYPES
const REPLACE_UI = 'REPLACE_UI'
const SET_VIEW = 'SET_VIEW'

// * ACTION GENERATORS
/**
 * Replaces entire UI.
 * @param {Object} ui UI Object from Redux store.
 */
export const replaceUI = ui => ({ type: REPLACE_UI, payload: { ui } })

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

// * ACTION TYPES
const SET_BUYERS = 'SET_BUYERS'
const SET_SELLERS = 'SET_SELLERS'

// * ACTION GENERATORS
export const setBuyers = buyers => ({ type: SET_BUYERS, payload: { buyers } })

export const setSellers = sellers => ({
  type: SET_SELLERS,
  payload: { sellers }
})

// * PROMISES

// * THUNKS

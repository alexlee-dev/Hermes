// * ACTION TYPES
const SET_BUYERS = 'SET_BUYERS'
const SET_SELLERS = 'SET_SELLERS'
const RESET_MARKET = 'RESET_MARKET'

// * ACTION GENERATORS
export const setBuyers = buyers => ({ type: SET_BUYERS, payload: { buyers } })

export const setSellers = sellers => ({
  type: SET_SELLERS,
  payload: { sellers }
})

export const resetMarket = () => ({ type: RESET_MARKET })

// * PROMISES

// * THUNKS

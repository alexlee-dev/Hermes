import configureStore from 'redux-mock-store'

export const defaultState = {
  ship: {
    cargo: [],
    location: {
      name: null,
      value: null
    }
  },
  ui: {
    view: 'Ship'
  },
  user: {
    cash: 100
  },
  world: {
    isTimerRunning: false,
    planets: []
  }
}

const middlewares = []

export const mockStore = configureStore(middlewares)

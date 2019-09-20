import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import marketReducer from '../reducers/market'
import shipReducer from '../reducers/ship'
import uiReducer from '../reducers/ui'
import userReducer from '../reducers/user'
import worldReducer from '../reducers/world'
import { loadState, saveState } from '../../util'
import throttle from 'lodash/throttle'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState()

const store = createStore(
  combineReducers({
    market: marketReducer,
    ship: shipReducer,
    ui: uiReducer,
    user: userReducer,
    world: worldReducer
  }),
  persistedState,
  composeEnhancer(applyMiddleware(thunk))
)

store.subscribe(
  throttle(() => {
    saveState({
      market: store.getState().market,
      ship: store.getState().ship,
      ui: store.getState().ui,
      user: store.getState().user,
      world: {
        contracts: store.getState().world.contracts,
        isTimerRunning: false,
        planets: store.getState().world.planets
      }
    })
  }, 1000)
)

export default store

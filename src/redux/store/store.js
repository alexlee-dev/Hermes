import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import shipReducer from '../reducers/ship'
import uiReducer from '../reducers/ui'
import worldReducer from '../reducers/world'
import { loadState, saveState } from '../../util'
import throttle from 'lodash/throttle'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState()

const store = createStore(
  combineReducers({
    ship: shipReducer,
    ui: uiReducer,
    world: worldReducer
  }),
  persistedState,
  composeEnhancer(applyMiddleware(thunk))
)

store.subscribe(
  throttle(() => {
    saveState({
      ship: store.getState().ship,
      ui: store.getState().ui,
      world: {
        isTimerRunning: false,
        planets: store.getState().world.planets
      }
    })
  }, 1000)
)

export default store

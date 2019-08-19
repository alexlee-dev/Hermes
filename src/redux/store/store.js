import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import shipReducer from '../reducers/ship'
import uiReducer from '../reducers/ui'
import worldReducer from '../reducers/world'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  combineReducers({
    ship: shipReducer,
    ui: uiReducer,
    world: worldReducer
  }),
  composeEnhancer(applyMiddleware(thunk))
)

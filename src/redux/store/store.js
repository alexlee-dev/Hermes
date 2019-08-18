import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import worldReducer from '../reducers/world'
import shipReducer from '../reducers/ship'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  combineReducers({
    ship: shipReducer,
    world: worldReducer
  }),
  composeEnhancer(applyMiddleware(thunk))
)

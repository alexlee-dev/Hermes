import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import worldReducer from '../reducers/world'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  combineReducers({
    world: worldReducer
  }),
  composeEnhancer(applyMiddleware(thunk))
)

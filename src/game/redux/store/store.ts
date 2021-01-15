import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import marketReducer from "../reducers/market";
import { loadState } from "../../util";

import { GameState } from "../../../types";
// import { loadState, saveState } from "../../util/main";
// import throttle from "lodash/throttle";

const composeEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState: GameState | undefined = loadState();

const store = createStore(
  combineReducers({
    market: marketReducer,
  }),
  persistedState,
  composeEnhancer(applyMiddleware(thunk))
);

// store.subscribe(
//   throttle(() => {
//     saveState({
//       market: store.getState().market,
//     });
//   }, 1000)
// );

export default store;

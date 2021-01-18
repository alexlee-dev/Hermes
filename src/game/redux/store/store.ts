import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import cameraReducer from "../reducers/camera";
import modalReducer from "../reducers/modal";
import userReducer from "../reducers/user";

import { loadState } from "../../util";

import { RootState } from "../../../types";
// import { loadState, saveState } from "../../util/main";
// import throttle from "lodash/throttle";

const composeEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState: RootState | undefined = loadState();

const store = createStore(
  combineReducers({
    camera: cameraReducer,
    modal: modalReducer,
    user: userReducer,
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

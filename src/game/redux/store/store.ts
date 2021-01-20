import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";

import cameraReducer from "../reducers/camera";
import modalReducer from "../reducers/modal";
import playerReducer from "../reducers/player";

import { loadState, saveState } from "../../util";

import { GameState } from "../../../types";

const composeEnhancer =
  // eslint-disable-next-line
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState: GameState | undefined = loadState();

const store = createStore(
  combineReducers({
    camera: cameraReducer,
    modal: modalReducer,
    player: playerReducer,
  }),
  persistedState,
  composeEnhancer(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState({
      camera: { ...store.getState().camera, target: [0, 0, 0] },
      modal: store.getState().modal,
      player: store.getState().player,
    });
  }, 1000)
);

export default store;

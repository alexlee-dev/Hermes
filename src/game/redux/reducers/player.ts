import { startingLocation } from "../../constants";

import { PlayerActionTypes, PlayerState } from "../../../types";

const playerDefaultState: PlayerState = {
  destination: null,
  eta: null,
  isTraveling: false,
  location: startingLocation,
};

export default (
  state = playerDefaultState,
  action: PlayerActionTypes
): PlayerState => {
  switch (action.type) {
    case "SET_PLAYER_DESTINATION":
      return { ...state, destination: action.payload.destination };
    case "SET_PLAYER_ETA":
      return { ...state, eta: action.payload.eta };
    case "SET_PLAYER_IS_TRAVELING":
      return { ...state, isTraveling: action.payload.isTraveling };
    case "SET_PLAYER_LOCATION":
      return { ...state, location: action.payload.location };
    default:
      return state;
  }
};

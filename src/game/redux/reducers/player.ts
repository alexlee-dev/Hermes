import { startingLocation } from "../../constants";

import { PlayerActionTypes, PlayerState } from "../../../types";

const playerDefaultState: PlayerState = {
  destination: null,
  dockedStation: null,
  eta: null,
  isTraveling: false,
  location: startingLocation,
  travelDistance: null,
  travelDuration: null,
};

export default (
  state = playerDefaultState,
  action: PlayerActionTypes
): PlayerState => {
  switch (action.type) {
    case "SET_PLAYER_DESTINATION":
      return { ...state, destination: action.payload.destination };
    case "SET_PLAYER_DOCKED_STATION":
      return { ...state, dockedStation: action.payload.dockedStation };
    case "SET_PLAYER_ETA":
      return { ...state, eta: action.payload.eta };
    case "SET_PLAYER_IS_TRAVELING":
      return { ...state, isTraveling: action.payload.isTraveling };
    case "SET_PLAYER_LOCATION":
      return { ...state, location: action.payload.location };
    case "SET_PLAYER_TRAVEL_DISTANCE":
      return { ...state, travelDistance: action.payload.travelDistance };
    case "SET_PLAYER_TRAVEL_DURATION":
      return { ...state, travelDuration: action.payload.travelDuration };
    default:
      return state;
  }
};

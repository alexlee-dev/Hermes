import { startingLocation } from "../../constants";

import { UserActionTypes, UserState } from "../../../types";

const userDefaultState: UserState = {
  destination: null,
  eta: null,
  isTraveling: false,
  location: startingLocation,
};

export default (
  state = userDefaultState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case "SET_USER_DESTINATION":
      return { ...state, destination: action.payload.destination };
    case "SET_USER_ETA":
      return { ...state, eta: action.payload.eta };
    case "SET_USER_IS_TRAVELING":
      return { ...state, isTraveling: action.payload.isTraveling };
    case "SET_USER_LOCATION":
      return { ...state, location: action.payload.location };
    default:
      return state;
  }
};

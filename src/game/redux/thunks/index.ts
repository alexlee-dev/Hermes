import { stations } from "../../constants";

import {
  handleSetModalContentKey,
  handleSetModalIsOpen,
  handleSetModalTitle,
} from "../actions/modal";
import {
  handleSetPlayerDestination,
  handleSetPlayerDockedStation,
  handleSetPlayerEta,
  handleSetPlayerIsTraveling,
  handleSetPlayerLocation,
  handleSetPlayerTravelDistance,
  handleSetPlayerTravelDuration,
} from "../actions/player";

import { calculateDistance, calculateEta } from "../../util";

import { AppThunk, GameState, MenuType, Station } from "../../../types";

export const handleCompleteTravel = (): AppThunk => async (
  dispatch,
  getState
) => {
  const state: GameState = getState();
  const { destination, location } = state.player;

  if (!destination) {
    throw new Error("No destination!");
  }
  const currentStation =
    stations.find(
      (station) =>
        station.location[0] === location[0] &&
        station.location[1] === location[1] &&
        station.location[2] === location[2]
    ) || null;

  dispatch(handleSetPlayerIsTraveling(false));
  dispatch(handleSetPlayerEta(null));
  dispatch(handleSetPlayerLocation(destination.location));
  dispatch(handleSetPlayerDestination(null));
  dispatch(handleSetPlayerDockedStation(currentStation));
};

export const handleGameTick = (): AppThunk => async (dispatch, getState) => {
  const state: GameState = getState();

  console.log("handleGameTick()");
  const { eta, isTraveling } = state.player;

  // * Update the ETA every 1 second
  if (isTraveling && eta) {
    dispatch(handleSetPlayerEta(eta - 1));
  }
};

export const handleInitiateTravel = (
  destination: Station | null
): AppThunk => async (dispatch, getState) => {
  const state: GameState = getState();

  const { location } = state.player;

  if (!destination) {
    throw new Error("No destination!");
  }

  // * Close modal
  dispatch(handleSetModalIsOpen(false));

  // * Set an ETA based on the distance to travel
  const distance = calculateDistance(location, destination);
  // * Should edit this depending on ship stats later
  const speed = 1;
  // * In seconds
  const travelTime = distance * speed;
  const eta = calculateEta(travelTime);

  dispatch(handleSetPlayerEta(eta));
  dispatch(handleSetPlayerDestination(destination));
  dispatch(handleSetPlayerTravelDistance(distance));
  dispatch(handleSetPlayerTravelDuration(eta * 1000));

  // * Set isPlayerTraveling to true
  dispatch(handleSetPlayerIsTraveling(true));
};

export const handleOpenSidebarMenu = (menuType: MenuType): AppThunk => async (
  dispatch
) => {
  dispatch(handleSetModalContentKey(menuType.name));
  dispatch(handleSetModalTitle(menuType.title));
  dispatch(handleSetModalIsOpen(true));
};

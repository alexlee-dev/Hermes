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
} from "../actions/player";

import { calculateDistance, calculateEta } from "../../util";

import { AppThunk, GameState, MenuType, Station } from "../../../types";

export const handleGameTick = (): AppThunk => async (dispatch, getState) => {
  const state: GameState = getState();

  const { destination, eta, isTraveling } = state.player;

  if (isTraveling) {
    // * Update the ETA every 1 second
    // TODO Probably do this better somehow
    // eslint-disable-next-line
    if ((window as any).travelComplete) {
      if (!destination) {
        throw new Error("No player destination!");
      }

      const location = destination.location;
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
    } else {
      if (!eta) {
        // ! Error with reloading page in middle of ship traveling happens here
        throw new Error("no eta!");
      }
      dispatch(handleSetPlayerEta(eta - 1));
    }
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
  // * Set isPlayerTraveling to true
  dispatch(handleSetPlayerIsTraveling(true));

  // * Set an ETA based on the distance to travel
  const distance = calculateDistance(location, destination);

  // * Should edit this depending on ship stats later
  const speed = 1;
  // * In seconds
  const travelTime = distance * speed;
  const eta = calculateEta(travelTime);

  dispatch(handleSetPlayerEta(eta));
  dispatch(handleSetPlayerDestination(destination));

  const event = new CustomEvent("shipTravel", {
    detail: {
      travelDestination: destination,
      travelDistance: distance,
      travelDuration: eta * 1000,
    },
  });
  window.dispatchEvent(event);
};

export const handleOpenSidebarMenu = (menuType: MenuType): AppThunk => async (
  dispatch
) => {
  dispatch(handleSetModalContentKey(menuType.name));
  dispatch(handleSetModalTitle(menuType.title));
  dispatch(handleSetModalIsOpen(true));
};

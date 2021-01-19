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

export const handleGameTick = (): AppThunk => async (dispatch, getState) => {
  const state: GameState = getState();

  console.log("handleGameTick()");
  const { destination, eta, isTraveling } = state.player;

  // ? Somewhere in this logic, you need to figure out if you need to call handleInitiateTravel();

  if (isTraveling) {
    // * Check if tween exists
    if ((window as any).shipMoving) {
      // * Tween exists, everthing is fine
      console.log("NORMAL!");
    } else {
      if (!(window as any).travelComplete) {
        // * Tween doesn't exist, but SHOULD
        // * Launch some type of "update ship travel" event
        console.log("NOT NORMAL!");
        const event = new CustomEvent("shipTravel", {
          detail: { easing: false },
        });
        window.dispatchEvent(event);
        return;
      }
    }

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
      if (!eta && eta !== 0) {
        // ! Error with reloading page in middle of ship traveling happens here
        // ? Error occurs because eta is 0, but there is still a window.tween, and window.travelComplete is `false`
        // * This chunk of code is running before the .onComplete() of thw tween is being run
        console.log(state);

        debugger;
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
  dispatch(handleSetPlayerTravelDistance(distance));
  dispatch(handleSetPlayerTravelDuration(eta * 1000));

  // * Event needs to happen after Redux has actually updated the store
  // ? This could be problematic I think
  setTimeout(() => {
    const event = new CustomEvent("shipTravel", { detail: { easing: true } });
    window.dispatchEvent(event);
  }, 100);
};

export const handleOpenSidebarMenu = (menuType: MenuType): AppThunk => async (
  dispatch
) => {
  dispatch(handleSetModalContentKey(menuType.name));
  dispatch(handleSetModalTitle(menuType.title));
  dispatch(handleSetModalIsOpen(true));
};

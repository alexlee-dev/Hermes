import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { stations } from "../constants";
import { arraysMatch, calculateDistance, calculateEta } from "../util";

import {
  ModalActionTypes,
  RootState,
  Station,
  PlayerActionTypes,
} from "../../types";

const mapState = (state: RootState) => ({
  playerLocation: state.player.location,
});

const mapDispatch = {
  handleSetModalIsOpen: (isOpen: boolean): ModalActionTypes => ({
    type: "SET_MODAL_IS_OPEN",
    payload: { isOpen },
  }),
  handleSetPlayerDestination: (
    destination: Station | null
  ): PlayerActionTypes => ({
    type: "SET_PLAYER_DESTINATION",
    payload: { destination },
  }),
  handleSetPlayerEta: (eta: number | null): PlayerActionTypes => ({
    type: "SET_PLAYER_ETA",
    payload: { eta },
  }),
  handleSetPlayerIsTraveling: (isTraveling: boolean): PlayerActionTypes => ({
    type: "SET_PLAYER_IS_TRAVELING",
    payload: { isTraveling },
  }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type TravelContentProps = PropsFromRedux;

const TravelContent: React.FunctionComponent<TravelContentProps> = (
  props: TravelContentProps
) => {
  const {
    handleSetModalIsOpen,
    handleSetPlayerDestination,
    handleSetPlayerEta,
    handleSetPlayerIsTraveling,
    playerLocation,
  } = props;

  const [destination, setDestination] = React.useState<Station | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!destination) {
      throw new Error("No destination!");
    }

    // * Close modal
    handleSetModalIsOpen(false);
    // * Set isPlayerTraveling to true
    handleSetPlayerIsTraveling(true);

    // * Set an ETA based on the distance to travel
    const distance = calculateDistance(playerLocation, destination);

    // * Should edit this depending on ship stats later
    const speed = 1;
    // * In seconds
    const travelTime = distance * speed;
    const eta = calculateEta(travelTime);

    handleSetPlayerEta(eta);
    handleSetPlayerDestination(destination);

    const event = new CustomEvent("shipTravel", {
      detail: {
        travelDestination: destination,
        travelDistance: distance,
        travelDuration: eta * 1000,
      },
    });
    window.dispatchEvent(event);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const destination = stations.find(
      (station) => station.id === e.target.value
    );

    if (!destination) {
      throw new Error(
        `No station corresponding with an id of ${e.target.value}`
      );
    }
    setDestination(destination);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="destination">Destination</label>
      <select id="destination" onChange={handleDestinationChange}>
        <option value="">-- Please select a destination --</option>
        {stations
          .filter((station) => !arraysMatch(station.location, playerLocation))
          .map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
      </select>
      <button disabled={!destination} type="submit">
        Launch!
      </button>
    </form>
  );
};

export default connector(TravelContent);

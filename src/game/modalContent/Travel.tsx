import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { stations } from "../constants";
import { arraysMatch, calculateDistance, calculateEta } from "../util";

import {
  ModalActionTypes,
  RootState,
  Station,
  UserActionTypes,
} from "../../types";

const mapState = (state: RootState) => ({
  userLocation: state.user.location,
});

const mapDispatch = {
  handleSetModalIsOpen: (isOpen: boolean): ModalActionTypes => ({
    type: "SET_MODAL_IS_OPEN",
    payload: { isOpen },
  }),
  handleSetUserDestination: (destination: Station | null): UserActionTypes => ({
    type: "SET_USER_DESTINATION",
    payload: { destination },
  }),
  handleSetUserEta: (eta: number | null): UserActionTypes => ({
    type: "SET_USER_ETA",
    payload: { eta },
  }),
  handleSetUserIsTraveling: (isTraveling: boolean): UserActionTypes => ({
    type: "SET_USER_IS_TRAVELING",
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
    handleSetUserDestination,
    handleSetUserEta,
    handleSetUserIsTraveling,
    userLocation,
  } = props;

  const [destination, setDestination] = React.useState<Station | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!destination) {
      throw new Error("No destination!");
    }

    // * Close modal
    handleSetModalIsOpen(false);
    // * Set isUserTraveling to true
    handleSetUserIsTraveling(true);

    // * Set an ETA based on the distance to travel
    const distance = calculateDistance(userLocation, destination);

    // * Should edit this depending on ship stats later
    const speed = 1;
    // * In seconds
    const travelTime = distance * speed;
    const eta = calculateEta(travelTime);

    handleSetUserEta(eta);
    handleSetUserDestination(destination);

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
          .filter((station) => !arraysMatch(station.location, userLocation))
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

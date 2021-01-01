import * as React from "react";

import { stations } from "../constants";
import { arraysMatch, calculateDistance, calculateEta } from "../util";

import { Station } from "../types";

interface TravelContentProps {
  setEta: (eta: number) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setUserDestination: (userDestination: Station) => void;
  setUserIsTraveling: (userIsTraveling: boolean) => void;
  userLocation: [number, number];
}

const TravelContent: React.FunctionComponent<TravelContentProps> = (
  props: TravelContentProps
) => {
  const {
    setEta,
    setModalIsOpen,
    setUserDestination,
    setUserIsTraveling,
    userLocation,
  } = props;

  const [destination, setDestination] = React.useState<Station | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!destination) {
      throw new Error("No destination!");
    }

    // * Close modal
    setModalIsOpen(false);
    // * Set isUserTraveling to true
    setUserIsTraveling(true);

    // * Set an ETA based on the distance to travel
    const distance = calculateDistance(userLocation, destination);

    // * Should edit this depending on ship stats later
    const speed = 1;
    // * In seconds
    const travelTime = distance * speed;
    const eta = calculateEta(travelTime);

    setEta(eta);
    setUserDestination(destination);

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

export default TravelContent;

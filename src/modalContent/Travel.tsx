import * as React from "react";
import addSeconds from "date-fns/addSeconds";

import { Station } from "../types";
import { arraysMatch } from "../util";

interface TravelContentProps {
  setEta: (eta: Date) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setUserIsTraveling: (userIsTraveling: boolean) => void;
  stations: Station[];
  userLocation: [number, number];
}

const TravelContent: React.FunctionComponent<TravelContentProps> = (
  props: TravelContentProps
) => {
  const {
    setEta,
    setModalIsOpen,
    setUserIsTraveling,
    stations,
    userLocation,
  } = props;

  const [destination, setDestination] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // * Close modal
    setModalIsOpen(false);
    // * Set isUserTraveling to true
    setUserIsTraveling(true);

    // * Set an ETA based on the distance to travel
    const now = Date.now();
    const etaDate = addSeconds(now, 10);
    console.log(etaDate);
    setEta(etaDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="destination">Destination</label>
      <select id="destination" onChange={(e) => setDestination(e.target.value)}>
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

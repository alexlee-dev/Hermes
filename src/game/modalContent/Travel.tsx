import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { handleInitiateTravel } from "../redux/thunks";
import { stations } from "../constants";
import { arraysMatch } from "../util";

import { GameState, Station } from "../../types";

const mapState = (state: GameState) => ({
  playerLocation: state.player.location,
});

const mapDispatch = {
  handleInitiateTravel,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type TravelContentProps = PropsFromRedux;

const TravelContent: React.FunctionComponent<TravelContentProps> = (
  props: TravelContentProps
) => {
  const { handleInitiateTravel, playerLocation } = props;

  const [destination, setDestination] = React.useState<Station | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleInitiateTravel(destination);
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

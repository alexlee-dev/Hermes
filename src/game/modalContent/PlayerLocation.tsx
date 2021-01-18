import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import StationDisplay from "../components/StationDisplay";
import { stations } from "../constants";

import { GameState } from "../../types";

const mapState = (state: GameState) => ({
  playerIsTraveling: state.player.isTraveling,
  playerLocation: state.player.location,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PlayerLocationProps = PropsFromRedux;

const PlayerLocation: React.FunctionComponent<PlayerLocationProps> = (
  props: PlayerLocationProps
) => {
  const { playerIsTraveling, playerLocation } = props;

  const currentStation =
    !playerIsTraveling &&
    stations.find(
      (station) =>
        station.location[0] === playerLocation[0] &&
        station.location[1] === playerLocation[1] &&
        station.location[2] === playerLocation[2]
    );

  let location;

  if (currentStation && currentStation.name) {
    location = currentStation.name;
  } else {
    if (playerIsTraveling) {
      location = "Traveling...";
    } else {
      location = "In space...";
    }
  }

  return (
    <div>
      {!playerIsTraveling && (
        <div>
          <h2>Location</h2>
          {location}
          {currentStation && (
            <>
              <h2>Current Station</h2>
              <StationDisplay station={currentStation} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default connector(PlayerLocation);

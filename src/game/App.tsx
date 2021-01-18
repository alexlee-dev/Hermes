import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import ReactTooltip from "react-tooltip";

import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";

import useInterval from "./hooks/useInterval";

import GameScene from "./GameScene";

import {
  handleSetPlayerDestination,
  handleSetPlayerDockedStation,
  handleSetPlayerEta,
  handleSetPlayerIsTraveling,
  handleSetPlayerLocation,
} from "./redux/actions/player";

import { stations } from "./constants";

import { GameState } from "../types";

const mapState = (state: GameState) => ({
  playerEta: state.player.eta,
  playerDestination: state.player.destination,
  playerIsTraveling: state.player.isTraveling,
});

const mapDispatch = {
  handleSetPlayerDestination,
  handleSetPlayerDockedStation,
  handleSetPlayerEta,
  handleSetPlayerIsTraveling,
  handleSetPlayerLocation,
};

const connector = connect(mapState, mapDispatch);

type AppProps = ConnectedProps<typeof connector>;

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const {
    handleSetPlayerDestination,
    handleSetPlayerDockedStation,
    handleSetPlayerEta,
    handleSetPlayerIsTraveling,
    handleSetPlayerLocation,
    playerDestination,
    playerEta,
    playerIsTraveling,
  } = props;

  useInterval(() => {
    if (playerIsTraveling) {
      // * Update the ETA every 1 second
      // TODO Probably do this better somehow
      // eslint-disable-next-line
      if ((window as any).travelComplete) {
        if (!playerDestination) {
          throw new Error("No player destination!");
        }

        const location = playerDestination.location;
        const currentStation =
          stations.find(
            (station) =>
              station.location[0] === location[0] &&
              station.location[1] === location[1] &&
              station.location[2] === location[2]
          ) || null;
        console.log({ currentStation });
        handleSetPlayerIsTraveling(false);
        handleSetPlayerEta(null);
        handleSetPlayerLocation(playerDestination.location);
        handleSetPlayerDestination(null);
        handleSetPlayerDockedStation(currentStation);
      } else {
        if (!playerEta) {
          throw new Error("no eta!");
        }
        handleSetPlayerEta(playerEta - 1);
      }
    }
  }, 1000);

  return (
    <>
      <Sidebar />
      <GameScene />
      <Modal />
      <ReactTooltip />
    </>
  );
};

export default connector(App);

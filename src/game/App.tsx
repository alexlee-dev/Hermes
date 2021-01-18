import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import ReactTooltip from "react-tooltip";

import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";

import useInterval from "./hooks/useInterval";

import GameScene from "./GameScene";

import {
  handleSetPlayerDestination,
  handleSetPlayerEta,
  handleSetPlayerIsTraveling,
  handleSetPlayerLocation,
} from "./redux/actions/player";

import { GameState } from "../types";

const mapState = (state: GameState) => ({
  playerEta: state.player.eta,
  playerDestination: state.player.destination,
  playerIsTraveling: state.player.isTraveling,
});

const mapDispatch = {
  handleSetPlayerDestination,
  handleSetPlayerEta,
  handleSetPlayerIsTraveling,
  handleSetPlayerLocation,
};

const connector = connect(mapState, mapDispatch);

type AppProps = ConnectedProps<typeof connector>;

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const {
    handleSetPlayerDestination,
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
      if ((window as any).travelComplete) {
        if (!playerDestination) {
          throw new Error("No player destination!");
        }
        handleSetPlayerIsTraveling(false);
        handleSetPlayerEta(null);
        handleSetPlayerLocation(playerDestination.location);
        handleSetPlayerDestination(null);
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

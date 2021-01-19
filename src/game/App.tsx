import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import ReactTooltip from "react-tooltip";

import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";

import useInterval from "./hooks/useInterval";

import GameScene from "./GameScene";

import { handleGameTick } from "./redux/thunks";

import { GameState } from "../types";

const mapState = (state: GameState) => ({
  playerEta: state.player.eta,
  playerDestination: state.player.destination,
  playerIsTraveling: state.player.isTraveling,
});

const mapDispatch = {
  handleGameTick,
};

const connector = connect(mapState, mapDispatch);

type AppProps = ConnectedProps<typeof connector>;

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const { handleGameTick } = props;

  useInterval(() => handleGameTick(), 1000);

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

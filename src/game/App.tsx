import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import ReactTooltip from "react-tooltip";

import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";

import useInterval from "./hooks/useInterval";

import GameScene from "./GameScene";

import { handleGameTick } from "./redux/thunks";

const mapDispatch = {
  handleGameTick,
};

const connector = connect(null, mapDispatch);

type AppProps = ConnectedProps<typeof connector>;

// TODO - Create a button to just clear localstorage and refresh page for dev purposes
const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const { handleGameTick } = props;

  console.log("RERENDER APP!");

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

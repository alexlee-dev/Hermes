import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import ReactTooltip from "react-tooltip";

import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";

import useInterval from "./hooks/useInterval";

import GameScene from "./GameScene";

import { MapCoordinate, RootState, Station, UserActionTypes } from "../types";

const mapState = (state: RootState) => ({
  userEta: state.user.eta,
  userDestination: state.user.destination,
  userIsTraveling: state.user.isTraveling,
});

const mapDispatch = {
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
    payload: {
      isTraveling,
    },
  }),
  handleSetUserLocation: (location: MapCoordinate): UserActionTypes => ({
    type: "SET_USER_LOCATION",
    payload: { location },
  }),
};

const connector = connect(mapState, mapDispatch);

type AppProps = ConnectedProps<typeof connector>;

// TODO - Rename 'user' to 'player'
const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const {
    handleSetUserDestination,
    handleSetUserEta,
    handleSetUserIsTraveling,
    handleSetUserLocation,
    userDestination,
    userEta,
    userIsTraveling,
  } = props;

  useInterval(() => {
    if (userIsTraveling) {
      // * Update the ETA every 1 second
      // TODO Probably do this better somehow
      if ((window as any).travelComplete) {
        if (!userDestination) {
          throw new Error("No user destination!");
        }
        handleSetUserIsTraveling(false);
        handleSetUserEta(null);
        handleSetUserLocation(userDestination.location);
        handleSetUserDestination(null);
      } else {
        if (!userEta) {
          throw new Error("no eta!");
        }
        handleSetUserEta(userEta - 1);
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

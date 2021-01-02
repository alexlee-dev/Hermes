import * as React from "react";
import ReactTooltip from "react-tooltip";

import Modal from "./components/Modal";

import { startingLocation } from "./constants";
import Sidebar from "./components/Sidebar";
import useInterval from "./hooks/useInterval";
import GameScene from "./GameScene";

import { MapCoordinate, Station } from "./types";

const App: React.FunctionComponent<unknown> = () => {
  const [modalContent, setModalContent] = React.useState<string>("");
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const [modalTitle, setModalTitle] = React.useState<string>("");

  const [userLocation, setUserLocation] = React.useState<MapCoordinate>(
    startingLocation
  );
  const [userDestination, setUserDestination] = React.useState<Station | null>(
    null
  );
  const [userIsTraveling, setUserIsTraveling] = React.useState<boolean>(false);
  // * In Seconds
  const [eta, setEta] = React.useState<number | null>(null);

  useInterval(() => {
    if (userIsTraveling) {
      // * Update the ETA every 1 second
      // TODO Probably do this better somehow
      if ((window as any).travelComplete) {
        if (!userDestination) {
          throw new Error("No user destination!");
        }
        setUserIsTraveling(false);
        setEta(null);
        setUserLocation(userDestination.location);
        setUserDestination(null);
      } else {
        if (!eta) {
          throw new Error("no eta!");
        }
        // TODO - Render the ship traveling through the map
        setEta(eta - 1);
      }
    }
  }, 1000);

  return (
    <>
      <Sidebar
        eta={eta}
        modalIsOpen={modalIsOpen}
        setModalContent={setModalContent}
        setModalIsOpen={setModalIsOpen}
        setModalTitle={setModalTitle}
        userIsTraveling={userIsTraveling}
      />
      <GameScene />
      <Modal
        content={modalContent}
        display={modalIsOpen}
        setEta={setEta}
        setModalIsOpen={setModalIsOpen}
        setUserDestination={setUserDestination}
        setUserIsTraveling={setUserIsTraveling}
        title={modalTitle}
        userIsTraveling={userIsTraveling}
        userLocation={userLocation}
      />
      <ReactTooltip />
    </>
  );
};

export default App;

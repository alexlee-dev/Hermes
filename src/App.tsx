import * as React from "react";

import Modal from "./components/Modal";

import { startingStation } from "./constants";
import GameDisplay from "./GameDisplay";
import useInterval from "./hooks/useInterval";
import TravelMapScene from "./TravelMapScene";
import { calculateDistance } from "./util";

import { Station } from "./types";

const App: React.FunctionComponent<unknown> = () => {
  const [modalContent, setModalContent] = React.useState<string>("");
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const [modalTitle, setModalTitle] = React.useState<string>("");

  const [userLocation, setUserLocation] = React.useState<[number, number]>(
    startingStation.location
  );
  const [userDestination, setUserDestination] = React.useState<Station | null>(
    null
  );
  const [userIsTraveling, setUserIsTraveling] = React.useState<boolean>(false);
  // * In Seconds
  const [eta, setEta] = React.useState<number | null>(null);

  useInterval(() => {
    if (userIsTraveling && eta) {
      // * Update the ETA every 1 second
      if (eta === 1) {
        if (!userDestination) {
          throw new Error("No user destination!");
        }
        setUserIsTraveling(false);
        setEta(null);
        setUserLocation(userDestination.location);
        setUserDestination(null);
      } else {
        // TODO - Render the ship traveling through the map
        setEta(eta - 1);
      }
    }
  }, 1000);

  return (
    <>
      <GameDisplay
        eta={eta}
        modalIsOpen={modalIsOpen}
        setModalContent={setModalContent}
        setModalIsOpen={setModalIsOpen}
        setModalTitle={setModalTitle}
        userIsTraveling={userIsTraveling}
        userLocation={userLocation}
      />
      <TravelMapScene />

      <Modal
        content={modalContent}
        display={modalIsOpen}
        setEta={setEta}
        setModalIsOpen={setModalIsOpen}
        setUserDestination={setUserDestination}
        setUserIsTraveling={setUserIsTraveling}
        title={modalTitle}
        userLocation={userLocation}
      />
    </>
  );
};

export default App;

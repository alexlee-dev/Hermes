import * as React from "react";

import Modal from "./components/Modal";
import StationDisplay from "./components/StationDisplay";

import { startingStation, stations } from "./constants";
import useInterval from "./hooks/useInterval";

import { Station } from "./types";

const App: React.FunctionComponent<unknown> = () => {
  const [modalContent, setModalContent] = React.useState<string>("");
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const [modalTitle, setModalTitle] = React.useState<string>("");

  const [userLocation, setUserLocation] = React.useState<Station>(
    startingStation
  );
  const [userDestination, setUserDestination] = React.useState<Station | null>(
    null
  );
  const [userIsTraveling, setUserIsTraveling] = React.useState<boolean>(false);
  // * In Seconds
  const [eta, setEta] = React.useState<number | null>(null);

  const currentStation =
    !userIsTraveling &&
    stations.find(
      (station) =>
        station.location[0] === userLocation.location[0] &&
        station.location[1] === userLocation.location[1]
    );

  const handleClickTravel = () => {
    setModalContent("travel");
    setModalTitle("Travel");
    setModalIsOpen(true);
  };

  useInterval(() => {
    if (userIsTraveling && eta) {
      // * Update the ETA every 1 second
      if (eta === 1) {
        if (!userDestination) {
          throw new Error("No user destination!");
        }
        setUserIsTraveling(false);
        setEta(null);
        setUserLocation(userDestination);
        setUserDestination(null);
      } else {
        setEta(eta - 1);
      }
    }
  }, 1000);

  return (
    <div>
      <div className={modalIsOpen ? "blur" : undefined}>
        <h1>Hermes</h1>
        <div>
          <h2>User Location</h2>
          {currentStation ? currentStation.name : "Traveling..."}
          {!userIsTraveling && (
            <button onClick={handleClickTravel} type="button">
              Travel
            </button>
          )}
          {userIsTraveling && eta && (
            <div>
              <h3>ETA</h3>
              {eta}
            </div>
          )}
        </div>
        {!userIsTraveling && (
          <div>
            <h2>Current Station</h2>
            {currentStation && <StationDisplay station={currentStation} />}
          </div>
        )}
      </div>

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
    </div>
  );
};

export default App;

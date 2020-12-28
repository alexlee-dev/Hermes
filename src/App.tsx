import * as React from "react";

import Modal from "./components/Modal";
import StationDisplay from "./components/StationDisplay";

import { stations } from "./constants";
import useInterval from "./hooks/useInterval";

const App: React.FunctionComponent<unknown> = () => {
  const [modalContent, setModalContent] = React.useState<string>("");
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const [modalTitle, setModalTitle] = React.useState<string>("");

  const [userLocation, setUserLocation] = React.useState<[number, number]>([
    0,
    0,
  ]);
  const [userIsTraveling, setUserIsTraveling] = React.useState<boolean>(false);
  // * In Seconds
  const [eta, setEta] = React.useState<number | null>(null);

  const currentStation =
    !userIsTraveling &&
    stations.find(
      (station) =>
        station.location[0] === userLocation[0] &&
        station.location[1] === userLocation[1]
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
        setUserIsTraveling(false);
        setEta(null);
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
        setUserIsTraveling={setUserIsTraveling}
        title={modalTitle}
        userLocation={userLocation}
      />
    </div>
  );
};

export default App;

import * as React from "react";

import StationDisplay from "./components/StationDisplay";
import { stations } from "./constants";

export interface GameDisplayProps {
  eta: number | null;
  modalIsOpen: boolean;
  setModalContent: (modalContent: string) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setModalTitle: (modalTitle: string) => void;
  userIsTraveling: boolean;
  userLocation: [number, number];
}

const GameDisplay: React.FunctionComponent<GameDisplayProps> = (
  props: GameDisplayProps
) => {
  const {
    eta,
    modalIsOpen,
    setModalContent,
    setModalIsOpen,
    setModalTitle,
    userIsTraveling,
    userLocation,
  } = props;

  const handleClickTravel = () => {
    setModalContent("travel");
    setModalTitle("Travel");
    setModalIsOpen(true);
  };

  const currentStation =
    !userIsTraveling &&
    stations.find(
      (station) =>
        station.location[0] === userLocation[0] &&
        station.location[1] === userLocation[1]
    );

  return (
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
  );
};

export default GameDisplay;

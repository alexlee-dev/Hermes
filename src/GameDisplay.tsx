import * as React from "react";

import StationDisplay from "./components/StationDisplay";
import { stations } from "./constants";

import { MapCoordinate } from "./types";

export interface GameDisplayProps {
  eta: number | null;
  modalIsOpen: boolean;
  setModalContent: (modalContent: string) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setModalTitle: (modalTitle: string) => void;
  userIsTraveling: boolean;
  userLocation: MapCoordinate;
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
        station.location[1] === userLocation[1] &&
        station.location[2] === userLocation[2]
    );

  let location;

  if (currentStation && currentStation.name) {
    location = currentStation.name;
  } else {
    if (userIsTraveling) {
      location = "Traveling...";
    } else {
      location = "In space...";
    }
  }

  return (
    <div className={modalIsOpen ? "blur" : undefined} id="game-display">
      <h1>Hermes</h1>
      <i className="fas fa-user"></i>
      <div>
        <h2>User Location</h2>
        {location}
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

import * as React from "react";

import StationDisplay from "../components/StationDisplay";
import { stations } from "../constants";

import { MapCoordinate, Station } from "../types";

interface UserLocationProps {
  setEta: (eta: number) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setUserDestination: (userDestination: Station) => void;
  setUserIsTraveling: (userIsTraveling: boolean) => void;
  userLocation: MapCoordinate;
  userIsTraveling: boolean;
}

const UserLocation: React.FunctionComponent<UserLocationProps> = (
  props: UserLocationProps
) => {
  const { userIsTraveling, userLocation } = props;

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
    <div>
      {!userIsTraveling && (
        <div>
          <h2>Location</h2>
          {location}
          {currentStation && (
            <>
              <h2>Current Station</h2>
              <StationDisplay station={currentStation} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserLocation;

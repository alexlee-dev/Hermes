import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import StationDisplay from "../components/StationDisplay";
import { stations } from "../constants";

import { RootState } from "../../types";

const mapState = (state: RootState) => ({
  userIsTraveling: state.user.isTraveling,
  userLocation: state.user.location,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type UserLocationProps = PropsFromRedux;

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

export default connector(UserLocation);

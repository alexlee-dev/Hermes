import * as React from "react";
import StationDisplay from "./components/StationDisplay";

import { stations } from "./constants";

const App: React.FunctionComponent<unknown> = () => {
  const [userLocation, setUserLocation] = React.useState([0, 0]);

  const currentStation = stations.find(
    (station) =>
      station.location[0] === userLocation[0] &&
      station.location[1] === userLocation[1]
  );

  return (
    <div>
      <h1>Hermes</h1>
      <div>
        <h2>User Location</h2>
        {currentStation?.name || "Traveling..."}
      </div>
      <div>
        <h2>Current Station</h2>
        {currentStation && <StationDisplay station={currentStation} />}
      </div>
    </div>
  );
};

export default App;

import * as React from "react";
import { Station } from "../types";

interface StationDisplayProps {
  station: Station;
}

const StationDisplay: React.FunctionComponent<StationDisplayProps> = (
  props: StationDisplayProps
) => {
  const { station } = props;

  return (
    <div>
      <div>
        <h3>Station Name</h3>
        {station.name}
      </div>
      <div>
        <h3>Location</h3>
        <span>
          [{station.location[0]}, {station.location[1]}]
        </span>
      </div>
    </div>
  );
};

export default StationDisplay;

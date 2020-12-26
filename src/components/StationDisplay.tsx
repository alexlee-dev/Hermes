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
      <div>
        <h3>Market</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Inventory</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {station.market.map((item) => (
              <tr key={`${item.name}-${station.id}`}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.inventory}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationDisplay;

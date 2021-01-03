import * as React from "react";
import { stations } from "../constants";

import { Station } from "../types";

interface MarketContentProps {
  setEta: (eta: number) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setUserDestination: (userDestination: Station) => void;
  setUserIsTraveling: (userIsTraveling: boolean) => void;
  userLocation: [number, number];
}

const MarketContent: React.FunctionComponent<MarketContentProps> = (
  props: MarketContentProps
) => {
  return (
    <div>
      <h3>Market</h3>
      <table>
        <thead>
          <tr>
            <th>Station</th>
            <th>Item</th>
            <th>Description</th>
            <th>Inventory</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) =>
            station.market.map((item) => (
              <tr key={`${item.name}-${station.id}`}>
                <td>{station.name}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.inventory}</td>
                <td>{item.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarketContent;

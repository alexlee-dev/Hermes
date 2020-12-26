import * as React from "react";

import { stations } from "./constants";

const App: React.FunctionComponent<unknown> = () => {
  const [userLocation, setUserLocation] = React.useState([0, 0]);

  return (
    <div>
      <h1>Hermes</h1>
      <div>
        <h2>User Location</h2>
        {userLocation}
      </div>
      <div>
        <h2>Stations</h2>
        {stations.map((station) => (
          <div key={station.id}>
            <div>
              <h3>Location</h3>
              {station.location}
            </div>
            <div>
              <h3>Items</h3>
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
        ))}
      </div>
    </div>
  );
};

export default App;

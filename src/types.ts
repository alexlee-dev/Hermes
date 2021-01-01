export interface Item {
  description: string;
  inventory: number;
  name: string;
  price: number;
}

export interface ShipTravelEvent extends Event {
  detail?: {
    travelDestination: Station;
    // * In "units" ...?
    travelDistance: number;
    // * In miliseconds
    travelDuration: number;
  };
}

export interface Station {
  color: string;
  depth: number;
  height: number;
  id: string;
  location: [number, number];
  market: Item[];
  name: string;
  width: number;
}

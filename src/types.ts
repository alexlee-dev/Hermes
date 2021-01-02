export interface Item {
  description: string;
  inventory: number;
  name: string;
  price: number;
}

export type MapCoordinate = [xCoordinate, yCoordinate, zCoordinate];

export interface MenuType {
  name: "travel" | "userLocation";
  title: string;
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
  location: MapCoordinate;
  market: Item[];
  name: string;
  width: number;
}

type xCoordinate = number;
type yCoordinate = number;
type zCoordinate = number;

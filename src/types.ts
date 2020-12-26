export interface Item {
  description: string;
  inventory: number;
  name: string;
  price: number;
}

export interface Station {
  id: string;
  location: [number, number];
  market: Item[];
  name: string;
}

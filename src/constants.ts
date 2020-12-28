import { Station } from "./types";

export const stations: Station[] = [
  {
    id: "0",
    location: [0, 0],
    market: [
      {
        description: "Item 1 description.",
        inventory: 100,
        name: "Item 1",
        price: 10,
      },
      {
        description: "Item 2 description.",
        inventory: 100,
        name: "Item 2",
        price: 10,
      },
      {
        description: "Item 3 description.",
        inventory: 100,
        name: "Item 3",
        price: 10,
      },
    ],
    name: "Station 1",
  },
  {
    id: "1",
    location: [0, 10],
    market: [
      {
        description: "Item 1 description.",
        inventory: 100,
        name: "Item 1",
        price: 10,
      },
      {
        description: "Item 2 description.",
        inventory: 100,
        name: "Item 2",
        price: 10,
      },
      {
        description: "Item 3 description.",
        inventory: 100,
        name: "Item 3",
        price: 10,
      },
    ],
    name: "Station 2",
  },
  {
    id: "2",
    location: [0, 20],
    market: [
      {
        description: "Item 1 description.",
        inventory: 100,
        name: "Item 1",
        price: 10,
      },
      {
        description: "Item 2 description.",
        inventory: 100,
        name: "Item 2",
        price: 10,
      },
      {
        description: "Item 3 description.",
        inventory: 100,
        name: "Item 3",
        price: 10,
      },
    ],
    name: "Station 3",
  },
];

export const startingStation = stations[0];

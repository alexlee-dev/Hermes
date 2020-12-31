import { Station } from "./types";

export const stations: Station[] = [
  {
    color: "blue",
    depth: 1,
    height: 1,
    id: "1",
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
    width: 1,
  },
  {
    color: "green",
    depth: 1,
    height: 1,
    id: "2",
    location: [10, 0],
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
    width: 1,
  },
  {
    color: "yellow",
    depth: 1,
    height: 1,
    id: "3",
    location: [20, 0],
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
    width: 1,
  },
];

export const startingStation = stations[0];

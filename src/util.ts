import addSeconds from "date-fns/addSeconds";
import differenceInSeconds from "date-fns/differenceInSeconds";

import { Station } from "./types";

export const arraysMatch = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

export const calculateDistance = (
  origin: Station,
  destination: Station
): number => {
  const lhs = Math.pow(destination.location[0] - origin.location[0], 2);
  const rhs = Math.pow(destination.location[1] - origin.location[1], 2);
  const sum = lhs + rhs;
  const distance = Math.sqrt(sum);
  return distance;
};

export const calculateEta = (travelTime: number): number => {
  const now = Date.now();
  const etaDate = addSeconds(now, travelTime);
  const eta = differenceInSeconds(etaDate, now);
  return eta;
};

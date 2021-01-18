import addSeconds from "date-fns/addSeconds";
import differenceInSeconds from "date-fns/differenceInSeconds";
import * as THREE from "three";
import { Object3D } from "three";

import { MapCoordinate, GameState, Station } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  origin: MapCoordinate,
  destination: Station
): number => {
  const lhs = Math.pow(destination.location[0] - origin[0], 2);
  const rhs = Math.pow(destination.location[1] - origin[1], 2);
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

export const createLabel = (
  text: string,
  backgroundColor: string,
  textColor: string,
  positionX: number,
  positionY: number,
  positionZ: number
): Object3D => {
  const size = 32;
  const baseWidth = 150;
  const borderSize = 2;
  const ctx = document.createElement("canvas").getContext("2d");
  const font = `${size}px bold sans-serif`;
  if (!ctx) {
    throw new Error("No ctx!");
  }
  ctx.font = font;
  const textWidth = ctx.measureText(text).width;
  const doubleBorderSize = borderSize * 2;
  const width = baseWidth + doubleBorderSize;
  const height = size + doubleBorderSize;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  // need to set font again after resizing canvas
  ctx.font = font;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // scale to fit but don't stretch
  const scaleFactor = Math.min(1, baseWidth / textWidth);
  ctx.translate(width / 2, height / 2);
  ctx.scale(scaleFactor, 1);
  ctx.fillStyle = textColor;
  ctx.fillText(text, 0, 0);
  const canvas = ctx.canvas;

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const labelMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
  });

  const labelBaseScale = 0.01;
  const label = new THREE.Sprite(labelMaterial);

  const root = new THREE.Object3D();
  root.add(label);

  label.position.set(positionX, positionY, positionZ);
  label.scale.x = canvas.width * labelBaseScale;
  label.scale.y = canvas.height * labelBaseScale;

  return root;
};

export const loadState = (): GameState | undefined => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
  }
};

export const saveState = (state: GameState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error(error);
  }
};

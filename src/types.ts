import { Router } from "express";

export type CameraActionTypes = SetCameraTargetAction;

export interface CameraState {
  target: CameraTarget;
}

export type CameraTarget = string;

export interface CameraTargetChangeEvent extends Event {
  detail?: {
    cameraTarget: CameraTarget;
  };
}

export type Controller = {
  router: Router;
};

export type Domain = string | undefined;

export interface Item {
  description: string;
  inventory: number;
  name: string;
  price: number;
}

export type MapCoordinate = [xCoordinate, yCoordinate, zCoordinate];

export interface MenuType {
  name: "camera" | "market" | "travel" | "userLocation";
  title: string;
}

export type ModalActionTypes =
  | SetModalContentKeyAction
  | SetModalIsOpenAction
  | SetModalTitleAction;

export interface ModalState {
  // TODO - write out the keys, not just "string"
  contentKey: string;
  isOpen: boolean;
  // TODO - write out the titles, not just "string"
  title: string;
}

// TODO - Rename "Game State"
export interface RootState {
  camera: CameraState;
  modal: ModalState;
  user: UserState;
}

export interface SetCameraTargetAction {
  type: "SET_CAMERA_TARGET";
  payload: {
    target: CameraTarget;
  };
}

export interface SetModalContentKeyAction {
  type: "SET_MODAL_CONTENT_KEY";
  payload: {
    contentKey: string;
  };
}

export interface SetModalIsOpenAction {
  type: "SET_MODAL_IS_OPEN";
  payload: {
    isOpen: boolean;
  };
}

export interface SetModalTitleAction {
  type: "SET_MODAL_TITLE";
  payload: {
    title: string;
  };
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

export interface SetUserDestinationAction {
  type: "SET_USER_DESTINATION";
  payload: {
    destination: Station | null;
  };
}

export interface SetUserEtaAction {
  type: "SET_USER_ETA";
  payload: {
    eta: number | null;
  };
}

export interface SetUserIsTravelingAction {
  type: "SET_USER_IS_TRAVELING";
  payload: {
    isTraveling: boolean;
  };
}

export interface SetUserLocationAction {
  type: "SET_USER_LOCATION";
  payload: {
    location: MapCoordinate;
  };
}

export type UserActionTypes =
  | SetUserDestinationAction
  | SetUserEtaAction
  | SetUserIsTravelingAction
  | SetUserLocationAction;

export interface UserState {
  destination: Station | null;
  eta: number | null;
  isTraveling: boolean;
  location: MapCoordinate;
}

type xCoordinate = number;
type yCoordinate = number;
type zCoordinate = number;

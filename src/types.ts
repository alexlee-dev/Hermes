import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Router } from "express";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  GameState,
  unknown,
  Action<string>
>;

export type CameraActionTypes = SetCameraTargetAction;

export interface CameraState {
  target: MapCoordinate;
}

export type ContentKey = "" | "camera" | "market" | "playerLocation" | "travel";

export type Controller = {
  router: Router;
};

export type Domain = string | undefined;

export interface GameState {
  camera: CameraState;
  modal: ModalState;
  player: PlayerState;
}

export interface Item {
  description: string;
  inventory: number;
  name: string;
  price: number;
}

export type MapCoordinate = [xCoordinate, yCoordinate, zCoordinate];

export interface MenuType {
  name: "camera" | "market" | "travel" | "playerLocation";
  title: string;
}

export type ModalActionTypes =
  | SetModalContentKeyAction
  | SetModalIsOpenAction
  | SetModalTitleAction;

export interface ModalState {
  contentKey: ContentKey;
  isOpen: boolean;
  title: string;
}

export type PlayerActionTypes =
  | SetPlayerDestinationAction
  | SetPlayerDockedStationAction
  | SetPlayerEtaAction
  | SetPlayerIsTravelingAction
  | SetPlayerLocationAction
  | SetPlayerTravelDistance
  | SetPlayerTravelDuration;

export interface PlayerState {
  destination: Station | null;
  dockedStation: Station | null;
  eta: number | null;
  isTraveling: boolean;
  location: MapCoordinate;
  travelDistance: number | null;
  travelDuration: number | null;
}

export interface SetCameraTargetAction {
  type: "SET_CAMERA_TARGET";
  payload: {
    target: MapCoordinate;
  };
}

export interface SetModalContentKeyAction {
  type: "SET_MODAL_CONTENT_KEY";
  payload: {
    contentKey: ContentKey;
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

export interface SetPlayerDestinationAction {
  type: "SET_PLAYER_DESTINATION";
  payload: {
    destination: Station | null;
  };
}

export interface SetPlayerDockedStationAction {
  type: "SET_PLAYER_DOCKED_STATION";
  payload: { dockedStation: Station | null };
}

export interface SetPlayerEtaAction {
  type: "SET_PLAYER_ETA";
  payload: {
    eta: number | null;
  };
}

export interface SetPlayerIsTravelingAction {
  type: "SET_PLAYER_IS_TRAVELING";
  payload: {
    isTraveling: boolean;
  };
}

export interface SetPlayerLocationAction {
  type: "SET_PLAYER_LOCATION";
  payload: {
    location: MapCoordinate;
  };
}

export interface SetPlayerTravelDistance {
  type: "SET_PLAYER_TRAVEL_DISTANCE";
  payload: { travelDistance: number | null };
}

export interface SetPlayerTravelDuration {
  type: "SET_PLAYER_TRAVEL_DURATION";
  payload: { travelDuration: number | null };
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

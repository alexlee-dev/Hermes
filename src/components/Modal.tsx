import * as React from "react";
import CameraContent from "../modalContent/Camera";

import MarketContent from "../modalContent/Market";
import TravelContent from "../modalContent/Travel";
import UserLocation from "../modalContent/UserLocation";

import { CameraTarget, MapCoordinate, Station } from "../types";

export interface ModalProps {
  cameraTarget: CameraTarget;
  content: string;
  display: boolean;
  setCameraTarget: (cameraTarget: CameraTarget) => void;
  setEta: (eta: number) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setUserDestination: (userDestination: Station) => void;
  setUserIsTraveling: (userIsTraveling: boolean) => void;
  title: string;
  userIsTraveling: boolean;
  userLocation: MapCoordinate;
}

const contents: { [index: string]: React.FunctionComponent<any> } = {
  camera: CameraContent,
  market: MarketContent,
  travel: TravelContent,
  userLocation: UserLocation,
};

const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
  const {
    cameraTarget,
    content,
    display,
    setCameraTarget,
    setEta,
    setModalIsOpen,
    setUserDestination,
    setUserIsTraveling,
    title,
    userIsTraveling,
    userLocation,
  } = props;

  const Content = contents[content];

  return display ? (
    <div className="modal">
      <button onClick={() => setModalIsOpen(false)} type="button">
        x
      </button>
      <h1>{title}</h1>
      <Content
        cameraTarget={cameraTarget}
        setCameraTarget={setCameraTarget}
        setEta={setEta}
        setModalIsOpen={setModalIsOpen}
        setUserDestination={setUserDestination}
        setUserIsTraveling={setUserIsTraveling}
        userIsTraveling={userIsTraveling}
        userLocation={userLocation}
      />
    </div>
  ) : null;
};

export default Modal;

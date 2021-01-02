import * as React from "react";

import TravelContent from "../modalContent/Travel";
import UserLocation from "../modalContent/UserLocation";

import { MapCoordinate, Station } from "../types";

export interface ModalProps {
  content: string;
  display: boolean;
  setEta: (eta: number) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setUserDestination: (userDestination: Station) => void;
  setUserIsTraveling: (userIsTraveling: boolean) => void;
  title: string;
  userIsTraveling: boolean;
  userLocation: MapCoordinate;
}

const contents: { [index: string]: React.FunctionComponent<any> } = {
  travel: TravelContent,
  userLocation: UserLocation,
};

const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
  const {
    content,
    display,
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

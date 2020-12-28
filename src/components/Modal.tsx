import * as React from "react";

import TravelContent from "../modalContent/Travel";
import { Station } from "../types";

export interface ModalProps {
  content: string;
  display: boolean;
  setEta: (eta: number) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setUserDestination: (userDestination: Station) => void;
  setUserIsTraveling: (userIsTraveling: boolean) => void;
  title: string;
  userLocation: Station;
}

const contents: { [index: string]: React.FunctionComponent<any> } = {
  travel: TravelContent,
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
        userLocation={userLocation}
      />
    </div>
  ) : null;
};

export default Modal;

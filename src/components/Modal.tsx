import * as React from "react";

import TravelContent from "../modalContent/Travel";
import { stations } from "../constants";

export interface ModalProps {
  content: string;
  display: boolean;
  setEta: (eta: number) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setUserIsTraveling: (userIsTraveling: boolean) => void;
  title: string;
  userLocation: [number, number];
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
        setUserIsTraveling={setUserIsTraveling}
        stations={stations}
        userLocation={userLocation}
      />
    </div>
  ) : null;
};

export default Modal;

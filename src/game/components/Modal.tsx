import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import CameraContent from "../modalContent/Camera";
import MarketContent from "../modalContent/Market";
import TravelContent from "../modalContent/Travel";
import PlayerLocation from "../modalContent/PlayerLocation";

import { handleSetModalIsOpen } from "../redux/actions/modal";

import { GameState } from "../../types";

const mapState = (state: GameState) => ({
  contentKey: state.modal.contentKey,
  isOpen: state.modal.isOpen,
  title: state.modal.title,
});

const mapDispatch = {
  handleSetModalIsOpen,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ModalProps = PropsFromRedux;

// TODO - Figure out how to correctly type these connected components
const contents: {
  // eslint-disable-next-line
  [index: string]: any;
} = {
  camera: CameraContent,
  market: MarketContent,
  playerLocation: PlayerLocation,
  travel: TravelContent,
};

const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
  const { contentKey, handleSetModalIsOpen, isOpen, title } = props;

  const Content = contents[contentKey];

  return isOpen ? (
    <div className="modal">
      <button onClick={() => handleSetModalIsOpen(false)} type="button">
        x
      </button>
      <h1>{title}</h1>
      <Content />
    </div>
  ) : null;
};

export default connector(Modal);

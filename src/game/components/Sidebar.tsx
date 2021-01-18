import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../types";

import SidebarButton from "./SidebarButton";

const mapState = (state: RootState) => ({
  modalIsOpen: state.modal.isOpen,
  playerEta: state.player.eta,
  playerIsTraveling: state.player.isTraveling,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SidebarProps = PropsFromRedux;

const Sidebar: React.FunctionComponent<SidebarProps> = (
  props: SidebarProps
) => {
  const { modalIsOpen, playerEta, playerIsTraveling } = props;

  return (
    <div className={modalIsOpen ? "blur" : undefined} id="game-display">
      <h1>Hermes</h1>
      <div>
        <SidebarButton
          iconLocation="/assets/compass.svg"
          label="Player Location"
          menuType={{ name: "playerLocation", title: "Player Location" }}
        />
        {!playerIsTraveling && (
          <SidebarButton
            iconLocation="/assets/map.svg"
            label="Travel"
            menuType={{ name: "travel", title: "Travel" }}
          />
        )}
        <SidebarButton
          iconLocation="/assets/graph-up.svg"
          label="Market"
          menuType={{ name: "market", title: "Market" }}
        />
        <SidebarButton
          iconLocation="/assets/camera-reels.svg"
          label="Camera"
          menuType={{ name: "camera", title: "Camera" }}
        />
        {playerIsTraveling && playerEta && (
          <div>
            <h3>ETA</h3>
            {playerEta}
          </div>
        )}
      </div>
    </div>
  );
};

export default connector(Sidebar);

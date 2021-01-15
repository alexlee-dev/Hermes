import * as React from "react";

import SidebarButton from "./SidebarButton";

export interface SidebarProps {
  eta: number | null;
  modalIsOpen: boolean;
  setModalContent: (modalContent: string) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setModalTitle: (modalTitle: string) => void;
  userIsTraveling: boolean;
}

const Sidebar: React.FunctionComponent<SidebarProps> = (
  props: SidebarProps
) => {
  const {
    eta,
    modalIsOpen,
    setModalContent,
    setModalIsOpen,
    setModalTitle,
    userIsTraveling,
  } = props;

  return (
    <div className={modalIsOpen ? "blur" : undefined} id="game-display">
      <h1>Hermes</h1>
      <div>
        <SidebarButton
          iconLocation="/assets/compass.svg"
          label="User Location"
          menuType={{ name: "userLocation", title: "User Location" }}
          setModalContent={setModalContent}
          setModalIsOpen={setModalIsOpen}
          setModalTitle={setModalTitle}
        />
        {!userIsTraveling && (
          <SidebarButton
            iconLocation="/assets/map.svg"
            label="Travel"
            menuType={{ name: "travel", title: "Travel" }}
            setModalContent={setModalContent}
            setModalIsOpen={setModalIsOpen}
            setModalTitle={setModalTitle}
          />
        )}
        <SidebarButton
          iconLocation="/assets/graph-up.svg"
          label="Market"
          menuType={{ name: "market", title: "Market" }}
          setModalContent={setModalContent}
          setModalIsOpen={setModalIsOpen}
          setModalTitle={setModalTitle}
        />
        <SidebarButton
          iconLocation="/assets/camera-reels.svg"
          label="Camera"
          menuType={{ name: "camera", title: "Camera" }}
          setModalContent={setModalContent}
          setModalIsOpen={setModalIsOpen}
          setModalTitle={setModalTitle}
        />
        {userIsTraveling && eta && (
          <div>
            <h3>ETA</h3>
            {eta}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

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
          icon="far fa-location-circle"
          label="User Location"
          menuType={{ name: "userLocation", title: "User Location" }}
          setModalContent={setModalContent}
          setModalIsOpen={setModalIsOpen}
          setModalTitle={setModalTitle}
        />
        {!userIsTraveling && (
          <SidebarButton
            icon="far fa-map-marked"
            label="Travel"
            menuType={{ name: "travel", title: "Travel" }}
            setModalContent={setModalContent}
            setModalIsOpen={setModalIsOpen}
            setModalTitle={setModalTitle}
          />
        )}
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

import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { MenuType, ModalActionTypes, RootState } from "../../types";

const mapState = (state: RootState) => ({});

const mapDispatch = {
  handleSetModalContentKey: (contentKey: string): ModalActionTypes => ({
    type: "SET_MODAL_CONTENT_KEY",
    payload: {
      contentKey,
    },
  }),
  handleSetModalIsOpen: (isOpen: boolean): ModalActionTypes => ({
    type: "SET_MODAL_IS_OPEN",
    payload: {
      isOpen,
    },
  }),
  handleSetModalTitle: (title: string): ModalActionTypes => ({
    type: "SET_MODAL_TITLE",
    payload: {
      title,
    },
  }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SidebarButtonProps = PropsFromRedux & {
  iconLocation: string;
  label: string;
  menuType: MenuType;
};

const SidebarButton: React.SFC<SidebarButtonProps> = (
  props: SidebarButtonProps
) => {
  const {
    handleSetModalContentKey,
    handleSetModalIsOpen,
    handleSetModalTitle,
    iconLocation,
    label,
    menuType,
  } = props;

  const handleOpenSidebarMenu = (menuType: MenuType) => {
    handleSetModalContentKey(menuType.name);
    handleSetModalTitle(menuType.title);
    handleSetModalIsOpen(true);
  };

  return (
    <button
      aria-label={label}
      className="sidebar__button"
      data-tip={label}
      data-type="info"
      onClick={() => handleOpenSidebarMenu(menuType)}
      type="button"
    >
      <img alt={label} src={iconLocation} />
    </button>
  );
};

export default connector(SidebarButton);

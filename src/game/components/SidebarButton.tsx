import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import {
  handleSetModalContentKey,
  handleSetModalIsOpen,
  handleSetModalTitle,
} from "../redux/actions/modal";

import { MenuType } from "../../types";

const mapDispatch = {
  handleSetModalContentKey,
  handleSetModalIsOpen,
  handleSetModalTitle,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SidebarButtonProps = PropsFromRedux & {
  iconLocation: string;
  label: string;
  menuType: MenuType;
};

const SidebarButton: React.FunctionComponent<SidebarButtonProps> = (
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

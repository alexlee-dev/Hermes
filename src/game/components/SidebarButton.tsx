import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { handleOpenSidebarMenu } from "../redux/thunks";

import { MenuType } from "../../types";

const mapDispatch = {
  handleOpenSidebarMenu,
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
  const { handleOpenSidebarMenu, iconLocation, label, menuType } = props;

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

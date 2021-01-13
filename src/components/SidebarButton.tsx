import * as React from "react";

import { MenuType } from "../types";

export interface SidebarButtonProps {
  icon: string;
  label: string;
  menuType: MenuType;
  setModalContent: (modalContent: string) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setModalTitle: (modalTitle: string) => void;
}

const SidebarButton: React.SFC<SidebarButtonProps> = (
  props: SidebarButtonProps
) => {
  const {
    icon,
    label,
    menuType,
    setModalContent,
    setModalIsOpen,
    setModalTitle,
  } = props;

  const handleOpenSidebarMenu = (menuType: MenuType) => {
    setModalContent(menuType.name);
    setModalTitle(menuType.title);
    setModalIsOpen(true);
  };

  return (
    <button
      aria-label={label}
      data-tip={label}
      data-type="info"
      onClick={() => handleOpenSidebarMenu(menuType)}
      type="button"
    >
      <i className={icon} />
    </button>
  );
};

export default SidebarButton;

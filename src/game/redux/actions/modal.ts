import { ContentKey, ModalActionTypes } from "../../../types";

export const handleSetModalContentKey = (
  contentKey: ContentKey
): ModalActionTypes => ({
  type: "SET_MODAL_CONTENT_KEY",
  payload: {
    contentKey,
  },
});

export const handleSetModalIsOpen = (isOpen: boolean): ModalActionTypes => ({
  type: "SET_MODAL_IS_OPEN",
  payload: {
    isOpen,
  },
});

export const handleSetModalTitle = (title: string): ModalActionTypes => ({
  type: "SET_MODAL_TITLE",
  payload: {
    title,
  },
});

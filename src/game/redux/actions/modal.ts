import { ModalActionTypes } from "../../../types";

const SET_MODAL_CONTENT_KEY = "SET_MODAL_CONTENT_KEY";
const SET_MODAL_IS_OPEN = "SET_MODAL_IS_OPEN";
const SET_MODAL_TITLE = "SET_MODAL_TITLE";

export const setModalContentKey = (contentKey: string): ModalActionTypes => ({
  type: SET_MODAL_CONTENT_KEY,
  payload: {
    contentKey,
  },
});

export const setModalIsOpen = (isOpen: boolean): ModalActionTypes => ({
  type: SET_MODAL_IS_OPEN,
  payload: {
    isOpen,
  },
});

export const setModalTitle = (title: string): ModalActionTypes => ({
  type: SET_MODAL_TITLE,
  payload: {
    title,
  },
});

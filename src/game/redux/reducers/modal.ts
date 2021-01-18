import { ModalActionTypes, ModalState } from "../../../types";

const modalDefaultState: ModalState = {
  contentKey: "",
  isOpen: false,
  title: "",
};

export default (
  state = modalDefaultState,
  action: ModalActionTypes
): ModalState => {
  switch (action.type) {
    case "SET_MODAL_CONTENT_KEY":
      return { ...state, contentKey: action.payload.contentKey };
    case "SET_MODAL_IS_OPEN":
      return { ...state, isOpen: action.payload.isOpen };
    case "SET_MODAL_TITLE":
      return { ...state, title: action.payload.title };
    default:
      return state;
  }
};

import { CameraActionTypes, CameraState } from "../../../types";

const cameraDefaultState: CameraState = {
  target: "ship",
};

export default (
  state = cameraDefaultState,
  action: CameraActionTypes
): CameraState => {
  switch (action.type) {
    case "SET_CAMERA_TARGET":
      return { ...state, target: action.payload.target };
    default:
      return state;
  }
};

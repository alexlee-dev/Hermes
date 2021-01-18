import { CameraActionTypes, CameraTarget } from "../../../types";

const SET_CAMERA_TARGET = "SET_CAMERA_TARGET";

export const setCameraTarget = (target: CameraTarget): CameraActionTypes => {
  return {
    type: SET_CAMERA_TARGET,
    payload: {
      target,
    },
  };
};

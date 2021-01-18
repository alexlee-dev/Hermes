import { CameraActionTypes, CameraTarget } from "../../../types";

export const handleSetCameraTarget = (
  target: CameraTarget
): CameraActionTypes => {
  return {
    type: "SET_CAMERA_TARGET",
    payload: {
      target,
    },
  };
};

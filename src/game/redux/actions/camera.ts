import { CameraActionTypes, MapCoordinate } from "../../../types";

export const handleSetCameraTarget = (
  target: MapCoordinate
): CameraActionTypes => {
  return {
    type: "SET_CAMERA_TARGET",
    payload: {
      target,
    },
  };
};

import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { stations } from "../constants";

import { CameraActionTypes, CameraTarget, RootState } from "../../types";

const mapState = (state: RootState) => ({
  cameraTarget: state.camera.target,
});

const mapDispatch = {
  handleSetCameraTarget: (target: CameraTarget): CameraActionTypes => ({
    type: "SET_CAMERA_TARGET",
    payload: {
      target,
    },
  }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CameraContentProps = PropsFromRedux;

const CameraContent: React.FunctionComponent<CameraContentProps> = (
  props: CameraContentProps
) => {
  const { cameraTarget, handleSetCameraTarget } = props;

  const handleCameraTargetChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleSetCameraTarget(e.target.value);
    const event = new CustomEvent("cameraTargetChange", {
      detail: {
        cameraTarget: e.target.value,
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <h3>Camera</h3>
      <form>
        <label htmlFor="cameraTarget">Camera Target</label>
        <select
          id="cameraTarget"
          onChange={handleCameraTargetChange}
          value={cameraTarget}
        >
          <option value="ship">User Ship</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default connector(CameraContent);

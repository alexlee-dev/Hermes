import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { stations } from "../constants";

import { handleSetCameraTarget } from "../redux/actions/camera";

import { GameState } from "../../types";

const mapState = (state: GameState) => ({
  cameraTarget: state.camera.target,
  playerLocation: state.player.location,
});

const mapDispatch = {
  handleSetCameraTarget,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CameraContentProps = PropsFromRedux;

const CameraContent: React.FunctionComponent<CameraContentProps> = (
  props: CameraContentProps
) => {
  const { cameraTarget, handleSetCameraTarget, playerLocation } = props;

  return (
    <div>
      <h3>Camera</h3>
      <form>
        <label htmlFor="cameraTarget">Camera Target</label>
        <select
          id="cameraTarget"
          onChange={(e) => {
            const targetValue = e.target.value;
            console.log({ targetValue });
            const parsedVal = JSON.parse(targetValue);
            console.log({ parsedVal });
            handleSetCameraTarget(parsedVal);
          }}
          value={JSON.stringify(cameraTarget)}
        >
          <option value={JSON.stringify(playerLocation)}>Player Ship</option>
          {stations.map((station) => (
            <option key={station.id} value={JSON.stringify(station.location)}>
              {station.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default connector(CameraContent);

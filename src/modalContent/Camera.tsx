import * as React from "react";
import { stations } from "../constants";

import { CameraTarget, Station } from "../types";

interface CameraContentProps {
  cameraTarget: CameraTarget;
  setCameraTarget: (cameraTarget: CameraTarget) => void;
  setEta: (eta: number) => void;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  setUserDestination: (userDestination: Station) => void;
  setUserIsTraveling: (userIsTraveling: boolean) => void;
  userLocation: [number, number];
}

const CameraContent: React.FunctionComponent<CameraContentProps> = (
  props: CameraContentProps
) => {
  const { cameraTarget, setCameraTarget } = props;

  const handleCameraTargetChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCameraTarget(e.target.value);
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

export default CameraContent;

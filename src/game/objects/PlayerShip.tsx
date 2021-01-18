import * as React from "react";
import * as THREE from "three";

import { createLabel } from "../util";

interface PlayerShipProps {
  label: string;
  x: number;
  y: number;
  z: number;
}

class PlayerShip extends React.Component<unknown, unknown> {
  constructor(props: PlayerShipProps) {
    super(props);
    this.state = {};
    this.label = props.label;
    this.object = new THREE.Object3D();
    this.x = props.x;
    this.y = props.y;
    this.z = props.z;
    this.init();
  }

  label: string;
  object: THREE.Object3D;
  x: number;
  y: number;
  z: number;

  init(): void {
    // * Create Player Ship Mesh
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: "red" });
    const mesh = new THREE.Mesh(geometry, material);

    // * Create Player Ship Label
    const label = createLabel(
      this.label,
      "red",
      "white",
      this.object.position.x,
      this.object.position.y + 1.5,
      this.object.position.z
    );

    this.object.add(mesh);
    this.object.add(label);
    this.object.position.set(this.x, this.y, this.z);
  }

  // update(timestamp?: number): void {}
}

export default PlayerShip;

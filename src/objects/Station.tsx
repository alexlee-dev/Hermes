import * as React from "react";
import * as THREE from "three";

import { createLabel } from "../util";

interface StationProps {
  color: string;
  depth: number;
  height: number;
  label: string;
  width: number;
  x: number;
  y: number;
  z: number;
}

class Station extends React.Component<unknown, unknown> {
  constructor(props: StationProps) {
    super(props);
    this.state = {};
    this.color = props.color;
    this.depth = props.depth;
    this.height = props.height;
    this.label = props.label;
    this.object = new THREE.Object3D();
    this.width = props.width;
    this.x = props.x;
    this.y = props.y;
    this.z = props.z;
    this.init();
  }

  color: string;
  depth: number;
  height: number;
  label: string;
  object: THREE.Object3D;
  width: number;
  x: number;
  y: number;
  z: number;

  init(): void {
    // * Create Station Mesh
    const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    const material = new THREE.MeshPhongMaterial({ color: this.color });
    const mesh = new THREE.Mesh(geometry, material);

    // * Create Station Label
    const label = createLabel(
      this.label,
      "blue",
      "white",
      this.object.position.x,
      this.object.position.y - 1.5,
      this.object.position.z
    );

    this.object.add(mesh);
    this.object.add(label);
    this.object.position.set(this.x, this.y, this.z);
  }

  // update(timestamp?: number): void {}
}

export default Station;

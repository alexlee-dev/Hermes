import * as React from "react";
import * as THREE from "three";

class Starfield extends React.Component<unknown, unknown> {
  constructor(props: unknown) {
    super(props);
    this.state = {};
    this.object = new THREE.Object3D();
    this.init();
  }

  object: THREE.Object3D;

  init(): void {
    const geometry = new THREE.SphereGeometry(1000, 50, 50);
    const texture = new THREE.TextureLoader().load(
      "../assets/galaxy_starfield.png"
    );
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
      shininess: 0,
    });
    const mesh = new THREE.Mesh(geometry, material);

    this.object.add(mesh);
  }
}

export default Starfield;

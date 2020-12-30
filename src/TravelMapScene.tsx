import * as React from "react";
import * as THREE from "three";
import {
  DirectionalLight,
  GridHelper,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class TravelMapScene extends React.Component<unknown, unknown> {
  constructor(props: unknown) {
    super(props);
    this.state = {};
  }

  // * Properties
  camera!: PerspectiveCamera;
  container!: HTMLDivElement | null;
  directionalLight!: DirectionalLight;
  grid!: GridHelper;
  orbitControls!: OrbitControls;
  renderer!: WebGL1Renderer;
  scene!: Scene;
  station1!: Mesh;
  station2!: Mesh;
  station3!: Mesh;
  userShip!: Mesh;

  // * -------------------------
  // * Lifecycle Events
  // * -------------------------
  componentDidMount(): void {
    this.init();
  }

  // * -------------------------
  // * Methods
  // * -------------------------
  createObjects(): void {
    // * Light
    this.directionalLight = new DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(0, -900, 1200);
    this.scene.add(this.directionalLight);

    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    (window as any).camera = this.camera;

    // * Grid
    const gridHelper = new THREE.GridHelper(100, 10);
    gridHelper.rotation.set(1.57, 0, 0);
    this.scene.add(gridHelper);

    (window as any).gridHelper = gridHelper;

    // * User Ship
    const userShipGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const userShipMaterial = new THREE.MeshPhongMaterial({ color: "red" });
    this.userShip = new THREE.Mesh(userShipGeometry, userShipMaterial);
    this.userShip.position.set(0, 0, 0);
    this.scene.add(this.userShip);

    // * Station 1
    const station1Geometry = new THREE.BoxGeometry(1, 1, 1);
    const station1Material = new THREE.MeshPhongMaterial({ color: "blue" });
    this.station1 = new THREE.Mesh(station1Geometry, station1Material);
    this.station1.position.set(0, 0, 0);
    this.scene.add(this.station1);

    // * Station 2
    const station2Geometry = new THREE.BoxGeometry(1, 1, 1);
    const station2Material = new THREE.MeshPhongMaterial({ color: "green" });
    this.station2 = new THREE.Mesh(station2Geometry, station2Material);
    this.station2.position.set(10, 0, 0);
    this.scene.add(this.station2);

    // * Station 3
    const station3Geometry = new THREE.BoxGeometry(1, 1, 1);
    const station3Material = new THREE.MeshPhongMaterial({ color: "yellow" });
    this.station3 = new THREE.Mesh(station3Geometry, station3Material);
    this.station3.position.set(20, 0, 0);
    this.scene.add(this.station3);

    (window as any).userShip = this.userShip;
  }

  init(): void {
    // * Setup base scene
    this.setupBaseScene();
    this.createObjects();
    this.setupListeners();

    this.tick = this.tick.bind(this);
    this.tick();
  }

  setupBaseScene(): void {
    // * Setup Scene
    this.scene = new THREE.Scene();
    // * Setup Camera
    const height = window.innerHeight * 0.33;
    const width = height;
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 10000;
    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    this.camera.position.set(0, 0, 50);
    // * Setup Renderer
    this.renderer = new THREE.WebGL1Renderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    // * Append to Container
    if (this.container) {
      this.container.appendChild(this.renderer.domElement);
    }
  }

  setupListeners(): void {
    window.addEventListener(
      "resize",
      () => {
        const height = window.innerHeight * 0.33;
        const width = height;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      },
      false
    );
  }

  tick(): void {
    this.update();

    requestAnimationFrame(this.tick);
  }

  update(): void {
    this.renderer.render(this.scene, this.camera);

    // * Additional updates
    this.orbitControls.update();
  }

  // * -------------------------
  // * Component Output
  // * -------------------------
  render(): JSX.Element {
    return (
      <div
        id="scene"
        ref={(container) => {
          if (container) {
            this.container = container;
          }
        }}
      ></div>
    );
  }
}

export default TravelMapScene;

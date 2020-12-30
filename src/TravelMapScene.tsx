import * as React from "react";
import * as THREE from "three";
import {
  DirectionalLight,
  GridHelper,
  Mesh,
  Object3D,
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

  createLabel(
    text: string,
    backgroundColor: string,
    textColor: string,
    positionX: number,
    positionY: number,
    positionZ: number
  ): Object3D {
    const size = 32;
    const baseWidth = 150;
    const borderSize = 2;
    const ctx = document.createElement("canvas").getContext("2d");
    const font = `${size}px bold sans-serif`;
    if (!ctx) {
      throw new Error("No ctx!");
    }
    ctx.font = font;
    const textWidth = ctx.measureText(text).width;
    const doubleBorderSize = borderSize * 2;
    const width = baseWidth + doubleBorderSize;
    const height = size + doubleBorderSize;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    // need to set font again after resizing canvas
    ctx.font = font;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // scale to fit but don't stretch
    const scaleFactor = Math.min(1, baseWidth / textWidth);
    ctx.translate(width / 2, height / 2);
    ctx.scale(scaleFactor, 1);
    ctx.fillStyle = textColor;
    ctx.fillText(text, 0, 0);
    const canvas = ctx.canvas;

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const labelMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    });

    const labelBaseScale = 0.01;
    const label = new THREE.Sprite(labelMaterial);

    const root = new THREE.Object3D();
    root.add(label);

    label.position.set(positionX, positionY, positionZ);
    label.scale.x = canvas.width * labelBaseScale;
    label.scale.y = canvas.height * labelBaseScale;
    this.scene.add(root);

    return root;
  }

  createLabels(): void {
    const userShipLabel = this.createLabel(
      "Ship",
      "blue",
      "white",
      this.userShip.position.x,
      this.userShip.position.y - 1.5,
      this.userShip.position.z
    );
    this.scene.add(userShipLabel);

    const station1Label = this.createLabel(
      "Station 1",
      "blue",
      "white",
      this.station1.position.x,
      this.station1.position.y - 1.5,
      this.station1.position.z
    );
    this.scene.add(station1Label);

    const station2Label = this.createLabel(
      "Station 2",
      "blue",
      "white",
      this.station2.position.x,
      this.station2.position.y - 1.5,
      this.station2.position.z
    );
    this.scene.add(station2Label);

    const station3Label = this.createLabel(
      "Station 3",
      "blue",
      "white",
      this.station3.position.x,
      this.station3.position.y - 1.5,
      this.station3.position.z
    );
    this.scene.add(station3Label);
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
    this.createLabels();
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

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

import { stations } from "./constants";

import { ShipTravelEvent } from "./types";

// TODO - User ship label does not move with the ship
// TODO - User ship can only be animated on the x axis currently
class TravelMapScene extends React.Component<unknown, unknown> {
  constructor(props: unknown) {
    super(props);
    this.state = {};
    this.userIsTraveling = false;
  }

  // * Properties
  camera!: PerspectiveCamera;
  container!: HTMLDivElement | null;
  directionalLight!: DirectionalLight;
  grid!: GridHelper;
  orbitControls!: OrbitControls;
  renderer!: WebGL1Renderer;
  scene!: Scene;
  travelDistance?: number;
  travelDuration?: number;
  travelStartTimestamp?: number;
  userIsTraveling: boolean;
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

    return root;
  }

  createLabels(): void {
    const labels = [
      {
        text: "Ship",
        x: this.userShip.position.x,
        y: this.userShip.position.y - 1.5,
        z: this.userShip.position.z,
      },
    ];

    stations.forEach((station) => {
      labels.push({
        text: station.name,
        x: station.location[0],
        y: station.location[1] - 1.5,
        z: 0,
      });
    });

    labels.forEach((label) => {
      const object = this.createLabel(
        label.text,
        "blue",
        "white",
        label.x,
        label.y,
        label.z
      );
      this.scene.add(object);
    });
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

    // * Grid
    const gridHelper = new THREE.GridHelper(100, 10);
    gridHelper.rotation.set(1.57, 0, 0);
    this.scene.add(gridHelper);

    // * User Ship
    const userShipGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const userShipMaterial = new THREE.MeshPhongMaterial({ color: "red" });
    this.userShip = new THREE.Mesh(userShipGeometry, userShipMaterial);
    this.userShip.position.set(0, 0, 0);
    this.scene.add(this.userShip);

    // * Stations
    stations.forEach((station) => {
      const geometry = new THREE.BoxGeometry(
        station.width,
        station.height,
        station.depth
      );
      const material = new THREE.MeshPhongMaterial({ color: station.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(station.location[0], station.location[1], 0);
      this.scene.add(mesh);
    });
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

    window.addEventListener("shipTravel", (e: ShipTravelEvent) => {
      if (!e.detail) {
        throw new Error("No detail!");
      }
      console.log("SHIP TRAVELING");
      this.userIsTraveling = true;
      this.travelDistance = e.detail.travelDistance;
      this.travelDuration = e.detail.travelDuration;
    });
  }

  tick(timestamp?: number): void {
    if (timestamp && this.userIsTraveling) {
      if (!this.travelDuration || !this.travelDistance) {
        throw new Error("Not enough info!");
      }
      if (this.travelStartTimestamp === undefined)
        this.travelStartTimestamp = timestamp;
      // * elapsed is time elapsed since ship began moving, in miliseconds.
      const elapsed = timestamp - this.travelStartTimestamp;

      const journeyPercentage = elapsed / this.travelDuration;

      this.userShip.position.set(
        this.travelDistance * journeyPercentage,
        this.userShip.position.y,
        this.userShip.position.z
      );

      if (elapsed >= this.travelDuration) {
        // * Stop the animation after duration of travel
        console.log("STOP");
        this.userIsTraveling = false;
      }
    }

    this.renderer.render(this.scene, this.camera);

    // * Additional updates
    this.orbitControls.update();

    requestAnimationFrame(this.tick);
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

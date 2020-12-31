import * as React from "react";
import * as THREE from "three";
import {
  DirectionalLight,
  GridHelper,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { stations } from "./constants";
import Station from "./objects/Station";
import UserShip from "./objects/UserShip";

import { ShipTravelEvent } from "./types";

// TODO - Camera should follow user ship
// TODO - User ship can only be animated on the x axis currently
// TODO - ability to have camera focus on other objects
// TODO - I don't think you can go from Station 1 to Station 2 and Station 1 again correctly. Fix it.
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
  userShip!: Object3D;

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

    // * Grid
    const gridHelper = new THREE.GridHelper(100, 10);
    gridHelper.rotation.set(1.57, 0, 0);
    this.scene.add(gridHelper);

    // * User Ship
    const userShipObject = new UserShip({
      label: "User Ship",
      x: 0,
      y: 0,
      z: 0,
    });
    this.userShip = userShipObject.object;
    this.scene.add(userShipObject.object);

    // * Stations
    stations.forEach((station) => {
      const stationObject = new Station({
        color: station.color,
        depth: station.depth,
        height: station.height,
        label: station.name,
        width: station.width,
        x: station.location[0],
        y: station.location[1],
        z: 0,
      });
      this.scene.add(stationObject.object);
    });
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

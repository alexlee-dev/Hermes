import * as React from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {
  DirectionalLight,
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

// TODO - Move Market into it's own Sidebar Menu
// TODO - ability to have camera focus on other objects
// TODO - See if you can refactor what logic goes in what file(s)
// TODO - "Space" background/atmosphere
// TODO - Ability to show labels only on hover / all the time / never
class GameScene extends React.Component<unknown, unknown> {
  constructor(props: unknown) {
    super(props);
    this.state = {};
    this.userIsTraveling = false;
  }

  // * Properties
  camera!: PerspectiveCamera;
  container!: HTMLDivElement | null;
  directionalLight!: DirectionalLight;
  orbitControls!: OrbitControls;
  renderer!: WebGL1Renderer;
  scene!: Scene;
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
        z: station.location[2],
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
    const height = window.innerHeight;
    const width = window.innerWidth;
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
        const height = window.innerHeight;
        const width = window.innerWidth;
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

      const tween = new TWEEN.Tween({
        x: this.userShip.position.x,
        y: this.userShip.position.y,
        z: this.userShip.position.z,
      })
        .to(
          {
            // * The 0.75 makes the ship appear to "dock" with the station, instead of just getting "consumed" by it
            x: e.detail.travelDestination.location[0] - 0.75,
            y: e.detail.travelDestination.location[1],
            z: e.detail.travelDestination.location[2],
          },
          e.detail.travelDuration
        )
        .easing(TWEEN.Easing.Quintic.InOut)
        .onUpdate((posObj) => {
          this.userShip.position.set(posObj.x, posObj.y, posObj.z);
        })
        .onComplete((posObj) => {
          console.log("STOP");
          (window as any).travelComplete = true;
        });

      console.log("SHIP TRAVELING");
      (window as any).travelComplete = false;
      tween.start();
      this.userIsTraveling = true;
    });
  }

  tick(timestamp?: number): void {
    TWEEN.update(timestamp);

    this.renderer.render(this.scene, this.camera);

    // * Focus orbit camera on the user ship
    this.orbitControls.target.set(
      this.userShip.position.x,
      this.userShip.position.y,
      this.userShip.position.z
    );
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

export default GameScene;

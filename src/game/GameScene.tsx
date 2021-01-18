import * as React from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {
  AmbientLight,
  DirectionalLight,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { stations } from "./constants";
import Starfield from "./objects/Starfield";
import Station from "./objects/Station";
import UserShip from "./objects/UserShip";

import { CameraTargetChangeEvent, ShipTravelEvent } from "../types";

class GameScene extends React.Component<unknown, unknown> {
  constructor(props: unknown) {
    super(props);
    this.state = {};
    // TODO - Get this value from Redux;
    this.userIsTraveling = false;
    this.cameraTarget = undefined;
  }

  // * Properties
  ambientLight!: AmbientLight;
  camera!: PerspectiveCamera;
  cameraTarget: Object3D | undefined;
  container!: HTMLDivElement | null;
  directionalLight!: DirectionalLight;
  orbitControls!: OrbitControls;
  renderer!: WebGL1Renderer;
  scene!: Scene;
  starfield!: Object3D;
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
    this.ambientLight = new AmbientLight(0x888888);
    this.directionalLight = new DirectionalLight(0xfdfcf0, 1);
    this.directionalLight.position.set(20, 10, 20);
    this.scene.add(this.directionalLight);
    this.scene.add(this.ambientLight);

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
        id: station.id,
        label: station.name,
        width: station.width,
        x: station.location[0],
        y: station.location[1],
        z: station.location[2],
      });
      this.scene.add(stationObject.object);
    });

    // * Starfield
    const starfield = new Starfield({});
    this.starfield = starfield.object;
    (window as any).starfield = this.starfield;
    this.scene.add(this.starfield);
  }

  init(): void {
    // * Setup base scene
    this.setupBaseScene();
    this.createObjects();
    this.setupListeners();
    this.cameraTarget = this.userShip;

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
            // TODO - Use values from Redux
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

    window.addEventListener(
      "cameraTargetChange",
      (e: CameraTargetChangeEvent) => {
        if (!e.detail) {
          throw new Error("No detail!");
        }

        let correspondingObject: Object3D | undefined = this.userShip;
        if (e.detail.cameraTarget !== "ship") {
          correspondingObject = this.scene.children.find(
            (object) =>
              object.userData && object.userData.id === e.detail?.cameraTarget
          );
        }
        this.cameraTarget = correspondingObject;
        if (!this.cameraTarget) {
          throw new Error("No camera target!");
        }
        this.camera.position.set(
          this.cameraTarget.position.x,
          this.cameraTarget.position.y,
          this.cameraTarget.position.z + 10
        );
      }
    );
  }

  tick(timestamp?: number): void {
    TWEEN.update(timestamp);

    this.renderer.render(this.scene, this.camera);

    // * Focus orbit camera on the camera target
    if (!this.cameraTarget) {
      throw new Error("No camera target!");
    }
    this.orbitControls.target.set(
      this.cameraTarget.position.x,
      this.cameraTarget.position.y,
      this.cameraTarget.position.z
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

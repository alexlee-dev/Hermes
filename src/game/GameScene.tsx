import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import * as TWEEN from "@tweenjs/tween.js";
import {
  AmbientLight,
  DirectionalLight,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
  XRFrame,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { stations } from "./constants";
import Starfield from "./objects/Starfield";
import Station from "./objects/Station";
import PlayerShip from "./objects/PlayerShip";

import {
  handleSetPlayerIsTraveling,
  handleSetPlayerLocation,
} from "./redux/actions/player";
import { handleCompleteTravel } from "./redux/thunks";

import { GameState, MapCoordinate } from "../types";

const mapState = (state: GameState) => ({
  cameraTarget: state.camera.target,
  playerDestination: state.player.destination,
  playerDockedStation: state.player.dockedStation,
  playerIsTraveling: state.player.isTraveling,
  playerTravelDuration: state.player.travelDuration,
});

const mapDispatch = {
  handleCompleteTravel,
  handleSetPlayerIsTraveling,
  handleSetPlayerLocation,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type GameSceneProps = PropsFromRedux;

// TODO - Camera position needs to update on tick as well (stay with camera target);
// TODO - OrbitControls seem to be broken (maybe because creating more than 1?)
// TODO - On reload, ship may appear inside the station instead of docked
// TODO - wire back up the camera target change
// TODO - give 'name' proptery on each Object3D in the Scene
const GameScene: React.FunctionComponent<GameSceneProps> = (
  props: GameSceneProps
) => {
  // ! I think there is an issue with rerendering the GameScene when `cameraTarget` changes
  // ! Because when the component is rerendered, the camera position is reset? or is it the orbit controls that is the issue
  // * Try to use saved state like you had to with player position
  const {
    cameraTarget,
    handleCompleteTravel,
    handleSetPlayerIsTraveling,
    handleSetPlayerLocation,
    playerDestination,
    playerIsTraveling,
    playerTravelDuration,
  } = props;

  // * You don't want to use the redux props directly here, because the app will rerender
  // * Instead, use the localStorage version of them. They should be the same
  // * since they are saved every 1 second
  const savedGameState = localStorage.getItem("state");
  const parsedSavedGameState: null | GameState =
    savedGameState && JSON.parse(savedGameState);
  const savedPlayerLocation =
    parsedSavedGameState && parsedSavedGameState.player.location;

  const height = window.innerHeight;
  const width = window.innerWidth;
  const aspectRatio = width / height;
  const fieldOfView = 60;
  const nearPlane = 1;
  const farPlane = 10000;

  const [ambientLight] = React.useState<AmbientLight>(
    new AmbientLight(0x888888)
  );
  const [camera] = React.useState<PerspectiveCamera>(
    new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
  );

  const [container, setContainer] = React.useState<HTMLDivElement | undefined>(
    undefined
  );
  const [directionalLight] = React.useState<DirectionalLight>(
    new DirectionalLight(0xfdfcf0, 1)
  );
  const [renderer] = React.useState<WebGL1Renderer>(
    new WebGL1Renderer({ alpha: true, antialias: true })
  );
  const [orbitControls] = React.useState<OrbitControls>(
    new OrbitControls(camera, renderer.domElement)
  );
  const [playerShip] = React.useState<PlayerShip>(
    new PlayerShip({
      label: "Player SHIP!",
      x: savedPlayerLocation ? savedPlayerLocation[0] : 0,
      y: savedPlayerLocation ? savedPlayerLocation[1] : 0,
      z: savedPlayerLocation ? savedPlayerLocation[2] : 0,
    })
  );
  const [scene] = React.useState<Scene>(new Scene());
  const [starfield] = React.useState<Object3D>(new Starfield({}).object);
  const [stationObjects] = React.useState<Object3D[]>([]);

  React.useEffect(() => {
    // * INITIALIZE
    console.log("INITIALIZE");

    // * Create Stations
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
      scene.add(stationObject.object);
      stationObjects.push(stationObject.object);
    });

    directionalLight.position.set(20, 10, 20);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    // * Add objects to scene
    scene.add(directionalLight);
    scene.add(ambientLight);
    scene.add(playerShip.object);
    scene.add(starfield);

    // * Position Camera
    // ! this is a problem when rerenderes occur?
    console.log({ cameraTarget });
    camera.position.set(cameraTarget[0], cameraTarget[1], cameraTarget[2] + 10);

    // * Listeners
    window.addEventListener(
      "resize",
      () => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      },
      false
    );

    renderer.setAnimationLoop((time: number, frame?: XRFrame) => {
      // * Runs n times per second (usually 60)
      // * This is framerate determined (I think)
      TWEEN.update(time);

      renderer.render(scene, camera);

      // console.log("Updating orbitControls target to:");
      // console.log(cameraTarget);
      // orbitControls.update();
    });
    // * Tick
    // tick();
  }, []);

  // * Initially used to put the canvas into the DOM
  React.useEffect(() => {
    console.log("USE EFFECT() - container");
    if (container) {
      container.appendChild(renderer.domElement);
    }
  }, [container]);

  // * Listens for travel
  React.useEffect(() => {
    console.log("USE EFFECT() - playerIsTraveling");

    if (playerIsTraveling) {
      if (!playerDestination) {
        throw new Error("No playerDestination!");
      }
      if (!playerTravelDuration) {
        throw new Error("No playerTravelDuration!");
      }
      // * Animate the ship with Tween
      const tween = new TWEEN.Tween({
        x: playerShip.object.position.x,
        y: playerShip.object.position.y,
        z: playerShip.object.position.z,
      })
        .to(
          {
            x: playerDestination?.location[0] - 0.75,
            y: playerDestination?.location[1],
            z: playerDestination?.location[2],
          },
          playerTravelDuration
        )
        .onUpdate((posObj: { x: number; y: number; z: number }) => {
          console.log("UPDATE");
          // TODO - Make these the same type (use the object not the array style)
          const coordinate: MapCoordinate = [posObj.x, posObj.y, posObj.z];

          playerShip.object.position.set(
            coordinate[0],
            coordinate[1],
            coordinate[2]
          );
          handleSetPlayerLocation(coordinate);
        })
        .onComplete(() => {
          console.log("COMPLETED!");
          handleCompleteTravel();
        });

      tween.start();
      handleSetPlayerIsTraveling(true);
    }
  }, [playerIsTraveling]);

  // ? Does this need to be in App.tsx?
  // ? Does this just need to be in a Thunk?
  // ! Try and just save the position coordinates to Redux - you don't really care about the whole object
  React.useEffect(() => {
    console.log("USE EFFECT() - cameraTarget");
    orbitControls.target.set(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
    orbitControls.update();
  }, [cameraTarget]);

  // function tick(timestamp?: number): void {
  //   // * Runs n times per second (usually 60)
  //   // * This is framerate determined (I think)
  //   TWEEN.update(timestamp);

  //   renderer.render(scene, camera);

  //   console.log("Updating orbitControls target to:");
  //   console.log(cameraTarget);
  //   orbitControls.target.set(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
  //   orbitControls.update();

  //   // requestAnimationFrame(tick.bind({}));
  // }

  // const tick = (timestamp?: number): void => {
  //   // * Runs n times per second (usually 60)
  //   // * This is framerate determined (I think)

  //   // console.log("TICK()");
  //   TWEEN.update(timestamp);

  //   renderer.render(scene, camera);

  //   console.log("Updating orbitControls target to:");
  //   console.log(cameraTarget);
  //   orbitControls.target.set(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
  //   orbitControls.update();

  //   requestAnimationFrame(tick);
  // };

  console.log("GAMESCENE RENDER");

  (window as any).camera = camera;
  (window as any).orbitControls = orbitControls;

  return (
    <div
      id="scene"
      ref={(containerRef) => {
        if (containerRef) {
          setContainer(containerRef);
        }
      }}
    ></div>
  );
};

export default connector(GameScene);

/*
window.addEventListener(
      "cameraTargetChange",
      (e: CameraTargetChangeEvent) => {
        if (!e.detail) {
          throw new Error("No detail!");
        }

        let correspondingObject: Object3D | undefined = this.props.playerShip
          .object;
        // TODO - Rewrite how this is looked up
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
*/

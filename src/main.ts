import "./style.css";
import * as THREE from "three";
import setupCamera from "./three/basics/camera";
import SizeEventListener from "./three/events/resize";
import RenderScene from "./three/basics/renderer";
import setupScene from "./three/basics/scene";
import setupLight from "./three/basics/light";
import setupController from "./three/basics/controller";
import { FloorMesh } from "./three/mesh";
import BoxMesh from "./three/mesh/box";
import Stats from "stats.js";
import MovementEventListener from "./three/events/movement";
import MouseEventListener from "./three/events/mouse";

let initialData = {
  start: false,
};

// SETUP the FBS READER
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// This is the canvas used for linking the webgl with
const canvas: any = document.querySelector("canvas#webgl");

//setup the scene for the screen
const scene = setupScene();

//setup the light for the scene
setupLight({ scene });

//setup the camera of the scene
const camera = setupCamera({ scene: scene });

const { pointerLockControls } = setupController({
  scene,
  initialData,
  camera,
  canvas,
});

// keyboard movement listeners
let movement = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
};
MovementEventListener({ movement, initialData });

// the floor
FloorMesh({ scene });

// the box
const objects: any = [];
BoxMesh({ scene, objects });

// renderer
const renderer = RenderScene({ canvas, camera, scene });

//resize event listener
SizeEventListener({ camera, renderer });

let raycaster = new THREE.Raycaster();

const clock = new THREE.Clock();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let prevTime = 0;

let mouse = new THREE.Vector2();

MouseEventListener({ camera, initialData, mouse });

const tick = () => {
  if (initialData.start) {
    // this help minimize the framerate while moving
    const elapsedTime = clock.getElapsedTime();
    const delta = elapsedTime - prevTime;
    prevTime = elapsedTime;

    raycaster.setFromCamera(mouse, camera);
    // const intersections = raycaster.intersectObjects(objects, false);

    // this help reduce the speed of the movement because the default one is to fast    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.x -= velocity.x * 10.0 * delta;

    // this tell which way is the movement happening and normalize the direction to be a value of one.
    // the way it tells the direction is by setting up the make ing the direction a 1,0 ,-1.
    // positive means forward and negative means backward.
    direction.z = Number(movement.moveForward) - Number(movement.moveBackward);
    direction.x = Number(movement.moveRight) - Number(movement.moveLeft);
    // this ensures consistent movements in all directions
    direction.normalize();

    // the direction value is multiplied by the an additional speed which is
    // 400 in the current case to get the acceleration
    if (movement.moveForward || movement.moveBackward)
      velocity.z -= direction.z * 400.0 * delta;
    if (movement.moveLeft || movement.moveRight)
      velocity.x -= direction.x * 400.0 * delta;
    pointerLockControls.moveRight(-velocity.x * delta);
    pointerLockControls.moveForward(-velocity.z * delta);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(tick);

  stats.begin();
  stats.end();
};
tick();

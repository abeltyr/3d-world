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

const controls = setupController({ scene, camera, canvas });

// keyboard movement listeners
let movement = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
};
MovementEventListener({ movement });

// the floor
FloorMesh({ scene });

// the box
const objects: any = [];
BoxMesh({ scene, objects });

// renderer
const renderer = RenderScene({ canvas, camera, scene });

//resize event listener
SizeEventListener({ camera, renderer });

let raycaster = new THREE.Raycaster(
  new THREE.Vector3(),
  new THREE.Vector3(0, -1, 0),
  0,
  10,
);

const clock = new THREE.Clock();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let prevTime = 0;

const tick = () => {
  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    // raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects(objects, true);

    const onObject = intersections.length > 0;
    if (onObject === true) {
      console.log("object infront");
    }
    // this help minimize the framerate while moving
    const elapsedTime = clock.getElapsedTime();
    const delta = elapsedTime - prevTime;
    prevTime = elapsedTime;

    // this help reduce the speed of the movement because the default one is to fast
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    // this tell which way is the movement happening and normalize the direction to be a value of one.
    // the way it tells the direction is by setting up the make ing the direction a 1,0 ,-1.
    // positive means forward and negative means backward.
    direction.z = Number(movement.moveForward) - Number(movement.moveBackward);
    direction.x = Number(movement.moveRight) - Number(movement.moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    // the direction value is multiplied by the an additional speed which is
    // 400 in the current case to get the acceleration

    if (movement.moveForward || movement.moveBackward)
      velocity.z -= direction.z * 400.0 * delta;
    if (movement.moveLeft || movement.moveRight)
      velocity.x -= direction.x * 400.0 * delta;

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(tick);

  stats.begin();
  stats.end();
};
tick();

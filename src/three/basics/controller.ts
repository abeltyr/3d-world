import { PerspectiveCamera, Scene } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";

const setupController = ({
  canvas,
  camera,
  scene,
}: {
  scene: Scene;
  canvas: any;
  camera: PerspectiveCamera;
}) => {
  const pointerLockControls = new PointerLockControls(camera, canvas);

  let firstPersonControls = new FirstPersonControls(camera, canvas);
  firstPersonControls.movementSpeed = 0.25;
  firstPersonControls.lookSpeed = 0.125;
  pointerLockControls.maxPolarAngle = Math.PI / 2;
  pointerLockControls.minPolarAngle = 0;
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  instructions!.addEventListener("click", function () {
    // pointerLockControls.lock();
    instructions!.style.display = "none";
    blocker!.style.display = "none";
  });

  pointerLockControls.addEventListener("lock", function () {
    instructions!.style.display = "none";
    blocker!.style.display = "none";
  });

  pointerLockControls.addEventListener("unlock", function () {
    blocker!.style.display = "block";
    instructions!.style.display = "";
  });
  scene.add(pointerLockControls.getObject());
  return {
    pointerLockControls,
    firstPersonControls,
  };
};

export default setupController;

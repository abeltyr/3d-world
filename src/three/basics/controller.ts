import { PerspectiveCamera, Scene } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

const setupController = ({
  canvas,
  camera,
  scene,
}: {
  scene: Scene;
  canvas: any;
  camera: PerspectiveCamera;
}) => {
  const controls = new PointerLockControls(camera, canvas);
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  instructions!.addEventListener("click", function () {
    controls.lock();
  });

  controls.addEventListener("lock", function () {
    instructions!.style.display = "none";
    blocker!.style.display = "none";
  });

  controls.addEventListener("unlock", function () {
    blocker!.style.display = "block";
    instructions!.style.display = "";
  });
  scene.add(controls.getObject());
  return controls;
};

export default setupController;

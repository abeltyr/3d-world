import { PerspectiveCamera, Scene } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

const setupController = ({
  canvas,
  camera,
  scene,
  initialData,
}: {
  initialData: {
    start: boolean;
  };
  scene: Scene;
  canvas: any;
  camera: PerspectiveCamera;
}) => {
  const pointerLockControls = new PointerLockControls(camera, canvas);

  pointerLockControls.maxPolarAngle = Math.PI / 2;
  pointerLockControls.minPolarAngle = 0;
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  instructions!.addEventListener("click", function () {
    instructions!.style.display = "none";
    blocker!.style.display = "none";
    initialData.start = true;
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
  };
};

export default setupController;

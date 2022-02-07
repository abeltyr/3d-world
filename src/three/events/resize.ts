import { PerspectiveCamera, WebGLRenderer } from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

const SizeEventListener = ({
  camera,
  renderer,
  firstPersonControls,
}: {
  firstPersonControls: FirstPersonControls;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}) => {
  window.addEventListener("resize", () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    firstPersonControls.handleResize();
  });
};

export default SizeEventListener;

import { PerspectiveCamera, WebGLRenderer } from "three";
const SizeEventListener = ({
  camera,
  renderer,
}: {
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
  });
};

export default SizeEventListener;

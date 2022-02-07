import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

const RenderScene = ({
  canvas,
  scene,
  camera,
}: {
  canvas: Element | null;
  scene: Scene;
  camera: PerspectiveCamera;
}) => {
  const renderer = new WebGLRenderer({
    canvas: canvas!,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Render
  renderer.render(scene, camera);
  return renderer;
};

export default RenderScene;

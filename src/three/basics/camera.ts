import { PerspectiveCamera, Scene } from "three";

const setupCamera = ({
  scene,
  fov = 90,
  position = {
    x: 0,
    y: 10,
    z: 0,
  },
}: {
  position?: {
    x: number;
    y: number;
    z: number;
  };
  scene: Scene;
  fov?: number;
}) => {
  const camera = new PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(position.x, position.y, position.z);
  scene.add(camera);
  return camera;
};

export default setupCamera;

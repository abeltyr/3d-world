import { Color, Fog, Scene } from "three";

const setupScene = () => {
  const scene = new Scene();
  scene.background = new Color(0x866a93);
  scene.fog = new Fog(0x866a93, 1, 1000);

  return scene;
};

export default setupScene;

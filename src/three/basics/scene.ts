import { Color, Fog, Scene } from "three";

const setupScene = () => {
  const scene = new Scene();
  scene.background = new Color(0xefd1b5);
  scene.fog = new Fog(0xefd1b5, 1, 1000);
  // scene.traverse((object: any) => {
  //   if (object.isMesh) object.material.transparent = false;
  // });
  return scene;
};

export default setupScene;

import { AmbientLight, HemisphereLight, Scene } from "three";

const setupLight = ({ scene }: { scene: Scene }) => {
  // Ambient Light for adding light at every direction
  const ambientLight = new AmbientLight(0xffffff, 0.6);

  const light = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light, ambientLight);
};

export default setupLight;

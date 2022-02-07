import {
  Mesh,
  Scene,
  PlaneBufferGeometry,
  Color,
  Float32BufferAttribute,
  MeshBasicMaterial,
} from "three";

const FloorMesh = ({ scene }: { scene: Scene; gui?: dat.GUI }) => {
  const color = new Color();
  let floorGeometry = new PlaneBufferGeometry(2000, 2000, 100, 100);
  floorGeometry.rotateX(-Math.PI / 2);

  // vertex displacement

  let position = floorGeometry.attributes.position;

  const colorsFloor = [];

  for (let i = 0, l = position.count; i < l; i++) {
    color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    colorsFloor.push(color.r, color.g, color.b);
  }

  floorGeometry.setAttribute(
    "color",
    new Float32BufferAttribute(colorsFloor, 3),
  );
  const floorMaterial = new MeshBasicMaterial({ vertexColors: true });

  const floor = new Mesh(floorGeometry, floorMaterial);
  scene.add(floor);

  return floor;
};

export default FloorMesh;

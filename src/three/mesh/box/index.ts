import {
  Mesh,
  Scene,
  Color,
  Float32BufferAttribute,
  MeshBasicMaterial,
  BoxBufferGeometry,
  MeshPhongMaterial,
} from "three";

const BoxMesh = ({
  objects,
  scene,
}: {
  objects: any;
  scene: Scene;
  gui?: dat.GUI;
}) => {
  // objects
  const color = new Color();

  const boxGeometry = new BoxBufferGeometry(20, 20, 20).toNonIndexed();

  let position = boxGeometry.attributes.position;
  const colorsBox = [];

  for (let i = 0, l = position.count; i < l; i++) {
    color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    colorsBox.push(color.r, color.g, color.b);
  }

  boxGeometry.setAttribute("color", new Float32BufferAttribute(colorsBox, 3));

  for (let i = 0; i < 500; i++) {
    const boxMaterial = new MeshPhongMaterial({
      specular: 0xffffff,
      flatShading: true,
      vertexColors: true,
    });
    boxMaterial.color.setHSL(
      Math.random() * 0.2 + 0.5,
      0.75,
      Math.random() * 0.25 + 0.75,
    );

    const box = new Mesh(boxGeometry, boxMaterial);
    box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
    box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
    box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

    scene.add(box);
    objects.push(box);
  }
};

export default BoxMesh;

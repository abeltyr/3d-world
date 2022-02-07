import { PerspectiveCamera, Vector2 } from "three";
const MouseEventListener = ({
  initialData,
  mouse,
  camera,
}: {
  initialData: { start: boolean };
  mouse: Vector2;
  camera: PerspectiveCamera;
}) => {
  window.addEventListener("mousemove", (_event) => {
    if (initialData.start) {
      let rotation = 1;
      if (
        _event.clientX / window.innerWidth > 0.9 ||
        _event.clientX / window.innerWidth < 0.1
      )
        rotation = 1.15;
      camera.rotation.y =
        -3 * Math.PI * (_event.clientX / window.innerWidth - 0.5) * rotation;
    }

    mouse.x = (_event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((_event.clientY / window.innerHeight) * 2) + 1;
  });
};

export default MouseEventListener;

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
    mouse.x = (_event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((_event.clientY / window.innerHeight) * 2) + 1;
    if (initialData.start) {
      camera.rotation.y =
        -3 * Math.PI * (_event.clientX / window.innerWidth - 0.5);
      // if (mouse.x > -0.2 && mouse.x < 0.2)
      //   camera.rotation.x =
      //     -0.3 *
      //     Math.PI *
      //     (_event.clientY / window.innerHeight - 0.5) *
      //     rotation;
    }
  });
};

export default MouseEventListener;

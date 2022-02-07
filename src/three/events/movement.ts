const MovementEventListener = ({
  movement,
  initialData,
}: {
  initialData: { start: boolean };
  movement: {
    moveForward: boolean;
    moveLeft: boolean;
    moveBackward: boolean;
    moveRight: boolean;
  };
}) => {
  const onKeyDown = function (event: any) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        movement.moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        movement.moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        movement.moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        movement.moveRight = true;
        break;
      case "Escape":
        initialData.start = false;
        break;
        "";
      case "Enter":
        initialData.start = !initialData.start ? true : false;
        break;
        "";
    }
  };

  const onKeyUp = function (event: any) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        movement.moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        movement.moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        movement.moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        movement.moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
};

export default MovementEventListener;

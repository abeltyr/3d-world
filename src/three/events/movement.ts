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
      case "Space":
        movement.moveForward = true;
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
      case "Space":
        movement.moveForward = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
};

export default MovementEventListener;

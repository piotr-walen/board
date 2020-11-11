import { useCallback } from 'react';

export type UseCanvasEventHandlersArgs = {
  canvasHandlers: Partial<CanvasEventHandlers>;
};

export type EventHandler = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
) => void;

export type CanvasEventHandlers = {
  onMouseDown: EventHandler;
  onMouseUp: EventHandler;
  onMouseMove: EventHandler;
};

const useCanvasEventHandlers = ({
  canvasHandlers,
}: UseCanvasEventHandlersArgs): CanvasEventHandlers => {
  const onMouseDown: EventHandler = useCallback(
    (event) => {
      if (canvasHandlers.onMouseDown) {
        canvasHandlers.onMouseDown(event);
      }
    },
    [canvasHandlers],
  );
  const onMouseMove: EventHandler = useCallback(
    (event) => {
      if (canvasHandlers.onMouseMove) {
        canvasHandlers.onMouseMove(event);
      }
    },
    [canvasHandlers],
  );

  const onMouseUp: EventHandler = useCallback(
    (event) => {
      if (canvasHandlers.onMouseUp) {
        canvasHandlers.onMouseUp(event);
      }
    },
    [canvasHandlers],
  );

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export default useCanvasEventHandlers;

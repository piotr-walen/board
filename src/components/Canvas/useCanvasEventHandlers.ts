import { useCallback } from 'react';
import { KonvaEventObject } from 'konva/types/Node';

export type UseCanvasEventHandlersArgs = {
  canvasHandlers: Partial<CanvasEventHandlers>;
};

export type EventHandler = (event: KonvaEventObject<MouseEvent>) => void;

export type CanvasEventHandlers = {
  onMouseDown: EventHandler;
  onMouseUp: EventHandler;
  onMouseMove: EventHandler;
  onMouseOut: EventHandler;
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

  const onMouseOut: EventHandler = useCallback(
    (event) => {
      if (canvasHandlers.onMouseOut) {
        canvasHandlers.onMouseOut(event);
      }
    },
    [canvasHandlers],
  );

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseOut,
  };
};

export default useCanvasEventHandlers;

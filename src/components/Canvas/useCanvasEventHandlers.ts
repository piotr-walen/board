import { useCallback } from 'react';
import { CanvasService } from './useCanvasService';
import { Point } from '../../shared/types';

type UseCanvasEventListenersArgs = {
  canvasService: CanvasService;
  canvasElement: HTMLCanvasElement | null;
};

type EventHandlerFunction = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
) => void;

type UseCanvasEventListenersResult = {
  onMouseDown: EventHandlerFunction;
  onMouseUp: EventHandlerFunction;
  onMouseMove: EventHandlerFunction;
};

function getCursorPosition(
  canvasElement: HTMLCanvasElement,
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
): Point {
  const rect = canvasElement.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return {
    x,
    y,
  };
}

const useCanvasEventListeners = ({
  canvasService,
  canvasElement,
}: UseCanvasEventListenersArgs): UseCanvasEventListenersResult => {
  const onMouseDown: EventHandlerFunction = useCallback(() => {}, []);
  const onMouseMove: EventHandlerFunction = useCallback(
    (event) => {
      if (canvasElement) {
        canvasService.addPoint(getCursorPosition(canvasElement, event));
      }
    },
    [canvasService, canvasElement],
  );

  const onMouseUp: EventHandlerFunction = useCallback(() => {}, []);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export default useCanvasEventListeners;

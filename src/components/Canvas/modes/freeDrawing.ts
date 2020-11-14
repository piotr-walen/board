import { CanvasMode } from '../useCanvasModes';
import CreatablePath from '../../../shared/MutablePath';
import { Point } from '../../../shared/Point';

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

class FreeDrawingState {
  path: CreatablePath | null = null;
}

const freeDrawing: CanvasMode = ({ canvasService, canvasElement }) => {
  const state = new FreeDrawingState();
  return {
    onMouseDown: (event) => {
      state.path = canvasService.createPath();
      const point = getCursorPosition(canvasElement, event);
      state.path.addPoint(point);
    },
    onMouseMove: (event) => {
      const point = getCursorPosition(canvasElement, event);
      if (state.path) {
        state.path.addPoint(point);
      }
    },
    onMouseUp: (event) => {
      const point = getCursorPosition(canvasElement, event);
      if (state.path) {
        state.path.addPoint(point);
        state.path.commit();
      }
    },
  };
};

export default freeDrawing;

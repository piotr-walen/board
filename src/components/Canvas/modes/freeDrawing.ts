import { Point } from '../../../shared/types';
import { CanvasMode } from '../useCanvasModes';

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
  points: Point[] = [];
  drawStarted: boolean = false;
}

const freeDrawing: CanvasMode = ({ canvasService, canvasElement }) => {
  const state = new FreeDrawingState();
  return {
    onMouseDown: (event) => {
      const point = getCursorPosition(canvasElement, event);
      state.points = [point];
      state.drawStarted = true;
    },
    onMouseMove: (event) => {
      console.log(state.drawStarted);
      if (state.drawStarted) {
        const point = getCursorPosition(canvasElement, event);
        canvasService.commitPath([...state.points, point]);
        state.points = [point];
      }
    },
    onMouseUp: () => {
      state.points = [];
      state.drawStarted = false;
    },
  };
};

export default freeDrawing;

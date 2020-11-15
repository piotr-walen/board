import { CanvasMode } from '../useCanvasModes';
import { Point } from '../../../shared/Point';
import { useState } from 'react';
import { Line } from '../../../shared/Line';
import { KonvaEventObject } from 'konva/types/Node';

class FreeDrawingState {
  line = new Line();
  hasStarted = false;
}

const getPointFromEvent = (event: KonvaEventObject<MouseEvent>): Point => ({
  x: event.evt.x,
  y: event.evt.y,
});

const freeDrawing: CanvasMode = ({ canvasManager }) => {
  const state = new FreeDrawingState();
  return {
    onMouseDown: (event) => {
      state.hasStarted = true;
      state.line = new Line();
      state.line.points = [getPointFromEvent(event)];
      canvasManager.drawLine(state.line);
    },
    onMouseMove: (event) => {
      if (state.hasStarted) {
        state.line.points = [...state.line.points, getPointFromEvent(event)];
        canvasManager.drawLine(state.line);
      }
    },
    onMouseUp: (event) => {
      if (state.hasStarted) {
        state.line.points = [...state.line.points, getPointFromEvent(event)];
        canvasManager.commitLine(state.line);
      }
      state.hasStarted = false;
    },
    onMouseOut: (event) => {
      if (state.hasStarted) {
        state.line.points = [...state.line.points, getPointFromEvent(event)];
        canvasManager.commitLine(state.line);
      }
      state.hasStarted = false;
    },
  };
};

export default freeDrawing;

import { useMemo } from 'react';
import { CanvasEventHandlers } from './useCanvasEventHandlers';
import freeDrawing from './modes/freeDrawing';
import { CanvasManager } from './useCanvasManager';

export enum CanvasModeName {
  FreeDrawing = 'FreeDrawing',
}

type CanvasModeArgs = {
  canvasManager: CanvasManager;
};

export type CanvasMode = (args: CanvasModeArgs) => Partial<CanvasEventHandlers>;

type GetHandlersForModeNameArgs = {
  canvasManager: CanvasManager;
  canvasModeName: CanvasModeName;
};

const getHandlersForModeName = ({
  canvasManager,
  canvasModeName,
}: GetHandlersForModeNameArgs): Partial<CanvasEventHandlers> => {
  switch (canvasModeName) {
    case CanvasModeName.FreeDrawing:
      return freeDrawing({
        canvasManager,
      });
    default:
      return {};
  }
};

type UseCanvasModesArgs = {
  canvasManager: CanvasManager;
  canvasModeName: CanvasModeName;
};

const useCanvasModes = ({
  canvasModeName,
  canvasManager,
}: UseCanvasModesArgs) => {
  const canvasHandlers = useMemo(
    () =>
      getHandlersForModeName({
        canvasModeName,
        canvasManager,
      }),
    [canvasManager, canvasModeName],
  );

  return {
    canvasHandlers,
  };
};

export default useCanvasModes;

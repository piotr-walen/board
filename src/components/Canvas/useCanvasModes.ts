import { useState, useMemo } from 'react';
import { CanvasService } from './useCanvasService';
import { CanvasEventHandlers } from './useCanvasEventHandlers';
import freeDrawing from './modes/freeDrawing';

export enum CanvasModeName {
  FreeDrawing,
}

type CanvasModeArgs = {
  canvasService: CanvasService;
  canvasElement: HTMLCanvasElement;
};

export type CanvasMode = (args: CanvasModeArgs) => Partial<CanvasEventHandlers>;

type GetHandlersForModeNameArgs = {
  canvasService: CanvasService;
  canvasElement: HTMLCanvasElement | null;
  canvasModeName: CanvasModeName;
};

const getHandlersForModeName = ({
  canvasService,
  canvasElement,
  canvasModeName,
}: GetHandlersForModeNameArgs): Partial<CanvasEventHandlers> => {
  if (!canvasElement) {
    return {};
  }
  switch (canvasModeName) {
    case CanvasModeName.FreeDrawing:
      return freeDrawing({
        canvasService,
        canvasElement,
      });
    default:
      return {};
  }
};

type UseCanvasModesArgs = {
  canvasService: CanvasService;
  canvasElement: HTMLCanvasElement | null;
};

const useCanvasModes = ({
  canvasService,
  canvasElement,
}: UseCanvasModesArgs) => {
  const [canvasModeName, setCanvasModeName] = useState(
    CanvasModeName.FreeDrawing,
  );

  const canvasHandlers = useMemo(
    () =>
      getHandlersForModeName({
        canvasService,
        canvasElement,
        canvasModeName,
      }),
    [canvasService, canvasElement, canvasModeName],
  );

  return {
    setCanvasModeName,
    canvasHandlers,
  };
};

export default useCanvasModes;

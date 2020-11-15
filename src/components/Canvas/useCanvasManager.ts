import { Dispatch, useState } from 'react';
import { CanvasReducerAction, CanvasReducerActionType } from './useCanvasState';
import { Line } from '../../shared/Line';
import LineStorage from '../../storage/LineStorage';
import { Dictionary } from 'lodash';

export class CanvasManager {
  private _dispatch: Dispatch<CanvasReducerAction>;
  private _lineStorage: LineStorage;
  constructor({ dispatch }: UseCanvasManagerArgs) {
    this._lineStorage = new LineStorage();
    this._dispatch = dispatch;

    this._lineStorage.subscribe({
      next: (linesDictionary: Dictionary<Line>) => {
        this._dispatch({
          type: CanvasReducerActionType.DRAW_LINES,
          payload: linesDictionary,
        });
      },
    });
  }

  drawLine = (line: Line) => {
    this._dispatch({
      type: CanvasReducerActionType.DRAW_LINES,
      payload: { [line.id]: line },
    });
  };

  commitLine = (line: Line) => {
    const linesDictionary = { [line.id]: line };
    this._dispatch({
      type: CanvasReducerActionType.DRAW_LINES,
      payload: linesDictionary,
    });
    this._lineStorage.save(linesDictionary);
  };
}

type UseCanvasManagerArgs = {
  dispatch: Dispatch<CanvasReducerAction>;
};

const useCanvasManager = ({
  dispatch,
}: UseCanvasManagerArgs): CanvasManager => {
  const [canvasManager] = useState(() => new CanvasManager({ dispatch }));
  return canvasManager;
};

export default useCanvasManager;

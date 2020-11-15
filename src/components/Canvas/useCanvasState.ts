import { useReducer } from 'react';
import { CanvasModeName } from './useCanvasModes';
import { Action } from '../../shared/Action';
import { Line } from '../../shared/Line';
import { Dictionary } from 'lodash';

export enum CanvasReducerActionType {
  DRAW_LINES = 'DRAW_LINES',
  SET_MODE = 'SET_MODE',
}

export type AddLine = Action<
  CanvasReducerActionType.DRAW_LINES,
  Dictionary<Line>
>;

export type SetMode = Action<CanvasReducerActionType.SET_MODE, CanvasModeName>;

export type CanvasReducerAction = AddLine | SetMode;

export type CanvasState = {
  linesDictionary: Dictionary<Line>;
  modeName: CanvasModeName;
};

const initialState: CanvasState = {
  linesDictionary: {},
  modeName: CanvasModeName.FreeDrawing,
};

const canvasReducer = (
  state: CanvasState,
  action: CanvasReducerAction,
): CanvasState => {
  switch (action.type) {
    case CanvasReducerActionType.DRAW_LINES:
      return {
        ...state,
        linesDictionary: {
          ...state.linesDictionary,
          ...action.payload,
        },
      };
    case CanvasReducerActionType.SET_MODE:
      return {
        ...state,
        modeName: action.payload,
      };
    default:
      return state;
  }
};

const useCanvasState = () => useReducer(canvasReducer, initialState);

export default useCanvasState;

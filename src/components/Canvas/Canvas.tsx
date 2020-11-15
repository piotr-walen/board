import { flatten, map, values } from 'lodash';
import React, { useMemo } from 'react';
import Konva from 'react-konva';
import { CanvasConfig } from '../../config/canvasConfig';
import useCanvasEventHandlers from './useCanvasEventHandlers';
import useCanvasManager from './useCanvasManager';
import useCanvasModes from './useCanvasModes';
import useCanvasState from './useCanvasState';
import './Canvas.css';

type CanvasProps = {
  canvasConfig: CanvasConfig;
};

const Canvas: React.FC<CanvasProps> = ({ canvasConfig }) => {
  const { height, width } = canvasConfig;
  const stroke = 'blue';
  const strokeWidth = 2;

  const [state, dispatch] = useCanvasState();

  const canvasManager = useCanvasManager({ dispatch });

  const { canvasHandlers } = useCanvasModes({
    canvasManager,
    canvasModeName: state.modeName,
  });

  const {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseOut,
  } = useCanvasEventHandlers({
    canvasHandlers,
  });

  const lines = useMemo(
    () =>
      map(values(state.linesDictionary), ({ points, id }) => ({
        id,
        points: flatten(map(points, ({ x, y }) => [x, y])),
      })),
    [state.linesDictionary],
  );

  return (
    <Konva.Stage
      width={width}
      height={height}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
    >
      <Konva.Layer>
        {map(lines, ({ points, id }) => (
          <Konva.Line
            points={points}
            key={id}
            stroke={stroke}
            strokeWidth={strokeWidth}
            listening={false}
          />
        ))}
      </Konva.Layer>
    </Konva.Stage>
  );
};

export default Canvas;

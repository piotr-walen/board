import React from 'react';
import useCanvasRenderer from './useCanvasRenderer';
import useCanvasEventHandlers from './useCanvasEventHandlers';
import { CanvasConfig } from '../../config/canvasConfig';
import useCanvasService from './useCanvasService';
import useCanvasModes from './useCanvasModes';

type CanvasProps = {
  canvasConfig: CanvasConfig;
};

const Canvas: React.FC<CanvasProps> = ({ canvasConfig }) => {
  const { height, width } = canvasConfig;

  const canvasService = useCanvasService();
  const { canvasRef } = useCanvasRenderer({ canvasConfig, canvasService });
  const { canvasHandlers } = useCanvasModes({
    canvasService,
    canvasElement: canvasRef.current,
  });
  const { onMouseDown, onMouseUp, onMouseMove } = useCanvasEventHandlers({
    canvasHandlers,
  });

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    />
  );
};

export default Canvas;

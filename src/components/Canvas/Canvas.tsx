import React from 'react';
import useCanvasRenderer from './useCanvasRenderer';
import useCanvasEventHandlers from './useCanvasEventHandlers';
import { CanvasConfig } from '../../config/canvasConfig';
import CanvasService from './useCanvasService';
import useCanvasService from './useCanvasService';

type CanvasProps = {
  canvasConfig: CanvasConfig;
};

const Canvas: React.FC<CanvasProps> = ({ canvasConfig }) => {
  const { height, width } = canvasConfig;

  const canvasService = useCanvasService();
  const { canvasRef } = useCanvasRenderer({ canvasConfig, canvasService });
  const { onMouseDown, onMouseUp, onMouseMove } = useCanvasEventHandlers({
    canvasService,
    canvasElement: canvasRef.current,
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

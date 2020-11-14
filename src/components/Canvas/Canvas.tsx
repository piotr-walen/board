import React, { useRef, useEffect, useState } from 'react';
import useCanvasRenderer from './useCanvasRenderer';
import useCanvasEventHandlers from './useCanvasEventHandlers';
import { CanvasConfig } from '../../config/canvasConfig';
import useCanvasService from './useCanvasService';
import useCanvasModes from './useCanvasModes';
import { useDatabaseServiceValue } from '../../services/DatabaseService';
import PathService from '../../services/PathService';

type CanvasProps = {
  canvasConfig: CanvasConfig;
};

const Canvas: React.FC<CanvasProps> = ({ canvasConfig }) => {
  const { height, width } = canvasConfig;

  console.log('service');
  const [service] = useState(() => new PathService());

  const { values: paths, save: savePath } = useDatabaseServiceValue({
    initialValue: [],
    service: service,
  });

  const canvasService = useCanvasService({
    paths,
    savePath,
  });

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

import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CanvasConfig } from '../../config/canvasConfig';
import { Point } from '../../shared/types';
import { CanvasService } from './useCanvasService';

export type DrawFunction = (points: Point[]) => void;

type CanvasRenderer = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  draw: DrawFunction;
};

type UseCanvasRendererArgs = {
  canvasConfig: CanvasConfig;
  canvasService: CanvasService;
};

const useCanvasRenderer = ({
  canvasConfig,
  canvasService,
}: UseCanvasRendererArgs): CanvasRenderer => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const setStyles = useCallback(() => {
    if (context) {
      context.strokeStyle = canvasConfig.strokeStyle;
      context.lineWidth = canvasConfig.lineWidth;
      context.lineCap = canvasConfig.lineCap;
    }
  }, [canvasConfig, context]);

  useEffect(() => {
    if (canvasRef.current) {
      setContext(canvasRef.current.getContext('2d'));
      setStyles();
    }
  }, [setStyles]);

  const draw = useCallback(
    (points: Point[]) => {
      if (context) {
        const [firstPoint, ...restPoints] = points;
        if (points.length) {
          context.beginPath();
          context.moveTo(firstPoint.x, firstPoint.y);
          restPoints.forEach(({ x, y }) => {
            context.lineTo(x, y);
          });
          context.stroke();
        }
      }
    },
    [context],
  );

  const canvasServiceSubscription = useCallback(() => {
    canvasService.subscribeForPath({
      next: draw,
    });
  }, [canvasService, draw]);

  useEffect(() => {
    canvasServiceSubscription();
  }, [canvasServiceSubscription]);

  return {
    draw,
    canvasRef,
  };
};

export default useCanvasRenderer;

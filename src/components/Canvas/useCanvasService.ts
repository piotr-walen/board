import { Subject, Observer, PartialObserver } from 'rxjs';
import { useRef, useCallback } from 'react';
import { Point } from '../../shared/types';

export type CanvasService = {
  addPoint: (point: Point) => void;
  subscribeForPoints: (observer: PartialObserver<Point[]>) => void;
};

const useCanvasService = (): CanvasService => {
  const pointQueue = useRef(new Array<Point>());
  const points = useRef(new Subject<Point[]>());
  const points$ = useRef(points.current.asObservable());

  const addPoint = useCallback((point: Point): void => {
    pointQueue.current.push(point);
    if (pointQueue.current.length > 1) {
      points.current.next(pointQueue.current);
      pointQueue.current = [pointQueue.current[pointQueue.current.length - 1]];
    }
  }, []);

  const subscribeForPoints = useCallback(
    ({ next }: PartialObserver<Point[]>): void => {
      if (next) {
        points$.current.subscribe({
          next,
        });
      }
    },
    [],
  );

  return {
    addPoint,
    subscribeForPoints,
  };
};

export default useCanvasService;

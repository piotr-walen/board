import { Subject, Observer, PartialObserver } from 'rxjs';
import { useRef, useCallback } from 'react';
import { Point } from '../../shared/types';

export type CanvasService = {
  commitPath: (path: Point[]) => void;
  subscribeForPath: (observer: PartialObserver<Point[]>) => void;
};

const useCanvasService = (): CanvasService => {
  const _path = useRef(new Subject<Point[]>());
  const path$ = useRef(_path.current.asObservable());

  const commitPath = useCallback((path: Point[]) => {
    _path.current.next(path);
  }, []);

  const subscribeForPath = useCallback(
    ({ next }: PartialObserver<Point[]>): void => {
      if (next) {
        path$.current.subscribe({
          next,
        });
      }
    },
    [],
  );

  return {
    commitPath,
    subscribeForPath,
  };
};

export default useCanvasService;

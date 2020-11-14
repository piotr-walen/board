import { Subject, PartialObserver } from 'rxjs';
import { useRef, useCallback, useEffect } from 'react';
import MutablePath from '../../shared/MutablePath';
import { Point } from '../../shared/Point';
import { Path } from '../../shared/Path';

export type CanvasService = {
  createPath: () => MutablePath;
  subscribeForPoints: (observer: PartialObserver<Point[]>) => void;
};

export type UseCanvasServiceArgs = {
  paths: Path[];
  savePath: (path: Path) => void;
};

const useCanvasService = ({
  paths,
  savePath,
}: UseCanvasServiceArgs): CanvasService => {
  const pendingPathMap = useRef(new Map<string, Path>());
  const pathMap = useRef(new Map<string, Path>());

  const _path = useRef(new Subject<Point[]>());
  const path$ = useRef(_path.current.asObservable());

  useEffect(() => {
    console.log('paths', paths);
    paths.forEach((path) => {
      if (!pathMap.current.get(path.id)) {
        _path.current.next(path.points);
      } else {
        pathMap.current.set(path.id, path);
      }
    });
  }, [paths]);

  const createPath = useCallback(() => {
    const newPath = new MutablePath(
      {
        next: (path) => _path.current.next(path),
      },
      {
        next: (path) => {
          pendingPathMap.current.delete(path.id);
          savePath(path);
        },
      },
    );
    pendingPathMap.current.set(newPath.id, newPath);
    return newPath;
  }, [savePath]);

  const subscribeForPoints = useCallback(
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
    createPath,
    subscribeForPoints,
  };
};

export default useCanvasService;

import { Point } from './Point';
import { v4 as uuidv4 } from 'uuid';
import { NextObserver } from 'rxjs';
import { Path } from './Path';

class MutablePath implements Path {
  readonly id: string = uuidv4();
  private _points: Point[] = [];
  private _isPending: boolean = true;

  private readonly _partialPathObserver: NextObserver<Point[]>;
  private readonly _commitPathObserver: NextObserver<Path>;
  constructor(
    partialPathObserver: NextObserver<Point[]>,
    commitPathObserver: NextObserver<Path>,
  ) {
    this._partialPathObserver = partialPathObserver;
    this._commitPathObserver = commitPathObserver;
  }

  addPoint = (point: Point) => {
    if (this._isPending) {
      this._points = [...this._points, point];
      if (this._points.length > 1) {
        this._partialPathObserver.next([
          this._points[this._points.length - 2],
          this._points[this._points.length - 1],
        ]);
      }
    }
  };

  commit = () => {
    this._commitPathObserver.next({
      id: this.id,
      points: this._points,
    });
    this._isPending = false;
  };

  get points() {
    return this._points;
  }
}

export default MutablePath;

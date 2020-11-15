import { Point } from './Point';
import { v4 as uuid } from 'uuid';

export class Line {
  readonly id: string = uuid();
  points: Point[] = [];
}

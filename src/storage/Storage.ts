import { PartialObserver } from 'rxjs';
import { Dictionary } from 'lodash';

export enum RefName {
  Line = 'line',
}

export interface MultiEntityStorage<T> {
  save(value: Dictionary<T>): void;
  subscribe(observer: PartialObserver<Dictionary<T>>): void;
}

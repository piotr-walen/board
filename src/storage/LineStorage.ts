import firebase from 'firebase';
import { Subject, PartialObserver } from 'rxjs';
import { Line } from '../shared/Line';
import { MultiEntityStorage, RefName } from './Storage';
import { Dictionary } from 'lodash';

class LineStorage implements MultiEntityStorage<Line> {
  private state = new Subject<Dictionary<Line>>();
  private ref = firebase.database().ref(RefName.Line);
  private state$ = this.state.asObservable();

  constructor(ref?: firebase.database.Reference) {
    if (ref) {
      this.ref = ref;
    }
    this.ref.on('value', (snapshot) => {
      console.log('value');
      console.log(snapshot.val());
      this.state.next(snapshot.val());
    });

    // clear storage for testing
    this.ref.set(null).catch((error) => this.state.error(error));
  }

  save = (lines: Dictionary<Line>) => {
    console.log('save');
    this.ref.update(lines);
  };

  subscribe = (observer: PartialObserver<Dictionary<Line>>) => {
    this.state$.subscribe({
      next: observer.next,
      error: observer.error,
      complete: () => {},
    });
  };
}

export default LineStorage;

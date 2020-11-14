import firebase from 'firebase';
import { Subject, PartialObserver } from 'rxjs';
import { DatabaseService, RefName } from './DatabaseService';
import { Path } from '../shared/Path';

class PathService implements DatabaseService<Path> {
  private state = new Subject<Path[]>();
  private ref = firebase.database().ref(RefName.Path);
  private state$ = this.state.asObservable();

  constructor(ref?: firebase.database.Reference) {
    if (ref) {
      this.ref = ref;
    }
    this.ref.on('value', (snapshot) => {
      console.log('value', snapshot.val());
      this.state.next(snapshot.val());
    });

    this.ref.set(null).catch((error) => this.state.error(error));
  }

  save = (value: Path) => {
    console.log('save');
    this.ref
      .child(value.id)
      .set(value)
      .catch((error) => this.state.error(error));
  };

  subscribe = (observer: PartialObserver<Path[]>) => {
    this.state$.subscribe({
      next: observer.next,
      error: observer.error,
      complete: () => {},
    });
  };
}

export default PathService;

import { useCallback, useEffect, useState } from 'react';
import { PartialObserver } from 'rxjs';

export enum RefName {
  Path = 'path',
}

export interface DatabaseService<T> {
  save(value: T): void;
  subscribe(observer: PartialObserver<T[]>): void;
}

type UseDatabaseServiceValueArgs<T> = {
  initialValue: T[];
  service: DatabaseService<T>;
};

type DatabaseServiceValueSetter<T> = (value: T) => void;

type Error = {
  message: string;
};

type DatabaseServiceValue<T> = {
  values: T[];
  error: Error | null;
  save: DatabaseServiceValueSetter<T>;
};

export const useDatabaseServiceValue = <T>({
  initialValue,
  service,
}: UseDatabaseServiceValueArgs<T>): DatabaseServiceValue<T> => {
  const [state, setState] = useState(initialValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('useEffect');
    service.subscribe({
      next: (values) => {
        console.log('useEffect', values);
        setState(values ? Object.values(values) : initialValue);
      },
    });
  }, [service]);

  const save = useCallback(
    (path: T) => {
      service.save(path);
    },
    [service],
  );

  return { values: state, error, save };
};

import { distinctUntilChanged, map, Observable } from 'rxjs';

export const select =
  <T, F>(selector: (_: T) => F) =>
  (source$: Observable<T>) =>
    source$.pipe(
      map((data) => selector(data)),
      distinctUntilChanged(),
    );

import { BehaviorSubject } from 'rxjs';
import { Action, ObservableStore, Store } from './interfaces';

export const createObservableStore = <T, A extends Action>(store: Store<T, A>): ObservableStore<T> => {
  const subject = new BehaviorSubject<T>(store.getState());

  store.subscribe(() => subject.next(store.getState()));

  return Object.assign(store, {
    pipe: subject.pipe.bind(subject),
    subscribe: subject.subscribe.bind(subject),
    getState: subject.getValue.bind(subject),
  }) as unknown as ObservableStore<T>;
};

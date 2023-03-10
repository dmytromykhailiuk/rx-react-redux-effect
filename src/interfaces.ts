import { Observable, OperatorFunction, Subscription } from 'rxjs';
export interface Action<T extends string = string> {
  [key: string]: any;
  type: T;
}

export interface SideEffect {
  effect: Observable<Action | any>;
  dispatch: boolean;
}

export interface ObservableStore<T> {
  pipe: <R>(...operations: OperatorFunction<T, R>[]) => Observable<R>;
  subscribe: (fn?: (data: T) => void) => Subscription;
  dispatch: (action: Action) => void;
  getState: () => T;
}

export type Store<T, A extends Action> = {
  getState: () => T;
  dispatch: (action: A) => void;
  subscribe: (listener: () => void) => () => void;
};

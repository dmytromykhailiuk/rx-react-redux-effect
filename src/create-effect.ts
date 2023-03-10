import { Action, SideEffect } from './interfaces';
import { Observable } from 'rxjs';

export const createEffect = <T extends Action>(
  fn: () => Observable<T | any>,
  obj: { dispatch: boolean } = { dispatch: true },
): SideEffect => ({ dispatch: obj.dispatch, effect: fn() });

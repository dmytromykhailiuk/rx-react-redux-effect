import { Subject } from 'rxjs';
import { Action } from './../interfaces';

export class Actions {
  private actions$ = new Subject<Action>();

  get middleware() {
    return (_: any) => (next: (arg: Action) => void) => (action: Action) => {
      next(action);
      this.actions$.next(action);
    };
  }

  getObservableActions() {
    return this.actions$.asObservable();
  }
}

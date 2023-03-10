import { SideEffect, Action } from './../interfaces';

export class SideEffects {
  constructor(private sideEffects: SideEffect[] = []) {}

  get middleware() {
    return (store: { dispatch: (action: Action) => void }) => {
      this.sideEffects.forEach(({ effect, dispatch }) => {
        effect.subscribe((action) => {
          if (dispatch) {
            store.dispatch(action);
          }
        });
      });

      return (next: (arg: Action) => void) => (action: Action) => next(action);
    };
  }

  add(sideEffect: SideEffect) {
    this.sideEffects.push(sideEffect);
  }
}

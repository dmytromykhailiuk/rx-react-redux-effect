import { filter, Observable } from 'rxjs';
import { Action } from './interfaces';

export const ofType =
  <F extends Action, T extends F['type'], E extends (_: any) => F>(typeToCompare: T | F | E) =>
  (source$: Observable<F>): Observable<F & { type: T }> =>
    source$.pipe(
      filter((action: Action): action is F & { type: T } => {
        if (typeof typeToCompare === 'string') {
          return action.type === typeToCompare;
        }
        if ((typeToCompare as F)?.type || typeof typeToCompare === 'object') {
          return action.type === (typeToCompare as F).type;
        }
        if (typeof typeToCompare === 'function') {
          return action.type === typeToCompare({} as any).type;
        }
        return false;
      }),
    );

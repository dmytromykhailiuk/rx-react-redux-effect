import { Observable } from 'rxjs';
import { useEffect, useState } from 'react';

export const useObservable = <T>(observable$: Observable<T>) => {
  const [value, setValue] = useState<T>(null as any);

  useEffect(() => {
    const subscription = observable$.subscribe((v) => setValue(v));

    return () => subscription.unsubscribe();
  }, [observable$]);

  return value;
};

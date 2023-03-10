# Condition Flow Engine with DI

**Reactive Library for React**

(Solution is built on top of RXJS library with NgRx architecture)

## Installation

```sh
npm i @dmytromykhailiuk/rx-react-redux-effect
```

## Purpose

**Why you should use this library?**
- You want to write side-effects code as the same way as in NgRx effects using Observables
- You want to integrate side-effects to redux
- You want to integrate Observagles in to React application 

**If you answered yes to one of the options, then this library is right choice.**

## Actions & Effects & conecting to redux

```typescript

import { ofType, Actions, SideEffects, createEffect, select, createObservableStore } from '@dmytromykhailiuk/rx-react-redux-effect';

const actions = new Actions();

const actions$ = actions.getObservableActions();

const sayHelloWorld$ = createEffect(
  () =>
    actions$.pipe(
      ofType('Say Hello World'),
      delay(2000),
      tap(() => console.log('Hello World!')),
    ),
  { dispatch: false },
);

const getData$ = createEffect(
  () =>
    actions$.pipe(
      ofType('Get Data'),
      switchMap(() =>
        from(fetch(DATA_URL).then(res => res.json())).pipe(
          map((data) => ({ type: 'Get Data Success', data })),
          catchError((error) => of({ type: 'Get Data Failure', error })),
        ),
      ),
    ),
  { dispatch: true },
);

const effects = new SideEffects();

effects.add(sayHelloWorld$);
effects.add(getData$);

const store$ = createObservableStore(createStore({
  reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    effects.middleware,
    actions.middleware
  ),
}));

store$.dispatch({ type: 'Action1' });

const data$ = store$.pipe(select(getSomethingSelector))

```

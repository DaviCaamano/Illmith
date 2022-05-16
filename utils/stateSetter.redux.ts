import { ActionCreatorWithPayload, Dispatch } from '@reduxjs/toolkit';

/**
 * The following are state setting functions for redux that work with implementations that you will find in
 * user.slice.ts and alert.slice.ts.
 * They provide a Recoil-like implementation
 */
export type StateSetterFunc<T> = (prevState: T) => T;
export type StateSetterArgs<T> = StateSetterFunc<T> | T;
export type StateSetter<T> = (newState: ((prevState: T) => T) | T) => void;
export const stateSetter = <T>(
  dispatch: Dispatch,
  setAction: ActionCreatorWithPayload<T>,
  state: T
): StateSetter<T> => {
  return (newState: StateSetterArgs<T>): void => {
    if (typeof newState === 'function') {
      const setter = newState as (prevState: T) => T;
      dispatch(setAction(setter(state)));
    } else {
      dispatch(setAction(newState));
    }
  };
};

import { INCREMENT, DECREMENT } from "./actionTypes";

export interface incrementAction {
  type: typeof INCREMENT;
}

export interface decrementAction {
  type: typeof DECREMENT;
}

export const increment = (): incrementAction => ({
  type: INCREMENT,
  // type tells what kind of redux action is dispatched
});

export const decrement = (): decrementAction => ({
  type: DECREMENT,
});

export type CounterActionTypes = incrementAction | decrementAction;

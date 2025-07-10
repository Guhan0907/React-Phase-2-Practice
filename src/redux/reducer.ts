import type { CounterActionTypes } from "./action";
import { INCREMENT, DECREMENT } from "./actionTypes";

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 9
};

export const counterReducer = (
  state = initialState,
  action: CounterActionTypes,
): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

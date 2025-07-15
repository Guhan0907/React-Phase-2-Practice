// import type { CounterState, UserState } from "./reducer";

export interface CounterState {
  count: number;
}

export interface UserState {
  users: string[];
}

export interface RootState {
  counterReducer: CounterState;
  userReducer: UserState;
}

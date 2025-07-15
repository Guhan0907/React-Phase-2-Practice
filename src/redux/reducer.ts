import { isAction } from "redux";
import type { CounterActionTypes, UserActionTypes } from "./action";
import { INCREMENT, DECREMENT, SET_USERS, PERSIST_USER } from "./actionTypes";
import type { CounterState, UserState, PersistValState } from "./types";

// export interface CounterState {
//   count: number;
// }  

// export interface UserState {
//   users: string[];
// }

// initial states
const initialState: CounterState = {
  count: 9,
};

const initialUserState: UserState = {
  users: "Guhan",
};

const initialPersistState: PersistValState = {
  users: [],
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

export const userReducer = (
  state = initialUserState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users:action.payload };

    // case PERSIST_USER:
    //   return { ...state, users: [...state.users, action.payload] };

    default:
      return state;
  }
};

export const persistReducerVal = (
  state = initialPersistState,
  action: UserActionTypes,
): PersistValState => {
  switch (action.type) {
    case PERSIST_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

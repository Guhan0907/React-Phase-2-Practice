import type { CounterActionTypes ,UserActionTypes } from "./action";
import { INCREMENT, DECREMENT , SET_USERS } from "./actionTypes";

export interface CounterState {
  count: number;
}

export interface UserState {
    users : string;
}


// initial states
const initialState: CounterState = {
  count: 9
};

const initialUserState: UserState = {
    users : "guhan"
}

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
    action : UserActionTypes,
): UserState => {
    switch(action.type) {
        case SET_USERS : 
            return {...state , users : action.payload}

        default :
            return state;
    }
}


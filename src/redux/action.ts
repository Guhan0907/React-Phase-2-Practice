import { INCREMENT, DECREMENT, SET_USERS } from "./actionTypes";
import { Dispatch } from "redux";

export interface incrementAction {
  type: typeof INCREMENT;
}

export interface decrementAction {
  type: typeof DECREMENT;
}

// another action for users
export interface setUserAction {
    type : typeof SET_USERS,
    payload: string
}

export const increment = (): incrementAction => ({
  type: INCREMENT,
  // type tells what kind of redux action is dispatched
});

export const decrement = (): decrementAction => ({
  type: DECREMENT,
});

// another action for the users 
export const setUser = (name : string) : setUserAction => ({
    type : SET_USERS,
    payload :name
})


export type CounterActionTypes = incrementAction | decrementAction;
export type UserActionTypes = setUserAction;


export const fetchUserAsync = () => {
    return async(dispatch : Dispatch) => {
        
    }
}
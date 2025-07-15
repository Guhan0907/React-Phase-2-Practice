import type { Dispatch } from "redux";
import { INCREMENT, DECREMENT, SET_USERS, PERSIST_USER } from "./actionTypes";
// import { Dispatch } from "redux";

export interface incrementAction {
  type: typeof INCREMENT;
}

export interface decrementAction {
  type: typeof DECREMENT;
}

// for storing the data from the Api also
export interface setUserAction {
  type: typeof SET_USERS;
  payload: string;
}

// for the persist action
export interface persistUserAction {
  type: typeof PERSIST_USER;
  payload: string;
}

//🔥 below is different

export const increment = (): incrementAction => ({
  type: INCREMENT,
  // type tells what kind of redux action is dispatched
});

export const decrement = (): decrementAction => ({
  type: DECREMENT,
});

// for also string the data in the array
export const setUser = (names: string): setUserAction => ({
  type: SET_USERS,
  payload: names,
});

export const persistUser = (values: string): persistUserAction => ({
  type: PERSIST_USER,
  payload: values,
});

export const fetchUsers = () => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();

      // const userNames = data.map((user:any) => user.name);
      const randomUser = data[Math.floor(Math.random() * data.length)];
      const randomName = randomUser.name;
      dispatch(persistUser(randomName));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
};

export type CounterActionTypes = incrementAction | decrementAction;
// export type UserActionTypes = setUserAction ;
export type UserActionTypes = setUserAction | persistUserAction;

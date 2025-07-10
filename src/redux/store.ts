import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { counterReducer, userReducer } from "./reducer";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

let middlewareList = [thunk, logger];

const enhancer = compose(applyMiddleware(...middlewareList));

export const rootreducer = combineReducers({
  counterReducer,
  userReducer,
});
export const store = createStore(rootreducer, enhancer);

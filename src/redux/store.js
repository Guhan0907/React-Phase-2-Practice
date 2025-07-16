import { thunk } from "redux-thunk";
import { wishlistReducer } from "./reducer";
import logger from "redux-logger";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";

let middlewares = [thunk, logger];
const enhancer = compose(applyMiddleware(...middlewares));

const rootReducer = combineReducers({
  wishlist: wishlistReducer, // 'wishlist' will be the key in your global state
});

// export const store = createStore
export const store = createStore(rootReducer, undefined, enhancer);

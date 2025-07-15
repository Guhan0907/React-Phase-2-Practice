import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { counterReducer, persistReducerVal, userReducer } from "./reducer";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

// persist
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { type RootState } from "./types";

let middlewareList = [thunk, logger];

const enhancer = compose(applyMiddleware(...middlewareList));

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userReducer", "persistReducerVal"],
};

export const rootreducer = combineReducers({
  counterReducer,
  userReducer,
  persistReducerVal,
});

const persistedReducer = persistReducer<RootState>(
  persistConfig,
  rootreducer as any,
);

export const store = createStore(persistedReducer, undefined, enhancer);

export const persistor = persistStore(store);

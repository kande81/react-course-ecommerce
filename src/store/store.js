import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import createSagaMiddleware from "redux-saga"; // this is the middleware that will run the sagas. in order for this to work we need to import the root saga in this file which is done here.
import { rootSaga } from "./root-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware(); // you will pass this inside the 'middlewares' variable below.

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(Boolean);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// if we are not in production then use the compose from the redux devtools extension. If we are in production then use the compose from redux
const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// in order for the above middlewares to work we have to call applyMiddleware and pass in the middlewares array.
// The compose function takes the functions you want to combine (in your case, middleware functions passed to applyMiddleware) and returns a new function. This new function, when executed, runs all the composed functions in sequence.
const composedEnhancers = composedEnhancer(applyMiddleware(...middlewares));

// composedEnhancers has to be the last argument in the createStore function
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga); // this is how you run the root saga. it's important to run this after the store is created.
export const persistor = persistStore(store); // persistor is a persisted version of our store

import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log("type:", action.type);
//   console.log("payload:", action.payload);
//   console.log("current state:", store.getState());
//   // here when we call next with the action, we are passing the action to the next middleware in the chain. If there is no next middleware in the chain, then the action is passed to the root reducer. afetr the action is passed to the root reducer, the state is updated and the new state is returned and the control is passed back to the middleware, which then logs the new state.
//   next(action);

//   console.log("next state:", store.getState());
// };

// we can add as many middlewares as we want to this array. when an action is dispatched the middlewares will catch the action and do something with it before it reaches the root reducer
// const middlewares = [logger];

// here by using 'process.env.NODE_ENV == 'development' && logger' we are saying that if the process.env.NODE_ENV is development then add the logger middleware to the middlewares array. If the process.env.NODE_ENV is not development then don't add the logger middleware to the middlewares array. This is because we don't want to log the state in the console when the app is in production mode. then when we use '.filter(Boolen)' on the array, what that does is if the result inside the array is false then it wil return an empty array. If the result inside the array is true then it will return the array with the logger middleware in it. So if the process.env.NODE_ENV is development then the middlewares array will be [logger] and thunk and if the process.env.NODE_ENV is not development then the middlewares array will just contain thunk.
const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
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

export const persistor = persistStore(store); // persistor is a persisted version of our store

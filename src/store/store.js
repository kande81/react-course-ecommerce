import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";

import { rootReducer } from "./root-reducer";
import logger from "redux-logger";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type:", action.type);
  console.log("payload:", action.payload);
  console.log("current state:", store.getState());
  // here when we call next with the action, we are passing the action to the next middleware in the chain. If there is no next middleware in the chain, then the action is passed to the root reducer. afetr the action is passed to the root reducer, the state is updated and the new state is returned and the control is passed back to the middleware, which then logs the new state.
  next(action);

  console.log("next state:", store.getState());
};

// we can add as many middlewares as we want to this array. when an action is dispatched the middlewares will catch the action and do something with it before it reaches the root reducer
// const middlewares = [logger];

const middlewares = [loggerMiddleware];

// in order for the above middlewares to work we have to call applyMiddleware and pass in the middlewares array.
// The compose function takes the functions you want to combine (in your case, middleware functions passed to applyMiddleware) and returns a new function. This new function, when executed, runs all the composed functions in sequence.
const composedEnhancers = compose(applyMiddleware(...middlewares));

// composedEnhancers has to be the last argument in the createStore function
export const store = createStore(rootReducer, undefined, composedEnhancers);

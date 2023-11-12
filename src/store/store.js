import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";

import { rootReducer } from "./root-reducer";

import logger from "redux-logger";

// we can add as many middlewares as we want to this array. when an action is dispatched the middlewares will catch the action and do something with it before it reaches the root reducer
const middlewares = [logger];

// in order for the above middlewares to work we have to call applyMiddleware and pass in the middlewares array. compose allow us to pass multiple functions left to right where each function is applied to the return value of the previous function.
const composedEnhancers = compose(applyMiddleware(...middlewares));

// composedEnhancers has to be the last argument in the createStore function
export const store = createStore(rootReducer, undefined, composedEnhancers);

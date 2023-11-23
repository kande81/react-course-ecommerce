/* all thid code was copied from the user.context file. */

import USER_ACTION_TYPES from "./user.types";
const INITIAL_STATE = {
  currentUser: null,
};

// when using redux all the reducers get fired when any action is fired. So we need to make sure that the reducer is only going to update when the action type is the one that we want.
// so in the reducer we need to have a default case that will return the state unchanged if the action type is not the one that we want
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};

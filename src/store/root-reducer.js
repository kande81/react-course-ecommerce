import { combineReducers } from "redux"; // this combines all the reducers into one big reducer
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
});

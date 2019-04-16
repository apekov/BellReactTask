import { combineReducers } from "redux";
import { organizationReducer } from "./organizationReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  organization: organizationReducer
});

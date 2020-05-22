import { combineReducers } from "redux";
import auth from "./authReducer";
import login from "./loginReducer";
import signup from "./signupReducer";
import dashboard from "./dashboardReducer";
import accountSettings from "./accountSettingsReducer";
import order from "./orderReducer";
import food from "./foodReducer";

export default combineReducers({
  auth,
  login,
  signup,
  dashboard,
  accountSettings,
  food,
  order,
});

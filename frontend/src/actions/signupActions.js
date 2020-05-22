import { db } from "config/db";
import { setUser } from "./authActions";

export const SIGNUP_BEGIN = "SIGNUP_BEGIN";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const CLEAR_SIGNUP_FORM = "CLEAR_SIGNUP_FORM";

export const clearSignupForm = () => ({
  type: CLEAR_SIGNUP_FORM,
});

export const signupBegin = () => ({
  type: SIGNUP_BEGIN,
});

export const signupSuccess = (userInfo) => ({
  type: SIGNUP_SUCCESS,
  payload: { userInfo },
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: { error },
});

export const signup = (email, userType, password, restaurantName) => {
  let userInfo = { email, userType, password, restaurantName };
  console.log(userInfo);
  return async (dispatch) => {
    dispatch(signupBegin());
    try {
      let res;
      switch (userType) {
        case "customers":
          res = await fetch(`${db}/add_customer`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
          });
          break;
        case "restaurantstaff":
          res = await fetch(`${db}/add_restaurant_staff`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
          });
          break;
        case "deliveryriders":
          res = await fetch(`${db}/add_delivery_rider`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
          });
          break;
        case "managers":
          res = await fetch(`${db}/add_fds_manager`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
          });
          break;
        default:
          break;
      }
      let data = await res.json();

      if (res.status === 200) {
        dispatch(signupSuccess(data));
        dispatch(setUser(data.uid, email, userType, 0, 0));
      } else {
        dispatch(signupFailure("Email Taken"));
      }
    } catch (error) {
      dispatch(signupFailure("Server Error. Please try again later..."));
    }
  };
};

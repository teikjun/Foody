import { db } from "config/db";
import { setUser } from "./authActions";

export const SET_EMAIL = "SET_EMAIL";
export const LOGIN_SET_USERTYPE = "LOGIN_SET_USERTYPE";
export const VALIDATE_EMAIL_BEGIN = "VALIDATE_EMAIL_BEGIN";
export const VALIDATE_EMAIL_SUCCESS = "VALIDATE_EMAIL_SUCCESS";
export const VALIDATE_EMAIL_FAILURE = "VALIDATE_EMAIL_FAILURE";
export const VALIDATE_PASSWORD_BEGIN = "VALIDATE_PASSWORD_BEGIN";
export const VALIDATE_PASSWORD_SUCCESS = "VALIDATE_PASSWORD_SUCCESS";
export const VALIDATE_PASSWORD_FAILURE = "VALIDATE_PASSWORD_FAILURE";
export const CLEAR_FORM = "CLEAR_FORM";

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: { email },
});

export const setUserType = (userType) => ({
  type: LOGIN_SET_USERTYPE,
  payload: { userType },
});

export const validateEmailBegin = () => ({
  type: VALIDATE_EMAIL_BEGIN,
});

export const validateEmailSuccess = () => ({
  type: VALIDATE_EMAIL_SUCCESS,
});

export const validateEmailFailure = (error) => ({
  type: VALIDATE_EMAIL_FAILURE,
  payload: { error },
});

export const validatePasswordBegin = () => ({
  type: VALIDATE_PASSWORD_BEGIN,
});

export const validatePasswordSuccess = () => ({
  type: VALIDATE_PASSWORD_SUCCESS,
});

export const validatePasswordFailure = (error) => ({
  type: VALIDATE_PASSWORD_FAILURE,
  payload: { error },
});

export const clearForm = () => ({
  type: CLEAR_FORM,
});

export const validateEmail = (email, userType) => {
  return async (dispatch) => {
    dispatch(validateEmailBegin());
    try {
      let res = await fetch(`${db}/validate_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, userType: userType }),
      });
      if (res.status === 200) {
        dispatch(validateEmailSuccess());
        dispatch(setEmail(email));
      } else {
        dispatch(validateEmailFailure("User not found"));
      }
    } catch (error) {
      dispatch(validateEmailFailure("Server Error. Please try again later..."));
    }
  };
};

export const validatePassword = (email, userType, password) => {
  return async (dispatch) => {
    dispatch(validatePasswordBegin());
    try {
      let res = await fetch(`${db}/validate_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, userType: userType, password: password }),
      });
      let body = await res.json();
      if (res.status === 200) {
        dispatch(validatePasswordSuccess());
        dispatch(clearForm());
        dispatch(setUser(body["uid"], email, userType, body["rewardpoints"], body["commision"]));
      } else {
        dispatch(validatePasswordFailure("Please check your password"));
      }
    } catch (error) {
      dispatch(validatePasswordFailure("Server Error. Please try again later..."));
    }
  };
};

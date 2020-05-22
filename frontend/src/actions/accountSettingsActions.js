import { db } from "config/db";
import { unsetUser } from "actions/authActions";

export const CHANGE_PASSWORD_BEGIN = "CHANGE_PASSWORD_BEGIN";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

export const CHANGE_CREDIT_CARD_BEGIN = "CHANGE_CREDIT_CARD_BEGIN";
export const CHANGE_CREDIT_CARD_SUCCESS = "CHANGE_CREDIT_CARD_SUCCESS";
export const CHANGE_CREDIT_CARD_FAILURE = "CHANGE_CREDIT_CARD_FAILURE";

export const DELETE_USER_BEGIN = "DELETE_USER_BEGIN";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const RESET_MSG = "RESET_MSG";

export const resetMsg = () => ({
  type: RESET_MSG,
});

export const changePasswordBegin = () => ({
  type: CHANGE_PASSWORD_BEGIN,
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = (error) => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: { error },
});

export const changeCreditCardBegin = () => ({
  type: CHANGE_CREDIT_CARD_BEGIN,
});

export const changeCreditCardSuccess = () => ({
  type: CHANGE_CREDIT_CARD_SUCCESS,
});

export const changeCreditCardFailure = (error) => ({
  type: CHANGE_CREDIT_CARD_FAILURE,
  payload: { error },
});

export const deleteUserBegin = () => ({
  type: DELETE_USER_BEGIN,
});

export const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
});

export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: { error },
});

export const changePassword = (uid, newPassword) => {
  return async (dispatch) => {
    dispatch(changePasswordBegin());
    try {
      let res = await fetch(`${db}/change_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, newPassword }),
      });
      if (res.status === 200) {
        dispatch(changePasswordSuccess());
      } else {
        dispatch(changePasswordFailure("Failed to change password"));
      }
    } catch (error) {
      dispatch(changePasswordFailure("Server Error. Please try again later..."));
    }
  };
};

export const changeCreditCard = (uid, newCreditCard) => {
  return async (dispatch) => {
    dispatch(changeCreditCardBegin());
    try {
      let res = await fetch(`${db}/change_credit_card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, newCreditCard }),
      });
      if (res.status === 200) {
        dispatch(changeCreditCardSuccess());
      } else {
        dispatch(changeCreditCardFailure("Failed to change credit card"));
      }
    } catch (error) {
      dispatch(changeCreditCardFailure("Server Error. Please try again later..."));
    }
  };
};

export const deleteUser = (uid) => {
  return async (dispatch) => {
    dispatch(deleteUserBegin());
    try {
      let res = await fetch(`${db}/delete_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid }),
      });
      if (res.status === 200) {
        dispatch(deleteUserSuccess());
        dispatch(unsetUser());
      } else {
        dispatch(deleteUserFailure("Failed to delete user"));
      }
    } catch (error) {
      dispatch(deleteUserFailure("Server Error. Please try again later..."));
    }
  };
};

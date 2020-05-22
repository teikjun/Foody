import {
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_CREDIT_CARD_BEGIN,
  CHANGE_CREDIT_CARD_SUCCESS,
  CHANGE_CREDIT_CARD_FAILURE,
  RESET_MSG,
  DELETE_USER_FAILURE,
} from "actions/accountSettingsActions";

const initialState = {
  changePasswordSuccessMsg: null,
  changePasswordErrorMsg: null,
  changeCreditCardSuccessMsg: null,
  changeCreditCardErrorMsg: null,
  deleteUserErrorMsg: null,
};

export default function accountSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_BEGIN:
      return {
        changePasswordSuccessMsg: null,
        changePasswordErrorMsg: null,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        changePasswordSuccessMsg: "You have sucessfully changed your password",
        changePasswordErrorMsg: null,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        changePasswordSuccessMsg: null,
        changePasswordErrorMsg: action.payload.error,
      };
    case CHANGE_CREDIT_CARD_BEGIN:
      return {
        changeCreditCardSuccessMsg: null,
        changeCreditCardErrorMsg: null,
      };
    case CHANGE_CREDIT_CARD_SUCCESS:
      return {
        changeCreditCardSuccessMsg: "You have sucessfully changed your credit card",
        changeCreditCardErrorMsg: null,
      };
    case CHANGE_CREDIT_CARD_FAILURE:
      return {
        changeCreditCardSuccessMsg: null,
        changeCreditCardErrorMsg: action.payload.error,
      };
    case DELETE_USER_FAILURE:
      return {
        deleteUserErrorMsg: action.payload.error,
      };
    case RESET_MSG:
      return initialState;
    default:
      return state;
  }
}

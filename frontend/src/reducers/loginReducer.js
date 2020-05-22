import {
  SET_EMAIL,
  LOGIN_SET_USERTYPE,
  VALIDATE_EMAIL_BEGIN,
  VALIDATE_EMAIL_SUCCESS,
  VALIDATE_EMAIL_FAILURE,
  VALIDATE_PASSWORD_BEGIN,
  VALIDATE_PASSWORD_SUCCESS,
  VALIDATE_PASSWORD_FAILURE,
  CLEAR_FORM,
} from "actions/loginActions";

const initialState = {
  email: "",
  userType: "",
  isValidEmail: false,
  isValidPassword: false,
  loading: false,
  error: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SET_USERTYPE:
      return {
        userType: action.payload.userType,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
    case VALIDATE_EMAIL_BEGIN:
      return {
        ...state,
        isValidEmail: false,
        loading: true,
        error: null,
      };
    case VALIDATE_EMAIL_SUCCESS:
      return {
        ...state,
        isValidEmail: true,
        loading: false,
        error: null,
      };
    case VALIDATE_EMAIL_FAILURE:
      return {
        ...state,
        isValidEmail: false,
        loading: false,
        error: action.payload.error,
      };
    case VALIDATE_PASSWORD_BEGIN:
      return {
        ...state,
        isValidPassword: false,
        loading: true,
        error: null,
      };
    case VALIDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isValidPassword: true,
        loading: false,
        error: null,
      };
    case VALIDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        isValidPassword: false,
        error: action.payload.error,
      };
    case CLEAR_FORM:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

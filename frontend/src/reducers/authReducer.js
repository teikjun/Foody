import { SET_USER, UNSET_USER } from "actions/authActions";

const initialState = {
  isLoggedIn: false,
  uid: null,
  authedEmail: "",
  userType: "",
  rewardPoints: null,
  commision: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        isLoggedIn: true,
        uid: action.payload.uid,
        authedEmail: action.payload.authedEmail,
        userType: action.payload.userType,
        rewardPoints: action.payload.rewardPoints,
        commision: action.payload.commision,
      };
    case UNSET_USER:
      return {
        isLoggedIn: false,
        uid: null,
        authedEmail: "",
        userType: "",
        rewardPoints: null,
        commision: null,
      };
    default:
      return state;
  }
}

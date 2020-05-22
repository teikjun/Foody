export const SET_USER = "SET_USER";
export const UNSET_USER = "UNSET_USER";

export const setUser = (uid, authedEmail, userType, rewardPoints, commision) => ({
  type: SET_USER,
  payload: { uid, authedEmail, userType, rewardPoints, commision },
});

export const unsetUser = () => ({
  type: UNSET_USER,
});

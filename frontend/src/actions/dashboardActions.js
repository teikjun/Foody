import { db } from "config/db";

export const GET_RESTAURANT_NAMES_BEGIN = "GET_RESTAURANT_NAMES_BEGIN";
export const GET_RESTAURANT_NAMES_SUCCESS = "GET_RESTAURANT_NAMES_SUCCESS";
export const GET_RESTAURANT_NAMES_FAILURE = "GET_RESTAURANT_NAMES_FAILURE";
export const GET_RESTAURANT_NAMES_BY_DATETIME_BEGIN = "GET_RESTAURANT_NAMES_BY_DATETIME_BEGIN";
export const GET_RESTAURANT_NAMES_BY_DATETIME_SUCCESS = "GET_RESTAURANT_NAMES_BY_DATETIME_SUCCESS";
export const GET_RESTAURANT_NAMES_BY_DATETIME_FAILURE = "GET_RESTAURANT_NAMES_BY_DATETIME_FAILURE";

export const getRestaurantNamesBegin = () => ({
  type: GET_RESTAURANT_NAMES_BEGIN,
});

export const getRestaurantNamesSuccess = (restaurants) => ({
  type: GET_RESTAURANT_NAMES_SUCCESS,
  payload: { restaurants },
});

export const getRestaurantNamesFailure = (error) => ({
  type: GET_RESTAURANT_NAMES_FAILURE,
  payload: { error },
});

export const getRestaurantNamesByDatetimeBegin = () => ({
  type: GET_RESTAURANT_NAMES_BY_DATETIME_BEGIN,
});

export const getRestaurantNamesByDatetimeSuccess = (restaurants) => ({
  type: GET_RESTAURANT_NAMES_BY_DATETIME_SUCCESS,
  payload: { restaurants },
});

export const getRestaurantNamesByDatetimeFailure = (error) => ({
  type: GET_RESTAURANT_NAMES_BY_DATETIME_FAILURE,
  payload: { error },
});

export const getRestaurantNames = () => {
  return async (dispatch) => {
    dispatch(getRestaurantNamesBegin());
    try {
      let res = await fetch(`${db}/stores`);
      let data = await res.json();
      dispatch(getRestaurantNamesSuccess(data));
    } catch (error) {
      dispatch(getRestaurantNamesFailure("Server Error. Please try again later..."));
    }
  };
};

export const getRestaurantNamesByDatetime = (inputDay, inputTime) => {
  const postBody = { inputDay: inputDay, inputTime: inputTime };
  return async (dispatch) => {
    dispatch(getRestaurantNamesByDatetimeBegin());
    try {
      let res = await fetch(`${db}/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });
      let data = await res.json();
      dispatch(getRestaurantNamesByDatetimeSuccess(data));
    } catch (error) {
      dispatch(getRestaurantNamesByDatetimeFailure("Server Error. Please try again later..."));
    }
  };
};

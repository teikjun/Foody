import { db } from "config/db";

export const GET_FOOD_DATA_BEGIN = "GET_FOOD_DATA_BEGIN";
export const GET_FOOD_DATA_SUCCESS = "GET_FOOD_DATA_SUCCESS";
export const GET_FOOD_DATA_FAILURE = "GET_FOOD_DATA_FAILURE";
export const FILTER_FOOD_DATA = "FILTER_FOOD_DATA";

export const getFoodDataBegin = () => ({
  type: GET_FOOD_DATA_BEGIN,
});

export const getFoodDataSuccess = (foodData) => ({
  type: GET_FOOD_DATA_SUCCESS,
  payload: { foodData },
});

export const getFoodDataFailure = (error) => ({
  type: GET_FOOD_DATA_FAILURE,
  payload: { error },
});

export const filterFoodData = (searchInput) => ({
  type: FILTER_FOOD_DATA,
  payload: { searchInput },
});

export const getFoodData = () => {
  return async (dispatch) => {
    dispatch(getFoodDataBegin());
    try {
      let res = await fetch(`${db}/get_food_data`);
      let data = await res.json();
      dispatch(getFoodDataSuccess(data));
    } catch (error) {
      dispatch(getFoodDataFailure("Server Error. Please try again later..."));
    }
  };
};

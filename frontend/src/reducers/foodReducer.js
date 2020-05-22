import {
  GET_FOOD_DATA_BEGIN,
  GET_FOOD_DATA_SUCCESS,
  GET_FOOD_DATA_FAILURE,
  FILTER_FOOD_DATA,
} from "actions/foodActions";

const initialState = {
  foodData: [],
  filteredData: [],
  loading: false,
  error: null,
};

export default function foodReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOOD_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_FOOD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        foodData: action.payload.foodData,
        filteredData: action.payload.foodData,
      };
    case GET_FOOD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case FILTER_FOOD_DATA:
      const searchInput = action.payload.searchInput;
      let filteredData = state.foodData.filter(
        (food) => food["foodname"].includes(searchInput) || food["rname"].includes(searchInput),
      );
      return {
        ...state,
        filteredData: filteredData,
      };
    default:
      return state;
  }
}

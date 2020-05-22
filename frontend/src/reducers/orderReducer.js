import {
  ADD_FOOD_TO_CURRENT_ORDER,
  ADD_AVAILABLE_PROMO_TO_CURRENT_ORDER,
  RESET_CURRENT_ORDER,
  ORDER_PLACED,
  ORDER_NOT_PLACED,
} from "actions/orderActions";

const initialState = {
  currentOrder: [],
  availablePromoIds: [],
  isBeingDelivered: false,
  error: null,
  loading: false,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_NOT_PLACED:
      return {
        ...state,
        isBeingDelivered: false,
      };
    case ORDER_PLACED:
      return {
        ...state,
        isBeingDelivered: true,
      };
    case ADD_FOOD_TO_CURRENT_ORDER:
      const newCurrentOrder = [...state.currentOrder];
      for (let entry of newCurrentOrder) {
        if (
          action.payload.foodItem.rname === entry.rname &&
          action.payload.foodItem.foodname === entry.foodname
        ) {
          entry.qty += action.payload.foodItem.qty;
          return {
            ...state,
            currentOrder: newCurrentOrder,
          };
        }
      }
      return {
        ...state,
        currentOrder: [...state.currentOrder, action.payload.foodItem],
      };
    case ADD_AVAILABLE_PROMO_TO_CURRENT_ORDER:
      return {
        ...state,
        availablePromoIds: action.payload.availablePromoIds,
      };
    case RESET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: [],
      };
    default:
      return state;
  }
}

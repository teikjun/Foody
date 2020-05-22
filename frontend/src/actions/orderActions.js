// Current Order
export const ADD_FOOD_TO_CURRENT_ORDER = "ADD_FOOD_TO_CURRENT_ORDER";
export const ADD_AVAILABLE_PROMO_TO_CURRENT_ORDER = "ADD_AVAILABLE_PROMO_TO_CURRENT_ORDER";
export const RESET_CURRENT_ORDER = "RESET_CURRENT_ORDER";
export const ORDER_PLACED = "ORDER_PLACED";
export const ORDER_NOT_PLACED = "ORDER_NOT_PLACED";

export const addFoodToCurrentOrder = (foodItem) => ({
  type: ADD_FOOD_TO_CURRENT_ORDER,
  payload: { foodItem },
});

export const addAvailablePromoToCurrentOrder = (availablePromoIds) => ({
  type: ADD_AVAILABLE_PROMO_TO_CURRENT_ORDER,
  payload: { availablePromoIds },
});

export const resetCurrentOrder = () => ({
  type: RESET_CURRENT_ORDER,
});

export const orderPlaced = () => ({
  type: ORDER_PLACED,
});

export const orderNotPlaced = () => ({
  type: ORDER_NOT_PLACED,
});

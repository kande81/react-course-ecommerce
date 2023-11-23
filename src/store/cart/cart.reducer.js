import { CART_ACTION_TYPES } from "./cart.types";
/*when setting the initial state, we can think of the reducer we are trying to create as an 
object and determine what the readable properties of that object are. In this case, we want
    to be able to access the isCartOpen, cartItems, cartCount, and cartTotal properties
 */
export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      return state;
  }
};

import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

// here whatever the output of the selectCartReducer is, it is what is passed as the parameter in (cart) => cart.isCartOpen. if we had a second item in [selectCartReducer] array, then that second item would be passed as the second parameter in (cart, secondItem) => cart.isCartOpen function
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// the same principle applies here as in the selectIsCartOpen selector
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

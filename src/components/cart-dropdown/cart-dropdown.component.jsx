import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook from React Router

import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component"; // Importing the Button component
import CartItem from "../cart-item/cart-item.component"; // Importing the CartItem component

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles"; // Importing the styles for the CartDropdown component

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate(); // Using the useNavigate hook to get the navigate function, which is used to navigate to a different page

  const goToCheckoutHandler = () => {
    // Function to handle the click event on the "GO TO CHECKOUT" button
    navigate("/checkout"); // Navigating to the checkout page
  };

  return (
    <CartDropdownContainer>
      {" "}
      <CartItems>
        {" "}
        {cartItems.length ? ( // If there are cart items
          cartItems.map(
            (
              cartItem // Map through the cart items and render the CartItem component for each item
            ) => <CartItem key={cartItem.id} cartItem={cartItem} />
          )
        ) : (
          // If there are no cart items
          <EmptyMessage>Your cart is empty</EmptyMessage> // Display a message saying the cart is empty
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown; // Exporting the CartDropdown component

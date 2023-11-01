import { useContext } from "react"; // Importing the useContext hook from React
import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook from React Router

import { CartContext } from "../../contexts/cart.context"; // Importing the CartContext from the cart.context.js file

import Button from "../button/button.component"; // Importing the Button component
import CartItem from "../cart-item/cart-item.component"; // Importing the CartItem component

import "./cart-dropdown.styles.scss"; // Importing the styles for the CartDropdown component

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext); // Using the useContext hook to get the cartItems from the CartContext
  const navigate = useNavigate(); // Using the useNavigate hook to get the navigate function, which is used to navigate to a different page

  const goToCheckoutHandler = () => {
    // Function to handle the click event on the "GO TO CHECKOUT" button
    navigate("/checkout"); // Navigating to the checkout page
  };

  return (
    <div className="cart-dropdown-container">
      {" "}
      <div className="cart-items">
        {" "}
        {cartItems.length ? ( // If there are cart items
          cartItems.map(
            (
              cartItem // Map through the cart items and render the CartItem component for each item
            ) => <CartItem key={cartItem.id} cartItem={cartItem} />
          )
        ) : (
          // If there are no cart items
          <span className="empty-message">Your cart is empty</span> // Display a message saying the cart is empty
        )}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown; // Exporting the CartDropdown component

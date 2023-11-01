import { Outlet, Link } from "react-router-dom"; // the outlet is a placeholder for where the child components will be rendered. the link component is used to link to other pages in the app. it is similar to the anchor tag in html
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"; // the react component as syntax allows us to import svgs as react components. this allows us to style the svg with css. the svg is stored in the crownLogo variable
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

// when the useContext hook is used inside a component, that component will re-render any time the value of the UserContext changes
const Navigation = () => {
  const { currentUser } = useContext(UserContext); // the value stored in current user comes from the value prop of the UserContext.Provider in the user.context.jsx file. the value prop is an object with currentUser and setCurrentUser as properties. we destructure the currentUser property from the object returned by useContext(UserContext) and store it in the currentUser variable: so it takes the value from this line in the user.context file <UserContext.Provider value={value}>{children}</UserContext.Provider>

  // the signOutHandler function is used to sign out the user
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {
            // if the currentUser is not null, then we show the sign out link
            currentUser ? (
              <NavLink as="span" onClick={signOutUser}>
                {" "}
                {/* the as prop allows us to change the element that is rendered. in this case, we are changing the element from a link to a span */}
                SIGN OUT
              </NavLink>
            ) : (
              // if the currentUser is null, then we show the sign in link
              <NavLink to="/auth">SIGN IN</NavLink>
            )
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />{" "}
      {/* the outlet is a placeholder for where the child components will be rendered */}
    </>
  );
};

export default Navigation;

import { Outlet, Link } from "react-router-dom"; // the outlet is a placeholder for where the child components will be rendered. the link component is used to link to other pages in the app. it is similar to the anchor tag in html
import { useSelector, useDispatch } from "react-redux"; // the useSelector hook helps us interact with the redux store
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"; // the react component as syntax allows us to import svgs as react components. this allows us to style the svg with css. the svg is stored in the crownLogo variable
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

// when the useContext hook is used inside a component, that component will re-render any time the value of the UserContext changes
const Navigation = () => {
  const dispatch = useDispatch(); // the dispatch function is used to dispatch actions to the redux store

  // the signOutHandler function is used to sign out the user
  // const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser); // when using useSelector, it will re-run whenever the state changes. that will then cause the component to re-render. the selectCurrentUser is a helper function that returns the function that is normaly passed as the argument to useSelector.

  const signOutUser = () => dispatch(signOutStart()); // this action will be handle by the saga that we created to handle the sign out process

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

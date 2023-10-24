import { Outlet, Link } from "react-router-dom"; // the outlet is a placeholder for where the child components will be rendered. the link component is used to link to other pages in the app. it is similar to the anchor tag in html
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"; // the react component as syntax allows us to import svgs as react components. this allows us to style the svg with css. the svg is stored in the crownLogo variable
import "./navigation.styles.scss";

// when the useContext hook is used inside a component, that component will re-render any time the value of the UserContext changes
const Navigation = () => {
  const { currentUser } = useContext(UserContext); // the value stored in current user comes from the value prop of the UserContext.Provider in the user.context.jsx file. the value prop is an object with currentUser and setCurrentUser as properties. we destructure the currentUser property from the object returned by useContext(UserContext) and store it in the currentUser variable: so it takes the value from this line in the user.context file <UserContext.Provider value={value}>{children}</UserContext.Provider>

  // the signOutHandler function is used to sign out the user

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {
            // if the currentUser is not null, then we show the sign out link
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>
                SIGN OUT
              </span>
            ) : (
              // if the currentUser is null, then we show the sign in link
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
            )
          }
        </div>
      </div>
      <Outlet />{" "}
      {/* the outlet is a placeholder for where the child components will be rendered */}
    </>
  );
};

export default Navigation;

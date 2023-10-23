import { Outlet, Link } from "react-router-dom"; // the outlet is a placeholder for where the child components will be rendered. the link component is used to link to other pages in the app. it is similar to the anchor tag in html

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"; // the react component as syntax allows us to import svgs as react components. this allows us to style the svg with css. the svg is stored in the crownLogo variable
import "./navigation.styles.scss";
const Navigation = () => {
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
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;

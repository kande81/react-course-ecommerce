import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
// import Category from "../category/category.component";
import Category from "../category/category.component";

import "./shop.styles.scss";

// inside this shop component, the routes are relative to the /shop route
const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />{" "}
      {/* The index route is used to render the CategoriesPreview component when the user is on the /shop route */}
      <Route path=":category" element={<Category />} />{" "}
      {/*// This line of code defines a route in a React Router application.
// The 'path' prop is set to ":category", which is a URL parameter.
// URL parameters are placeholders that can be filled with a value from the URL.
// In this case, ":category" will match any path that follows the current path.
// The 'element' prop is set to a <Category /> component, which will be rendered when the route is matched.
// So, for example, if the URL is "/shop/jackets", the <Category /> component will be rendered and "jackets" will be passed as a parameter. */}
    </Routes>
  );
};

export default Shop;

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
// import Category from "../category/category.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";
import { setCategoriesMap } from "../../store/categories/category.action";
// inside this shop component, the routes are relative to the /shop route
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories"); //categoryMap is an object with keys as category titles and values as arrays of products
      dispatch(setCategoriesMap(categoryMap)); //setCategoriesMap is the helper function that returns the function that is passed as the argument to useDispatch
    };
    getCategoriesMap(); //calling the async function
  }, []);

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

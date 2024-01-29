import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";

import ProductCard from "../../components/product-card/product-card.component";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";
import { CategoryContainer, Title } from "./category.styles";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap); // categoriesMap is an object with keys as category titles and values as arrays of products
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;

// import { useContext, useState, useEffect, Fragment } from "react";
// import { useParams } from "react-router-dom"; // // The 'useParams' function is a hook from 'react-router-dom' that returns an object of key/value pairs of URL parameters.
// // It can be used in any component that is rendered by a <Route> to access the URL parameters.

// import ProductCard from "../../components/product-card/product-card.component";

// import { CategoriesContext } from "../../contexts/categories.context";

// import "./category.styles.scss";

// const Category = () => {
//   const { category } = useParams();
//   const { categoriesMap } = useContext(CategoriesContext);
//   const [products, setProducts] = useState(categoriesMap[category]);

//   // this useEffect will ensure that the products state is only updated when the category state or categoriesMap state changes
//   useEffect(() => {
//     setProducts(categoriesMap[category]);
//   }, [category, categoriesMap]);

//   return (
//     <Fragment>
//       <h2 className="category-title">{category.toUpperCase()}</h2>
//       <div className="category-container">
//         {products &&
//           products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//       </div>
//     </Fragment>
//   );
// };

// export default Category;

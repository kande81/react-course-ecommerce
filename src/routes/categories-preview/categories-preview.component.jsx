import { useContext } from "react";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext); //categories is an object with keys as category titles and values as arrays of products

  return (
    <>
      {Object.keys(categoriesMap).map(
        (
          title //Object.keys(categoriesMap) returns an array of the keys of the categoriesMap object
        ) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        }
      )}
    </>
  );
};

export default CategoriesPreview;

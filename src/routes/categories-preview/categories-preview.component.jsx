import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useSelector } from "react-redux";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
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

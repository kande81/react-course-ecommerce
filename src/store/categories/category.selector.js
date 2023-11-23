import { createSelector } from "reselect";
/*
when we will call selectCategoriesMap in the useSelector in the category.component file in the routes folder
it will first return the function definition of selectCategoryReducer and the return value of that is what is passed as the argument 
in (categoriesSlice) => categoriesSlice.categories, then the return value of that is passed as the argument in:   (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
so at the end the useSelector in the category.component file will return the return value of:
(categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
*/
const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

// code without reselect
// // the return of this selector is an object with the categories as keys and the items as values. This selector gets the the categories initial state from the categories reducer which is an array and reduce it to the object.
// export const selectCategoriesMap = (state) => {
//   console.log("categories selector fired");
//   return state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// };

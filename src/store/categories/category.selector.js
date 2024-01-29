import { createSelector } from "reselect";
/*
the 'stat' parameter in this function refers to the whole reducer object in the root-reducer.js file
the way the this code will work is that when selectCategoriesMap is called in the useSelector it 
will first run the definition of the selectCategoriesReducer which will return the value of state.categories
. Then it will check whether the object returned by state.categories has changed or not. If it has not changed
then it will return the value of the previous call of selectCategoriesMap. If it has changed then it will first
run the function of selectCategories and then check if that has changed or not. If it has not changed then it will again immediately return the value of the previous call of selectCategoriesMap. If it has changed then it will run the function of selectCategoriesMap and return the value of that function.
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

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
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

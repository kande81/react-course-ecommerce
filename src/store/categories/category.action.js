import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// we do not need to pass in the payload here because we are not using the payload in the reducer
// fetchCategoriesStart and failure and success are all work syncronously.
export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesFailure = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

//this function is our thunk. with this setup we can determine how to fetch our categories
// and what to do when it succeeds or fails. so the way this will work is that when we call dispatch
// in one of our components with fetchCategoriesStartAsync, it will send the async function to the thunk, which will then run it with the dipatch function as a parameter. it will first call dispatch with fetchCategoriesStart which will set the isLoading to true and the spinner will show in components that are in the shop page like the category componet. Then it will try to fetch the categories from the database. If it succeeds then it will call dispatch with fetchCategoriesSuccess and pass in the categoriesArray as the payload and in the reducer for categories this will set the categories in the state and set the isLoading property to false which will then in our category . If it fails then it will call dispatch with fetchCategoriesFailure and pass in the error as the payload.
export const fetchCategoriesStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};

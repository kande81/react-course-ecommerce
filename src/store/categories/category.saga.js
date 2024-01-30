import { takeLatest, call, put, all } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

// this is the generator function that will run when the fetchCategoriesStart action gets fired
// here when fetchCategoriesSuccess and fetchCategoriesFailure are dispatched they will get back to
// the redux flow and update the reducers or trigger any sagas that are listening for those actions.
// using yield in generator can be thought of as await in async functions.
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories"); // call is the saga effect for calling functions. it's the same as calling the function normally, the second argument is the argument that we want to pass to the function
    yield put(fetchCategoriesSuccess(categoriesArray)); // put is the saga effect for creating actions. it's the same as dispatch
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

// here we are listening for the fetchCategoriesStart action and when it gets fired we will run the fetchCategoriesAsync function. also what takeLatest does is that if the fetchCategoriesStart action gets fired multiple times then it will only run the last one. so if the user clicks on the categories link multiple times then it will only run the last one.
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// here the all function is like the Promise.all function. it will run all the sagas that are passed in the array. so any code after the first yield all will only run after all the sagas in the array are done.
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}

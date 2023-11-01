import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // when you want to use an async function inside of useEffect (getCategoriesAndDocuments in this case) you need to create a new async function inside of useEffect and then call it
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments(); //categoryMap is an object with keys as category titles and values as arrays of products
      console.log("categorymap in context: ", categoryMap);
      setCategoriesMap(categoryMap); //setCategoriesMap is a function that takes in an object and sets the categoriesMap state to that object
    };
    getCategoriesMap(); //calling the async function
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

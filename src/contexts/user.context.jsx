import { createContext, useEffect, useReducer } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) =>
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe; // this is the cleanup function that will run when the component unmounts. unsubscribe is actually a function. In a useEffect hook, you can return a function that will run when the component unmounts. This is called the cleanup function.
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// this is the code without using reducers

// import { createContext, useState, useEffect } from "react";

// import {
//   onAuthStateChangedListener,
//   signOutUser,
//   createUserDocumentFromAuth,
// } from "../utils/firebase/firebase.utils";

// // see this as the actual value that you want to access
// // we will import this in the components that need it
// export const UserContext = createContext({
//   currentUser: null,
//   setCurrentUser: () => null,
// });

// // see this as the provider that will provide the value to the components
// // in the index.js file, we wrap the entire app in this provider
// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const value = { currentUser, setCurrentUser };

//   // when we pass in an empty bracket as the second argument to the useEffect hook, it means that the useEffect hook will only run once when the component mounts.
//   useEffect(() => {
//     const unsubscribe = onAuthStateChangedListener((user) => {
//       if (user) {
//         createUserDocumentFromAuth(user);
//       }
//       setCurrentUser(user);
//     });

//     return unsubscribe;
//   }, []);
//   // the value prop here which is currentUser and setCurrentUser as an object is what will be returned when we import the UserContext in the components that need it by calling useContext(UserContext)
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

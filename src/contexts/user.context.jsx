import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  signOutUser,
} from "../utils/firebase/firebase.utils";

// see this as the actual value that you want to access
// we will import this in the components that need it
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// see this as the provider that will provide the value to the components
// in the index.js file, we wrap the entire app in this provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // when we pass in an empty bracket as the second argument to the useEffect hook, it means that the useEffect hook will only run once when the component mounts.
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // onAuthStateChanged returns a function that can be used to stop listening for auth state changes.
      console.log("user from user.context", user);
      setCurrentUser(user);
    });

    return unsubscribe; // when using useEffect, whatever is returned will run when the component unmounts
  }, []);

  // the value prop here which is currentUser and setCurrentUser as an object is what will be returned when we import the UserContext in the components that need it by calling useContext(UserContext)
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

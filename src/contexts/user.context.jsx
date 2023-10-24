import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentFromAuth,
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
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  // the value prop here which is currentUser and setCurrentUser as an object is what will be returned when we import the UserContext in the components that need it by calling useContext(UserContext)
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

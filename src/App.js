import { useEffect } from "react";

import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux"; // useDispatch is a hook that gives us access to the dispatch function that we can use to dispatch actions to the redux store

// the Route component with the index prop is the default route that will be rendered when the path matches the parent path
// so the navigation component will be rendered when the path matches the / path and the home component will also be rendered
// under that path because of the index prop
const App = () => {
  const dispatch = useDispatch(); //this dispatch reference will never change because it is a function that will always be the same. So we don't need to add it to the dependency array of the useEffect hook
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe; // this is the cleanup function that will run when the component unmounts. unsubscribe is actually a function. In a useEffect hook, you can return a function that will run when the component unmounts. This is called the cleanup function.
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />{" "}
        {/*the * is a wildcard that will match any path that starts with shop */}
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

import { useEffect } from "react"; // useEffect is used to run some code everytime the component is mounted for the first time
import { getRedirectResult } from "firebase/auth"; // getRedirectResult is used to get the result of the redirect operation

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  //     useEffect( () => {
  //         (async () => {
  //         const response = await getRedirectResult(auth);
  //         if(response) {
  //             const userDocRef = createUserDocumentFromAuth(response.user);
  //         }
  //         console.log(response);
  //     })();
  // }, []);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;

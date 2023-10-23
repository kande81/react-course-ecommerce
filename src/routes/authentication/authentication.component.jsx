import { useEffect } from "react"; // useEffect is used to run some code everytime the component is mounted for the first time
import { getRedirectResult } from "firebase/auth"; // getRedirectResult is used to get the result of the redirect operation

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
// import the css
import "./authentication.styles.scss";

const Authentication = () => {
  //     useEffect( () => {
  //         (async () => {
  //         const response = await getRedirectResult(auth);
  //         if(response) {
  //             const userDocRef = createUserDocumentFromAuth(response.user);
  //         }
  //         console.log(response);
  //     })();
  // }, []);
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;

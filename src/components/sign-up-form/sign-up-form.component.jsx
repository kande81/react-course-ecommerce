import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
// these fields would have been individually declared in the state. this is just a shorthand

import Button from "../button/button.component";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  // this function is used to reset the form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // console.log(formFields);
  // event prevent default is used to prevent the
  // page from refreshing
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
        return;
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  // when any of the input fields change, we update the state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1> Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          required
          value={displayName}
        />
        <FormInput
          label="email"
          type="email"
          name="email"
          required
          value={email}
        />
        <FormInput
          label="password"
          type="password"
          name="password"
          required
          value={password}
        />
        <FormInput
          label="confirm password"
          type="password"
          name="confirmPassword"
          required
          value={confirmPassword}
        />
        <Button buttonType="inverted" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;

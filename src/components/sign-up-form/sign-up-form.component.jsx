// import { useState } from "react";

// import FormInput from "../form-input/form-input.component";
// import Button from "../button/button.component";

// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";

// import "./sign-up-form.styles.scss";

// const defaultFormFields = {
//   displayName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// const SignUpForm = () => {
//   const [formFields, setFormFields] = useState(defaultFormFields);
//   const { displayName, email, password, confirmPassword } = formFields;

//   const resetFormFields = () => {
//     setFormFields(defaultFormFields);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (password !== confirmPassword) {
//       alert("passwords do not match");
//       return;
//     }

//     try {
//       const { user } = await createAuthUserWithEmailAndPassword(
//         email,
//         password
//       );

//       await createUserDocumentFromAuth(user, { displayName });
//       resetFormFields();
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         alert("Cannot create user, email already in use");
//       } else {
//         console.log("user creation encountered an error", error);
//       }
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormFields({ ...formFields, [name]: value });
//   };

//   return (
//     <div className="sign-up-container">
//       <h2>Don't have an account?</h2>
//       <span>Sign up with your email and password</span>
//       <form onSubmit={handleSubmit}>
//         <FormInput
//           label="Display Name"
//           type="text"
//           required
//           onChange={handleChange}
//           name="displayName"
//           value={displayName}
//         />

//         <FormInput
//           label="Email"
//           type="email"
//           required
//           onChange={handleChange}
//           name="email"
//           value={email}
//         />

//         <FormInput
//           label="Password"
//           type="password"
//           required
//           onChange={handleChange}
//           name="password"
//           value={password}
//         />

//         <FormInput
//           label="Confirm Password"
//           type="password"
//           required
//           onChange={handleChange}
//           name="confirmPassword"
//           value={confirmPassword}
//         />
//         <Button type="submit">Sign Up</Button>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
// these fields would have been individually declared in the state. this is just a shorthand

import Button from "../button/button.component";
import "./sign-up-form.styles.scss";
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
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span> Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          onChange={handleChange}
          required
          value={displayName}
        />
        <FormInput
          label="email"
          type="email"
          name="email"
          onChange={handleChange}
          required
          value={email}
        />
        <FormInput
          label="password"
          type="password"
          name="password"
          onChange={handleChange}
          required
          value={password}
        />
        <FormInput
          label="confirm password"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
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

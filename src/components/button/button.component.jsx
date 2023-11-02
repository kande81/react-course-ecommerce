// these are the styled components that we are importing into this file
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

// This JavaScript function, getButton, is used to return a specific button component based on the 'buttonType' argument.
// The 'buttonType' argument defaults to 'BUTTON_TYPE_CLASSES.base' if no argument is provided when the function is called.
//
// The function creates an object where the keys are button types and the values are corresponding button components.
// These button types are presumably defined elsewhere in the code as constants in the 'BUTTON_TYPE_CLASSES' object.
//
// The function then uses the 'buttonType' argument to access the corresponding button component from the object.
// If the 'buttonType' does not match any of the keys in the object, it will return 'undefined'.
//
// The returned component can then be used elsewhere in the code to render the appropriate button.
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]); // here we are using the bracket notation to access the object's key-value pairs

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType); // CustomButton will be assigned the value of the button component returned by the getButton function which is one of the following: BaseButton, GoogleSignInButton, or InvertedButton imported above
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;

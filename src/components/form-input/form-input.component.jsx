import { FormInputLabel, Input, Group } from "./form-input.styles";
// the ...otherprops is a spread operator that will pass all the props that we dont need to manually pass
// in the input tag all the ...otherprops will be passed to the input tag as the attributes
// the way the code with label && works is that if the label is not null then the label tag will be rendered otherwise it will not be rendered.
const FormInput = ({ label, ...otherprops }) => {
  return (
    <Group>
      <Input {...otherprops} />
      {label && (
        <FormInputLabel shrink={otherprops.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;

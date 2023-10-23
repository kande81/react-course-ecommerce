import "./form-input.styles.scss";
// the ...otherprops is a spread operator that will pass all the props that we dont need to manually pass
// in the input tag all the ...otherprops will be passed to the input tag as the attributes
// the way the code with label && works is that if the label is not null then the label tag will be rendered otherwise it will not be rendered.
const FormInput = ({ label, ...otherprops }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherprops} />
      {label && (
        <label
          className={`${
            otherprops.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;

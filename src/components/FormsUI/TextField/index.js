import { OutlinedInput, TextField } from "@material-ui/core";
import { useField } from "formik";
import React from "react";

const TextFieldWrapper = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const configureTextField = {
    ...field,
    ...props,
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configureTextField.error = true;
    configureTextField.helperText = meta.error;
  }

  return <OutlinedInput {...configureTextField} />;
};

export default TextFieldWrapper;

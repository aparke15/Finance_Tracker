import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import {
  EmailOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Link, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import TextField from "./FormsUI/TextField";
import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

const initial_form_state = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Enter a valid email"),
  password: yup.string().password().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
});

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const onSubmit = (e) => {};

  return (
    <>
      <h3>Sign Up</h3>
      <Formik
        validateOnChange={true}
        initialValues={{
          ...initial_form_state,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // make calls to b/e
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField name="email" type="input" placeholder="Enter email" />

            <InputLabel htmlFor="password">Password</InputLabel>
            <TextField
              name="password"
              type={showPassword ? "input" : "password"}
              placeholder="Enter Password"
              style={{ marginBottom: "20px" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle-password-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />

            <InputLabel htmlFor="confirmPassword">Re-type Password</InputLabel>
            <TextField
              name="confirmPassword"
              type={showConfirmPassword ? "input" : "password"}
              placeholder="Re-type Password"
              style={{ marginBottom: "20px" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle-password-visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button disabled={isSubmitting} type="submit" className="btn">
              Sign Up
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
      <div>
        Already have an account? <Link to={`/login`}>Sign in</Link> instead!
      </div>

      <Routes>
        <Route path={`/login`} element={<Login />} />
      </Routes>
    </>
  );
};

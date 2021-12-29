import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import { Link, Route, Routes } from "react-router-dom";
import TextField from "./FormsUI/TextField";
import { Register } from "./Register";
import * as yup from "yup";
import YupPassword from "yup-password";
import { GlobalContext } from "../context/GlobalState";

YupPassword(yup);

const initial_form_state = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Enter a valid email"),
  password: yup.string().required(),
});
export const Login = () => {
  const { user, users, addUser, getUser, getAllUsers } =
    useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const emailList = users.map((user) => user.email);
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = () => {
    const credentials = {
      email,
      password,
    };
    console.log("creds: ", credentials);
    getUser(credentials);
  };

  return (
    <>
      <h3>Sign In</h3>
      <Formik
        validateOnChange={true}
        initialValues={{
          ...initial_form_state,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // make calls to b/e
          handleSubmit();
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
              name="email"
              type="input"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
                values.email = e.target.value;
                if (!emailList.includes(e.target.value)) {
                  errors.email = "Invalid email";
                }
              }}
            />
            {errors.email ? <div className="err">{errors.email}</div> : null}

            <InputLabel htmlFor="password">Password</InputLabel>
            <TextField
              name="password"
              type={showPassword ? "input" : "password"}
              placeholder="Enter Password"
              style={{ marginBottom: "20px" }}
              onChange={(e) => {
                setPassword(e.target.value);
                values.password = e.target.value;
              }}
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
            {errors.password ? (
              <div className="err">{errors.password}</div>
            ) : null}
            <Button type="submit" className="btn">
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        Don't have an account? <Link to={`/register`}>Sign up</Link> instead!
      </div>
    </>
  );
};

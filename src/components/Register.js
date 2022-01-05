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
import React, { useContext, useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Link, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import TextField from "./FormsUI/TextField";
import * as yup from "yup";
import YupPassword from "yup-password";
import { GlobalContext } from "../context/GlobalState";

YupPassword(yup);

const initial_form_state = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Enter a valid email"),
  // password: yup.string().password().required(),
  password: yup.string().required(),
  // confirmPassword: yup
  // .string()
  // .oneOf([yup.ref("password"), null], "Passwords do not match"),
});

export const Register = () => {
  const { user, users, addUser, getUser, getAllUsers, login, isLoggedIn } =
    useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const emailList = users.map((user) => user.email);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  // const onSubmit = (e) => {};
  const handleSubmit = async () => {
    const newUser = {
      email,
      password,
    };
    await addUser(newUser);
    if (localStorage.getItem("token")) localStorage.removeItem("token");
    const jwtToken = await login(newUser);
    localStorage.setItem("token", jwtToken);
    if (localStorage.getItem("currentUser"))
      localStorage.removeItem("currentUser");
    const loggedInUser = await getUser(newUser);
    localStorage.setItem("currentUser", loggedInUser);
  };

  return (
    <>
      <h3>Sign Up</h3>
      <Formik
        validateOnChange={true}
        initialValues={{
          ...initial_form_state,
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // make calls to b/e
          await handleSubmit();
          setSubmitting(false);
          window.location.reload(false);
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
                if (emailList.includes(e.target.value)) {
                  errors.email = "Email already in use";
                } else if (errors.email === "Email already in use") {
                  delete errors.email;
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
            {errors.confirmPassword ? (
              <div className="err">{errors.confirmPassword}</div>
            ) : null}

            <Button disabled={isSubmitting} type="submit" className="btn">
              Sign Up
            </Button>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
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

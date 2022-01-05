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
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
export const Login = (props) => {
  const navigate = useNavigate();
  const { users, getUser, getAllUsers, login, isLoggedIn } =
    useContext(GlobalContext);

  const [email, setEmail] = useState("");
  // console.log(users);
  const emailList = users.map((user) => user.email);

  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getAllUsers();
    // if (isLoggedIn) {
    //   navigate("/");
    // }
  }, []);
  const handleSubmit = async (credentials) => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
    const jwtToken = await login(credentials);
    localStorage.setItem("token", jwtToken);
    if (localStorage.getItem("currentUser"))
      localStorage.removeItem("currentUser");
    const loggedInUser = await getUser(credentials);
    localStorage.setItem("currentUser", loggedInUser);
    // console.log(localStorage);
    // await setIsLoggedIn();
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
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // console.log(data);
          // make calls to b/e
          // console.log(data);
          await handleSubmit(data);
          setSubmitting(false);
          // resetForm();
          // console.log("about to navaigate");
          // console.log(navigate(-1));
          // props.history.push("/");
          // console.log("navaigated");
          // <Navigate to={"/"} />;
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
                if (!emailList.includes(e.target.value)) {
                  errors.email = "Invalid email";
                } else if (errors.email === "Invalid email") {
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
            <Button type="submit" className="btn">
              Login
            </Button>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
      <div>
        Don't have an account? <Link to={`/register`}>Sign up</Link> instead!
      </div>
    </>
  );
};

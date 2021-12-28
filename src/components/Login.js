import React, { useRef, useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Link, Route, Routes } from "react-router-dom";
import { Register } from "./Register";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (e) => {};

  return (
    <>
      <h3>Sign In</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          fullWidth
          ref={emailRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          fullWidth
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Button type="submit" className="btn">
          Login
        </Button>
        <div>
          Don't have an account? <Link to={`/register`}>Sign up</Link> instead!
        </div>
      </form>
    </>
  );
};

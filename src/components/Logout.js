import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export const Logout = () => {
  // const navigate = useNavigate();
  const { logout } = useContext(GlobalContext);
  return (
    <Button
      className="btn"
      onClick={() => {
        console.log(localStorage.getItem("token"));
        localStorage.clear();
        logout();
        console.log(localStorage.getItem("token"));
        window.location.reload(true);
      }}
    >
      Log Out
    </Button>
  );
};

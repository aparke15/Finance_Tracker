import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Header = () => {
  return (
    <>
      <h2>Expense Tracker</h2>
      {localStorage.getItem("currentUser") ? (
        <h3>Welcome {localStorage.getItem("currentUser")}</h3>
      ) : null}
    </>
  );
};

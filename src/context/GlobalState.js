import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import axios from "axios";

const API = process.env.REACT_APP_API;

// Initial State
const initialState = {
  user: null,
  currentUser: null,
  token: null,
  isLoggedIn: false,
  users: [],
  transactions: [],
  error: null,
  loading: true,
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const getUser = async (creds) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(`${API}/api/v1/users/${creds.email}`);
      console.log("creds.email", creds.email);
      dispatch({
        type: "GET_USER",
        payload: res.data.data,
      });
      console.log(res.data.data[0]);
      return res.data.data[0].email;
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const setIsLoggedIn = async () => {
    state.isLoggedIn = true;
  };

  const login = async (credentials) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${API}/api/v1/users/login`,
        credentials,
        config
      );
      dispatch({
        type: "LOG_IN",
        payload: res.data.data,
      });
      return res.data.access_token;
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const logout = async () => {
    try {
      dispatch({
        type: "LOG_OUT",
        payload: null,
      });
    } catch (error) {}
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/users`);

      dispatch({
        type: "GET_USERS",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const getTransactions = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/transactions`);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API}/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${API}/api/v1/transactions`,
        transaction,
        config
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(user);
      const res = await axios.post(
        `${API}/api/v1/users/register`,
        user,
        config
      );
      dispatch({
        type: "ADD_USER",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn,
        users: state.users,
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        token: state.token,
        getTransactions,
        deleteTransaction,
        addTransaction,
        addUser,
        getUser,
        getAllUsers,
        login,
        logout,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

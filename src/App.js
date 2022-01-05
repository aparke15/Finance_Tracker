import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ExpenseTracker } from "./components/ExpenseTracker";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { GlobalContext, GlobalProvider } from "./context/GlobalState";
import { Register } from "./components/Register";
import { useContext } from "react";

const App = () => {
  // const isLoggedIn = useContext(GlobalContext);
  // console.log("in App.js ", isLoggedIn);
  // const navigate = useNavigate();
  return (
    <GlobalProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path={`/`}
            element={
              localStorage.getItem("token") ? (
                <ExpenseTracker />
              ) : (
                <Navigate to={`/login`} />
              )
            }
          />
          <Route
            path={`/login`}
            element={
              localStorage.getItem("token") ? <Navigate to={`/`} /> : <Login />
            }
          />
          <Route
            path={`/register`}
            element={
              localStorage.getItem("token") ? (
                <Navigate to={`/`} />
              ) : (
                <Register />
              )
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <ExpenseTracker /> */}
    </GlobalProvider>
  );
};

export default App;

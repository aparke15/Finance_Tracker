import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ExpenseTracker } from "./components/ExpenseTracker";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { GlobalProvider } from "./context/GlobalState";
import { Register } from "./components/Register";

const App = () => {
  return (
    <GlobalProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={`/login`} element={<Login />} />
          <Route path={`/register`} element={<Register />} />
        </Routes>
      </BrowserRouter>
      {/* <ExpenseTracker /> */}
    </GlobalProvider>
  );
};

export default App;

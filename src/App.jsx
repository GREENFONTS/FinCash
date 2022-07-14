import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";
import Accounts from "./pages/accounts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/SignIn" />} />
        <Route path="/SignIn" element={<LoginPage />} />
        <Route path="/SignUp" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/accounts" element={<Accounts />} />
      </Routes>
    </>
  );
}

export default App;

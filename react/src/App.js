import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {/* Include ToastContainer to show notifications */}
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home for undefined routes */}
      </Routes>
    </Router>
  );
}

export default App;

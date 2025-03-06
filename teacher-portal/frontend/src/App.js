import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./Dashboard/dashboard";
import Home from "./Dashboard/Home";
import Profile from "./Dashboard/Profile";
import Settings from "./Dashboard/Settings";
import "./App.css"; // Custom styles
import Assignments from "./Dashboard/Assignments";
import Notes from "./Dashboard/Notes";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🎓 Teacher Portal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-light text-primary me-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-light" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn btn-danger text-white" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container" style={{
        background: "linear-gradient(135deg, #f3f4f6, #dbeafe)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={
              <div className="welcome-section text-center">
                <h1 className="display-4 fw-bold text-primary">Welcome to the Teacher Portal</h1>
                <p className="lead text-muted">Manage your teaching journey with ease.</p>
                <Link to="/register" className="btn btn-primary btn-lg mt-3">Get Started</Link>
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="notes" element={<Notes />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

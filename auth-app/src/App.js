import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TeacherLogin from "./components/Teacher/TeacherLogin"; // Teacher login page
import Dashboard from "./components/Dashboard/Dashboard";
import TeacherDashboard from "./components/Teacher/TeacherDashboard"; // Teacher Dashboard
import Home from "./components/Dashboard/Home";
import Users from "./components/Dashboard/Users";
import Settings from "./components/Dashboard/Settings";
import Notes from "./components/Dashboard/Notes";
import Assignments from "./components/Dashboard/Assignments";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedTeacherRoute from "./components/ProtectedTeacherRoute"; // Protect Teacher routes

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher/login" element={<TeacherLogin />} /> {/* ✅ Separate teacher login */}

        {/* 🔒 Protected Student Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notes" element={<Notes />} />
            <Route path="assignments" element={<Assignments />} />
          </Route>
        </Route>

        {/* 🔒 Protected Teacher Dashboard Routes */}
        <Route element={<ProtectedTeacherRoute />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        </Route>

        {/* Redirect unknown paths to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

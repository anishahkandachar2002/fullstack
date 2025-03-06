import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // ✅ Use navigate instead of window.location.href
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Toggle Button */}
      <button className="toggle-btn btn btn-primary" onClick={toggleSidebar}>
        {isCollapsed ? "☰" : "✖"}
      </button>

      {/* Sidebar Content */}
      <h3 className="text-center">Dashboard</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link text-light" to="/dashboard/settings">🏠Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light" to="/dashboard/notes">📝 Notes</NavLink>
        </li>
       
        <li className="nav-item">
          <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

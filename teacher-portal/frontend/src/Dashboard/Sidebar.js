import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        ☰
      </button>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard/home" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/profile" className="nav-link">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/settings" className="nav-link">Settings</Link>
        </li>
        <li className="nav-item">
          <button className="nav-link text-danger" onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

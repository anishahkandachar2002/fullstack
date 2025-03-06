import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Dashboard.css"; // Custom styles

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => location.pathname.includes(path) ? "active" : "";

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <nav className="sidebar bg-dark text-white">
        <button onClick={handleToggleSidebar} className="sidebar-toggle-btn">☰</button>
        <h3 className="text-center p-3">📚 Teacher Dashboard</h3>
        <ul className="list-group">
          <li className={`list-group-item bg-dark ${isActive("/dashboard/home")}`}>
            <Link to="/dashboard/home" className="text-white">🏠 Home</Link>
          </li>
          <li className={`list-group-item bg-dark ${isActive("/dashboard/profile")}`}>
            <Link to="/dashboard/profile" className="text-white">👤 Profile</Link>
          </li>
          
          <li className={`list-group-item bg-dark ${isActive("/dashboard/notes")}`}>
            <Link to="/dashboard/notes" className="text-white">📝 Subjects</Link>
          </li>
          
         
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

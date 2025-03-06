import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css"; // Ensure correct CSS is imported

const Notes1 = () => {
  return (
    <div className="dashboard-container d-flex">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="text-center">Teacher Dashboard</h2>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/dashboard">🏠 Home</Link>
          </li>
          <li className="list-group-item">
            <Link to="/profile">👤 Profile</Link>
          </li>
          <li className="list-group-item">
            <Link to="/assignments">📝 Assignments</Link>
          </li>
          <li className="list-group-item">
            <Link to="/subjects">📚 Subjects</Link>
          </li>
          <li className="list-group-item">
            <Link to="/settings">⚙️ Settings</Link>
          </li>
          <li className="list-group-item active">
            <Link to="/notes1">📝 Add Notes</Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="content">
        <h2 className="mt-4">📖 Add Notes</h2>
        <p>Start adding your notes here...</p>
      </div>
    </div>
  );
};

export default Notes1;

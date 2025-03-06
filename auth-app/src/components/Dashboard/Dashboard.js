import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="container mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container mt-5">
      <h2>🎉 Welcome to the Dashboard!</h2>
      <button 
        className="btn btn-danger mt-3"
        onClick={() => {
          localStorage.removeItem("token"); // Logout
          navigate("/login");
        }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!name || !employeeID || !password) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/teachers/register", {
        name,
        employeeID,
        password,
      });
      setMessage("Registration Successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 border-0 shadow w-75 w-md-50 w-lg-40">
  
        <h2 className="text-center text-primary mb-3">Register</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Employee ID"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        
        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

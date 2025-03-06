import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [srn, setSrn] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ srn, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <img 
          src="https://media.collegedekho.com/media/img/institute/crawled_images/PES_University1.jpg" 
          alt="PES University" 
          className="img-fluid rounded mb-3"
        />
        <div className="card-body text-center">
          <h2 className="card-title mb-4 text-primary">Student Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3 text-start">
              <label htmlFor="srn" className="form-label fw-bold">SRN:</label>
              <input
                type="text"
                className="form-control"
                id="srn"
                value={srn}
                onChange={(e) => setSrn(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-bold">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0" style={{ color: "#000" }}>
            New user? <a href="/register" className="text-primary fw-bold">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
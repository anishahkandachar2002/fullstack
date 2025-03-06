import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [srn, setSrn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("http://localhost:5000/register", {
        srn,
        email,
        password,
      });

      setSuccessMessage(response.data.message);
      setSrn("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: "linear-gradient(135deg, #ff758c, #ff7eb3)" }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <img
          src="https://media.collegedekho.com/media/img/institute/crawled_images/PES_University1.jpg"
          alt="PES University"
          className="img-fluid mb-3 rounded"
        />
        <div className="card-body text-center">
          <h2 className="card-title mb-4 text-danger">Student Register</h2>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleRegister}>
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
              <label htmlFor="email" className="form-label fw-bold">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <button type="submit" className="btn btn-danger">Register</button>
            </div>
          </form>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0" style={{ color: "#000" }}>
            Already a user? <a href="/login" className="text-danger fw-bold">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import axios from "axios";

const TeacherLogin = () => {
  const [empid, setEmpid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/teacher/login", { empid, password });
      localStorage.setItem("teacherToken", res.data.token);
      setMessage("✅ Login Successful!");
      window.location.href = "/teacher/dashboard";
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Login Failed"));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Teacher Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input type="text" className="form-control" value={empid} onChange={(e) => setEmpid(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default TeacherLogin;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/teachers/login", {
        employeeID,
        password,
      });
  
      localStorage.setItem("token", data.token);  // ✅ Store token
      localStorage.setItem("teacherID", data.teacher._id);  // ✅ Store teacher's ID
      localStorage.setItem("teacherName", data.teacher.name);  // ✅ Store teacher's Name
  
      alert(`Welcome, ${data.teacher.name}!`);
      navigate("/dashboard/home");  // ✅ Redirect to Dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center text-primary mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input 
              type="text" 
              placeholder="Enter Employee ID" 
              value={employeeID} 
              onChange={(e) => setEmployeeID(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control"
            />
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

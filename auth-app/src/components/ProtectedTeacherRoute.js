import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedTeacherRoute = () => {
  const teacherToken = localStorage.getItem("teacherToken"); // Store teacher token separately

  return teacherToken ? <Outlet /> : <Navigate to="/teacher/login" replace />;
};

export default ProtectedTeacherRoute;

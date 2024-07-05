import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedNoUser = () => {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

export default ProtectedNoUser;

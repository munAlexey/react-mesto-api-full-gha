import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoute = (props) => {
  const { isLoggedIn, children } = props;
  const jwt = localStorage.getItem("jwt");
  console.log(jwt)

  if(!isLoggedIn || jwt===null) {
    return (
      <Navigate to="/signin" replace />
    )
  }

  return children ? children : <Outlet />;
};

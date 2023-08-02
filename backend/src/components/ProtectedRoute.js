import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteElement({
  component: Component,
  ...props
}) {
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-up" replace={true} />
  );
}

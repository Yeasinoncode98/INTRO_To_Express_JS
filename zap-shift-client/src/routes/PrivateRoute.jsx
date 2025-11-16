import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router"; // Ensure you are importing from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Corrected to invoke useAuth() as a function
  const location = useLocation();
//   console.log("Location", location);
  if (loading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  return children;
};

export default PrivateRoute;

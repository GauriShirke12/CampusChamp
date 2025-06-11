import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If user is authenticated, allow access
  if (user) {
    return children;
  }

  // If not authenticated, redirect to login with the original path saved
  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;

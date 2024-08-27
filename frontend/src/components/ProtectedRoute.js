// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Adjust as needed

  return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;

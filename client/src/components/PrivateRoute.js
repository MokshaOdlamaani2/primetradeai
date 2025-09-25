// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  } catch (err) {
    console.error('Invalid token', err);
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

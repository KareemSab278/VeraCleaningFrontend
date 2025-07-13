import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const manager = localStorage.getItem('manager');
  if (!manager) {
    return <Navigate to="/VeraCleaningFrontend/signin" replace />;
  }
  return children;
}
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('wyenfos_admin_token');
  const user = localStorage.getItem('wyenfos_admin_user');
  
  if (!token || !user) {
    return <Navigate to="/admin/hvcxyctdsyt/jhguyiu/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;


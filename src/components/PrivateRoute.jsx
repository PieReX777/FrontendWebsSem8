import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

const PrivateRoute = ({ children, roles }) => {
  const user = AuthService.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (roles && !roles.some(role => user.roles.includes(role))) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default PrivateRoute;
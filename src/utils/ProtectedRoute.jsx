import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Mostrar un indicador de carga mientras el estado de autenticación se verifica
    return <div></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

export default ProtectedRoute;

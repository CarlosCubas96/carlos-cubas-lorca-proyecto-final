import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth/auth.service';


const ProtectedRoute = ({ children, roles }) => {

    const user = AuthService.getCurrentUser();
    const userHasRequiredRole = roles ? user && roles.some(role => user.roles.includes(role)) : true;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!userHasRequiredRole) {
        return <Navigate to="/no-access" replace />;
    }

    return children;  // El usuario está autenticado y tiene el rol requerido
};

export default ProtectedRoute;

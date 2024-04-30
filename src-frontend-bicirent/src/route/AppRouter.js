import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../components/common/login/login';
import HomeAdmin from '../pages/homeAdmin/HomeAdmin';
import ProtectedRoute from './ProtectedRoute';
import NoPermissionPage from '../pages/error/noPermissionPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
                <ProtectedRoute roles={['ROLE_ADMIN']}>
                    <HomeAdmin />
                </ProtectedRoute>
            } />
             <Route path="no-access" element={<NoPermissionPage />} />
        </Routes>
    );
};

export default AppRouter;
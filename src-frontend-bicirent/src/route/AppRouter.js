import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../components/common/login/login';
import Register from '../components/common/register/register';
import HomeAdmin from '../pages/homeAdmin/HomeAdmin';
import UsersPanel from '../pages/admin/UsersPanel/usersPanel';
import ProtectedRoute from './ProtectedRoute';
import NoPermissionPage from '../pages/error/noPermissionPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/admin" element={
                <ProtectedRoute roles={['ROLE_ADMIN']}>
                    <HomeAdmin />
                </ProtectedRoute>
            } />

            <Route path="/admin/usuarios" element={
                <ProtectedRoute roles={['ROLE_ADMIN']}>
                    <UsersPanel />
                </ProtectedRoute>
            } />

            <Route path="no-access" element={<NoPermissionPage />} />
        </Routes>
    );
};

export default AppRouter;
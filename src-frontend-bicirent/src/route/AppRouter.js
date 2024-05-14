import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../components/common/login/login';
import Register from '../components/common/register/register';
import NoPermissionPage from '../pages/error/noPermissionPage';
import DashBoardUsersAdmin from '../pages/admin/DashBoardUsersAdmin/dashBoardUsersAdmin';
import DashBoardRentalsAdmin from '../pages/admin/DashBoardRentalsAdmin/dashBoardRentalsAdmin';
import DashBoardEditUserAdmin from '../pages/admin/DashBoardEditUserAdmin/dashBoardEditUserAdmin';
import DashBoardEditRentalAdmin from '../pages/admin/DashBoardEditRentalAdmin/dashBoardEditRentalAdmin';
import DashBoardProfileAdmin from '../pages/admin/DashBoardProfileAdmin/dashBoardProfileAdmin';
import DashBoardMainAdmin from '../pages/admin/DashBoardMainAdmin/dashBoardMainAdmin';

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/admin" element={<DashBoardMainAdmin />} />
            <Route path="/admin/perfil" element={<DashBoardProfileAdmin />} />
            <Route path="/admin/usuarios" element={<DashBoardUsersAdmin />} />
            <Route path="/admin/alquileres" element={<DashBoardRentalsAdmin />} />
            <Route path="/admin/usuarios/edit/:id" element={<DashBoardEditUserAdmin />} />
            <Route path="/admin/alquileres/edit/:id" element={<DashBoardEditRentalAdmin />} />
            <Route path="/no-access" element={<NoPermissionPage />} />
        </Routes>
    );
};

export default AppRouter;

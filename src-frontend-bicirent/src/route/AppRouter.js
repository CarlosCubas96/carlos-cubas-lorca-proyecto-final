import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../components/common/login/login';
import Register from '../components/common/register/register';
import NoPermissionPage from '../pages/error/ViewErrorUserAcessDenied/viewErrorUserAcessDenied';
import NoFoundPage from '../pages/error/ViewErrorUserNotFound/viewErrorUserNotFound';
import DashBoardUsersAdmin from '../pages/admin/DashBoardUsersAdmin/dashBoardUsersAdmin';
import DashBoardPostsAdmin from '../pages/admin/DashBoardPostsAdmin/dashBoardPostsAdmin';
import DashBoardPostsUser from '../pages/user/DashBoardPostsUser/dashBoardPostsUser';
import DashBoardRentalsAdmin from '../pages/admin/DashBoardRentalsAdmin/dashBoardRentalsAdmin';
import DashBoardBicyclesAdmin from '../pages/admin/DashBoardBicyclesAdmin/dashBoardBicyclesAdmin';
import DashBoardEditUserAdmin from '../pages/admin/DashBoardEditUserAdmin/dashBoardEditUserAdmin';
import DashBoardEditRentalAdmin from '../pages/admin/DashBoardEditRentalAdmin/dashBoardEditRentalAdmin';
import DashBoardEditBicycleAdmin from '../pages/admin/DashBoardEditBicycleAdmin/dashBoardEditBicycleAdmin';
import DashBoardEditPostAdmin from '../pages/admin/DashBoardEditPostAdmin/dashBoardEditPostAdmin';
import DashBoardEditPostUser from '../pages/user/DashBoardEditPostUser/dashBoardEditPostUser';
import DashBoardProfileAdmin from '../pages/admin/DashBoardProfileAdmin/dashBoardProfileAdmin';
import DashBoardMainAdmin from '../pages/admin/DashBoardMainAdmin/dashBoardMainAdmin';
import DashBoardMainUser from '../pages/user/DashBoardMainUser/dashBoardMainUser';
import DashBoardProfileUser from '../pages/user/DashBoardProfileUser/dashBoardProfileUser';
import ViewAddPostUser from '../pages/user/ViewAddPostUser/viewAddPostUser';
import ViewAddBicycleUser from '../pages/user/ViewAddBicycleUser/viewAddBicycleUser';
import ViewCatalogUser from '../pages/user/ViewCatalogUser/viewCatalogUser';
import ViewPostUser from '../pages/user/ViewPostUser/viewPostUser';
import authService from '../services/auth/auth.service';

const AppRouter = () => {
    const currentUser = authService.getCurrentUser();
    const userRole = currentUser ? currentUser.roles[0] : '';

    // Función para comprobar si el usuario tiene acceso de acuerdo a su rol
    const checkAccess = (allowedRoles, component) => {
        if (currentUser && allowedRoles.includes(userRole)) {
            return component;
        } else if (currentUser && userRole === 'ROLE_ADMIN') {
            // Si es admin, se le permite acceso a todas las rutas
            return component;

        } else if (currentUser && userRole === 'ROLE_USER') {
            return <Navigate to="/no-access" />;
        } else {
            // Si no hay usuario logueado, redirigir a la página de inicio de sesión
            return <Navigate to="/login" />;
        }
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {/* Rutas específicas para el rol de administrador */}
            <Route path="/admin" element={checkAccess(['ROLE_ADMIN'], <DashBoardMainAdmin />)} />

            <Route path="/admin/perfil" element={checkAccess(['ROLE_ADMIN'], <DashBoardProfileAdmin />)} />
            <Route path="/admin/usuarios" element={checkAccess(['ROLE_ADMIN'], <DashBoardUsersAdmin />)} />
            <Route path="/admin/alquileres" element={checkAccess(['ROLE_ADMIN'], <DashBoardRentalsAdmin />)} />
            <Route path="/admin/bicicletas" element={checkAccess(['ROLE_ADMIN'], <DashBoardBicyclesAdmin />)} />
            <Route path="/admin/publicaciones" element={checkAccess(['ROLE_ADMIN'], <DashBoardPostsAdmin />)} />

            <Route path="/admin/usuarios/edit/:id" element={checkAccess(['ROLE_ADMIN'], <DashBoardEditUserAdmin />)} />
            <Route path="/admin/alquileres/edit/:id" element={checkAccess(['ROLE_ADMIN'], <DashBoardEditRentalAdmin />)} />
            <Route path="/admin/publicaciones/edit/:id" element={checkAccess(['ROLE_ADMIN'], <DashBoardEditPostAdmin />)} />
            <Route path="/admin/bicicletas/edit/:id" element={checkAccess(['ROLE_ADMIN'], <DashBoardEditBicycleAdmin />)} />

            {/* Rutas específicas para el rol de usuario */}
            <Route path="/user" element={checkAccess(['ROLE_USER'], <DashBoardMainUser />)} />
            <Route path="/user/perfil" element={checkAccess(['ROLE_USER'], <DashBoardProfileUser />)} />

            <Route path="/user/publicaciones" element={checkAccess(['ROLE_USER'], <DashBoardPostsUser />)} />
            <Route path="/user/publicaciones/edit/:id" element={checkAccess(['ROLE_USER'], <DashBoardEditPostUser />)} />

            <Route path="/user/publicaciones/add/post" element={checkAccess(['ROLE_USER'], <ViewAddPostUser />)} />
            <Route path="/user/publicaciones/add/bicicleta/:id" element={checkAccess(['ROLE_USER'], <ViewAddBicycleUser />)} />

            <Route path="/publicaciones" element={checkAccess(['ROLE_USER'], <ViewCatalogUser />)} />
            <Route path="/publicaciones/reserva/:id" element={checkAccess(['ROLE_USER'], <ViewPostUser />)} />

            {/* Ruta para la página de acceso denegado */}
            <Route path="/no-access" element={<NoPermissionPage />} />

            {/* Ruta para la página no encontrada */}
            <Route path="*" element={<NoFoundPage />} />
        </Routes>
    );
};

export default AppRouter;

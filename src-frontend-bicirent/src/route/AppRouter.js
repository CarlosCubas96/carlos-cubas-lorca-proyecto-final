import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

    const isAdmin = userRole === 'ROLE_ADMIN';
    const isUser = userRole === 'ROLE_USER';

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {isAdmin && (
                <>
                    {/* Rutas específicas para el rol de administrador */}
                    <Route path="/admin" element={<DashBoardMainAdmin />} />

                    <Route path="/admin/perfil" element={<DashBoardProfileAdmin />} />
                    <Route path="/admin/usuarios" element={<DashBoardUsersAdmin />} />
                    <Route path="/admin/alquileres" element={<DashBoardRentalsAdmin />} />
                    <Route path="/admin/bicicletas" element={<DashBoardBicyclesAdmin />} />
                    <Route path="/admin/publicaciones" element={<DashBoardPostsAdmin />} />

                    <Route path="/admin/usuarios/edit/:id" element={<DashBoardEditUserAdmin />} />
                    <Route path="/admin/alquileres/edit/:id" element={<DashBoardEditRentalAdmin />} />
                    <Route path="/admin/publicaciones/edit/:id" element={<DashBoardEditPostAdmin />} />
                    <Route path="/admin/bicicletas/edit/:id" element={<DashBoardEditBicycleAdmin />} />
                </>
            )}

            {isUser && (
                <>
                    <Route path="/user" element={<DashBoardMainUser />} />
                    <Route path="/user/perfil" element={<DashBoardProfileUser />} />

                    <Route path="/user/publicaciones" element={<DashBoardPostsUser />} />
                    <Route path="/user/publicaciones/edit/:id" element={<DashBoardEditPostUser />} />

                    <Route path="/user/publicaciones/add/post" element={<ViewAddPostUser />} />
                    <Route path="/user/publicaciones/add/bicicleta/:id" element={<ViewAddBicycleUser />} />

                    <Route path="/publicaciones" element={<ViewCatalogUser />} />
                    <Route path="/publicaciones/reserva/:id" element={<ViewPostUser />} />
                </>
            )}

            {/* Si el usuario intenta acceder a otras páginas, lo redirigimos a la página de acceso denegado */}
            <Route path="*" element={<NoPermissionPage />} />

            {/* Ruta para la página de acceso denegado */}
            <Route path="/no-access" element={<NoPermissionPage />} />

            {/* Ruta para la página no encontrada */}
            <Route path="/no-found" element={<NoFoundPage />} />
        </Routes>
    );
};

export default AppRouter;

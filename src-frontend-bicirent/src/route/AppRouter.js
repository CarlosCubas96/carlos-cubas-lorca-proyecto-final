import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../components/common/login/login';
import Register from '../components/common/register/register';
import NoPermissionPage from '../pages/error/noPermissionPage';
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



const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            <Route path="/admin" element={<DashBoardMainAdmin />} />
            <Route path="/user" element={<DashBoardMainUser />} />

            <Route path="/user/publicaciones" element={<DashBoardPostsUser />} />

            <Route path="/admin/perfil" element={<DashBoardProfileAdmin />} />
            <Route path="/user/perfil" element={<DashBoardProfileUser />} />

            <Route path="/user/publicaciones/add/post" element={<ViewAddPostUser />} />
            <Route path="/user/publicaciones/add/bicicleta/:id" element={<ViewAddBicycleUser />} />
            <Route path="/publicaciones" element={<ViewCatalogUser />} />
            <Route path="/publicaciones/reserva/:id" element={<ViewPostUser />} />

            <Route path="/admin/usuarios" element={<DashBoardUsersAdmin />} />
            <Route path="/admin/alquileres" element={<DashBoardRentalsAdmin />} />
            <Route path="/admin/bicicletas" element={<DashBoardBicyclesAdmin />} />
            <Route path="/admin/publicaciones" element={<DashBoardPostsAdmin />} />

            <Route path="/admin/usuarios/edit/:id" element={<DashBoardEditUserAdmin />} />
            <Route path="/admin/alquileres/edit/:id" element={<DashBoardEditRentalAdmin />} />
            <Route path="/admin/publicaciones/edit/:id" element={<DashBoardEditPostAdmin />} />
            <Route path="/admin/bicicletas/edit/:id" element={<DashBoardEditBicycleAdmin />} />

            <Route path="/user/publicaciones/edit/:id" element={<DashBoardEditPostUser />} />


            <Route path="/no-access" element={<NoPermissionPage />} />
        </Routes>
    );
};

export default AppRouter;

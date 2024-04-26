
import './App.css';
import { Routes, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';


import Login from './components/common/login/login';
import Home from './pages/home/home';
import UsersPanel from './pages/admin/UsersPanel/usersPanel';
import HomeAdmin from './pages/homeAdmin/HomeAdmin';
import BicyclesPanel from './pages/admin/BicyclesPanel/bicyclesPanel';
import RentalsPanel from './pages/admin/RentalsPanel/rentalsPanel';
import PostsPanel from './pages/admin/PostsPanel/postsPanel';
import Register from './components/common/register/register';




function App() {
  
  return (
    <> 
    <div className="container mt-3">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<HomeAdmin />} />
      <Route path="/admin/usuarios" element={<UsersPanel/>} />
      <Route path="/admin/bicicletas" element={<BicyclesPanel/>} />
      <Route path="/admin/alquileres" element={<RentalsPanel/>} />
      <Route path="/admin/publicaciones" element={<PostsPanel/>} />
    </Routes>
  </div>
    </>
  

  );
}

export default App;

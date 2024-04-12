
import './App.css';
import { Routes, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';


import Login from './components/common/login/login';
import Home from './pages/home/home';
import HomeAdmin from './pages/homeAdmin/HomeAdmin';
import HomeUser from './pages/homeUser/homeUser';



function App() {
  
  return (
    <> 
    <div className="container mt-3">
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<HomeAdmin />} />
      <Route path="/user" element={<HomeUser />} />
    </Routes>
  </div>
    </>
  

  );
}

export default App;

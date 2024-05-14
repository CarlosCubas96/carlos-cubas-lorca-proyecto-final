import React from 'react';
import { useLocation } from 'react-router-dom';
import './sidebarsectionAdmin.css';
import AsideButton from '../../UI/Button/AsideButton/asideButton';

const SidebarsectionAdmin = () => {
  const location = useLocation();

  const isActive = (path) => {
    const { pathname } = location;
    const regex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
    return regex.test(pathname);
  };



  return (
    <div className="containersidebarsection-containersidebarsection">
      <div className="containersidebarsection-containersidebarbr">
        <div className="containersidebarsection-containersidebarpanel">
          <div className="containersidebarsection-containersidebarpanelname">
            <span className="containersidebarsection-text">
              <h4>Admin</h4>
            </span>
          </div>
          <div className="containersidebarsection-containersidebarpanelmenu">
            <AsideButton
              to="/admin"
              icon="Home"
              style={{ backgroundColor: isActive('/admin') ? '#38E078' : 'inherit' }}
            >
              Panel de administrador
            </AsideButton>

            <AsideButton
              to="/admin/usuarios"
              icon="Users"
              style={{ backgroundColor: isActive('/admin/usuarios') || isActive('/admin/edit/:id') ? '#38E078' : 'inherit' }}
            >
              Usuarios
            </AsideButton>



            <AsideButton
              to="/admin/alquileres"
              icon="Altavoz"
              style={{ backgroundColor: isActive('/admin/alquileres') ? '#38E078' : 'inherit' }}
            >
              Alquileres
            </AsideButton>

            <AsideButton
              to="/admin/perfil"
              icon="User"
              style={{ backgroundColor: isActive('/admin/perfil') ? '#38E078' : 'inherit' }}
            >
              Perfil
            </AsideButton>

          </div>
        </div>
        <div className="containersidebarsection-containersidebarpanel2">
          <div className="containersidebarsection-containersidebarpanel2menu">
            <AsideButton to="#" icon="Question" >Soporte</AsideButton>
            <AsideButton to="#" icon="Logout" >Cerrar Sesión</AsideButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarsectionAdmin;

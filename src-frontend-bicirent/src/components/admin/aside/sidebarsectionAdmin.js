import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './sidebarsectionAdmin.css';
import AsideButton from '../../UI/Button/AsideButton/asideButton';
import authService from "../../../services/auth/auth.service";
import EventBus from '../../../common/EventBus';

const SidebarsectionAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  const logOut = useCallback(() => {
    authService.logout();
    setCurrentUser(undefined);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.roles.includes('ROLE_ADMIN')) {
      setCurrentUser(user);
    }

    const handleLogout = () => {
      logOut();
    };

    EventBus.on("logout", handleLogout);

    return () => {
      EventBus.remove("logout", handleLogout);
    };
  }, [logOut]);

  const isActive = (path) => {
    const { pathname } = location;
    const regex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
    return regex.test(pathname);
  };


  // Verifica si currentUser existe y tiene el rol ROLE_ADMIN
  if (currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN')) {
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
                style={{ backgroundColor: isActive('/admin/usuarios') || isActive('/admin/usuarios/edit/:id') ? '#38E078' : 'inherit' }}
              >
                Usuarios
              </AsideButton>

              <AsideButton
                to="/admin/bicicletas"
                icon="Bici"
                style={{ backgroundColor: isActive('/admin/bicicletas') || isActive('/admin/bicicletas/edit/:id') ? '#38E078' : 'inherit' }}
              >
                Bicicletas
              </AsideButton>

              <AsideButton
                to="/admin/publicaciones"
                icon="Bell"
                style={{ backgroundColor: isActive('/admin/publicaciones') || isActive('/admin/publicaciones/edit/:id') ? '#38E078' : 'inherit' }}
              >
                Publicaciones
              </AsideButton>

              <AsideButton
                to="/admin/alquileres"
                icon="Altavoz"
                style={{ backgroundColor: isActive('/admin/alquileres') || isActive('/admin/alquileres/edit/:id') ? '#38E078' : 'inherit' }}
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
              <AsideButton to="#" icon="Question">Soporte</AsideButton>
              <AsideButton icon="Logout" onClick={logOut}>Cerrar Sesión</AsideButton>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Si el usuario no tiene el rol ROLE_ADMIN, no mostramos nada
    return null;
  }
}

export default SidebarsectionAdmin;
